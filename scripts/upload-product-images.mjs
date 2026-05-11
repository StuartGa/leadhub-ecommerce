#!/usr/bin/env node

/**
 * Script para subir automáticamente imágenes de productos a Sanity CMS
 * 
 * Uso:
 *   node scripts/upload-product-images.mjs <ruta-a-fotografias>
 * 
 * Ejemplo:
 *   node scripts/upload-product-images.mjs "/Users/StuartGP/Downloads/yectic- Alimentos Convenientes San Patric/Fotografías"
 * 
 * Requisitos:
 *   - Tener un archivo .env con SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN
 *   - Las imágenes deben estar nombradas con el SKU al inicio (ej: "10121 Ketchup Heinz.png")
 */

import { createClient } from '@sanity/client';
import { createReadStream, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { config } from 'dotenv';

// Cargar variables de entorno
config();

// Configuración de Sanity
const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('❌ Error: Faltan variables de entorno necesarias.');
  console.error('   Necesitas: SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN');
  console.error('   Puedes configurarlas en un archivo .env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2023-05-03',
  useCdn: false,
});

// Extensiones de imagen permitidas
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

/**
 * Extrae el SKU del nombre del archivo
 * Ejemplo: "10121 Ketchup Heinz.png" -> "10121"
 */
function extractSKU(filename) {
  const match = filename.match(/^(\d+)/);
  return match ? match[1] : null;
}

/**
 * Obtiene todos los archivos de imagen recursivamente
 */
function getImageFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const entries = readdirSync(currentDir);
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Ignorar carpetas de logos
        if (!entry.toLowerCase().includes('logo')) {
          traverse(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = extname(entry).toLowerCase();
        const name = basename(entry, ext);
        
        // Ignorar archivos de logo
        if (IMAGE_EXTENSIONS.includes(ext) && !name.toLowerCase().includes('logo')) {
          files.push(fullPath);
        }
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Agrupa imágenes por SKU
 */
function groupImagesBySKU(files) {
  const groups = {};
  
  for (const file of files) {
    const filename = basename(file);
    const sku = extractSKU(filename);
    
    if (sku) {
      if (!groups[sku]) {
        groups[sku] = [];
      }
      groups[sku].push(file);
    }
  }
  
  return groups;
}

/**
 * Sube una imagen a Sanity
 */
async function uploadImage(filePath) {
  try {
    const ext = extname(filePath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';
    
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: basename(filePath),
      contentType,
    });
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`   ❌ Error subiendo ${basename(filePath)}:`, error.message);
    return null;
  }
}

/**
 * Encuentra un producto por SKU
 */
async function findProductBySKU(sku) {
  const query = `*[_type == "product" && sku == $sku][0]`;
  return await client.fetch(query, { sku });
}

/**
 * Actualiza la galería de un producto
 */
async function updateProductGallery(productId, images) {
  try {
    await client
      .patch(productId)
      .set({ gallery: images })
      .commit();
    return true;
  } catch (error) {
    console.error(`   ❌ Error actualizando producto:`, error.message);
    return false;
  }
}

/**
 * Procesa un grupo de imágenes para un SKU
 */
async function processProductImages(sku, imagePaths) {
  console.log(`\n📦 Procesando producto SKU: ${sku} (${imagePaths.length} imágenes)`);
  
  // Buscar producto en Sanity
  const product = await findProductBySKU(sku);
  
  if (!product) {
    console.log(`   ⚠️  Producto no encontrado en Sanity, saltando...`);
    return { sku, status: 'not_found', images: imagePaths.length };
  }
  
  console.log(`   ✓ Producto encontrado: ${product.name}`);
  
  // Subir todas las imágenes
  console.log(`   📤 Subiendo ${imagePaths.length} imágenes...`);
  const uploadedImages = [];
  
  for (let i = 0; i < imagePaths.length; i++) {
    const path = imagePaths[i];
    console.log(`   [${i + 1}/${imagePaths.length}] ${basename(path)}`);
    
    const imageRef = await uploadImage(path);
    if (imageRef) {
      uploadedImages.push(imageRef);
    }
  }
  
  if (uploadedImages.length === 0) {
    console.log(`   ❌ No se pudieron subir imágenes`);
    return { sku, status: 'upload_failed', images: 0 };
  }
  
  // Actualizar galería del producto
  console.log(`   💾 Actualizando galería del producto...`);
  const updated = await updateProductGallery(product._id, uploadedImages);
  
  if (updated) {
    console.log(`   ✅ Producto actualizado exitosamente con ${uploadedImages.length} imágenes`);
    return { sku, status: 'success', images: uploadedImages.length };
  } else {
    return { sku, status: 'update_failed', images: uploadedImages.length };
  }
}

/**
 * Main
 */
async function main() {
  const photosDir = process.argv[2];
  
  if (!photosDir) {
    console.error('❌ Error: Debes proporcionar la ruta a la carpeta de fotografías');
    console.error('   Uso: node scripts/upload-product-images.mjs <ruta-a-fotografias>');
    process.exit(1);
  }
  
  console.log('🚀 Iniciando proceso de subida de imágenes...');
  console.log(`📁 Carpeta de fotografías: ${photosDir}\n`);
  
  // Obtener todos los archivos de imagen
  console.log('🔍 Buscando imágenes...');
  const imageFiles = getImageFiles(photosDir);
  console.log(`✓ Encontradas ${imageFiles.length} imágenes\n`);
  
  // Agrupar por SKU
  console.log('📊 Agrupando imágenes por SKU...');
  const groups = groupImagesBySKU(imageFiles);
  const skus = Object.keys(groups);
  console.log(`✓ Encontrados ${skus.length} SKUs diferentes\n`);
  
  // Mostrar resumen
  console.log('📋 Resumen de imágenes por SKU:');
  for (const sku of skus.slice(0, 10)) {
    console.log(`   ${sku}: ${groups[sku].length} imagen(es)`);
  }
  if (skus.length > 10) {
    console.log(`   ... y ${skus.length - 10} SKUs más`);
  }
  
  // Confirmar antes de proceder
  console.log('\n⚠️  ATENCIÓN: Este script subirá imágenes a Sanity y actualizará productos.');
  console.log('   Presiona Ctrl+C para cancelar, o Enter para continuar...');
  
  // Esperar confirmación (en producción, podrías usar readline)
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('\n🔄 Procesando productos...\n');
  
  // Procesar cada SKU
  const results = [];
  for (let i = 0; i < skus.length; i++) {
    const sku = skus[i];
    const result = await processProductImages(sku, groups[sku]);
    results.push(result);
    
    // Pequeña pausa entre productos para no sobrecargar la API
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Resumen final
  console.log('\n\n═══════════════════════════════════════════════════');
  console.log('📊 RESUMEN FINAL');
  console.log('═══════════════════════════════════════════════════\n');
  
  const successful = results.filter(r => r.status === 'success').length;
  const notFound = results.filter(r => r.status === 'not_found').length;
  const failed = results.filter(r => r.status !== 'success' && r.status !== 'not_found').length;
  const totalImages = results.reduce((sum, r) => sum + r.images, 0);
  
  console.log(`✅ Productos actualizados exitosamente: ${successful}`);
  console.log(`⚠️  Productos no encontrados: ${notFound}`);
  console.log(`❌ Productos con errores: ${failed}`);
  console.log(`📸 Total de imágenes subidas: ${totalImages}`);
  console.log('\n✨ Proceso completado!\n');
}

// Ejecutar
main().catch(error => {
  console.error('\n❌ Error fatal:', error);
  process.exit(1);
});

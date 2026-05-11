#!/usr/bin/env node

/**
 * Script para analizar las imágenes de productos sin subirlas
 * Útil para verificar qué imágenes se van a procesar antes de subirlas
 */

import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

function extractSKU(filename) {
  const match = filename.match(/^(\d+)/);
  return match ? match[1] : null;
}

function getImageFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    try {
      const entries = readdirSync(currentDir);
      
      for (const entry of entries) {
        const fullPath = join(currentDir, entry);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (!entry.toLowerCase().includes('logo')) {
            traverse(fullPath);
          }
        } else if (stat.isFile()) {
          const ext = extname(entry).toLowerCase();
          const name = basename(entry, ext);
          
          if (IMAGE_EXTENSIONS.includes(ext) && !name.toLowerCase().includes('logo')) {
            files.push({ path: fullPath, name: entry });
          }
        }
      }
    } catch (error) {
      console.error(`Error leyendo directorio ${currentDir}:`, error.message);
    }
  }
  
  traverse(dir);
  return files;
}

function groupImagesBySKU(files) {
  const groups = {};
  const orphans = [];
  
  for (const file of files) {
    const sku = extractSKU(file.name);
    
    if (sku) {
      if (!groups[sku]) {
        groups[sku] = [];
      }
      groups[sku].push(file);
    } else {
      orphans.push(file);
    }
  }
  
  return { groups, orphans };
}

function main() {
  const photosDir = process.argv[2];
  
  if (!photosDir) {
    console.error('❌ Error: Debes proporcionar la ruta a la carpeta de fotografías');
    console.error('   Uso: node scripts/analyze-product-images.mjs <ruta-a-fotografias>');
    process.exit(1);
  }
  
  console.log('🔍 Analizando imágenes de productos...');
  console.log(`📁 Carpeta: ${photosDir}\n`);
  
  const imageFiles = getImageFiles(photosDir);
  console.log(`✓ Encontradas ${imageFiles.length} imágenes totales\n`);
  
  const { groups, orphans } = groupImagesBySKU(imageFiles);
  const skus = Object.keys(groups).sort();
  
  console.log('═══════════════════════════════════════════════════');
  console.log('📊 ANÁLISIS DE IMÁGENES POR SKU');
  console.log('═══════════════════════════════════════════════════\n');
  
  // Mostrar SKUs con múltiples imágenes (candidatos para carrusel)
  const multiImage = skus.filter(sku => groups[sku].length > 1);
  
  console.log(`🎠 SKUs con múltiples imágenes (${multiImage.length}):`);
  console.log('   (Estos productos tendrán carrusel de imágenes)\n');
  
  for (const sku of multiImage) {
    const images = groups[sku];
    console.log(`   📦 SKU ${sku} - ${images.length} imágenes:`);
    images.forEach((img, i) => {
      console.log(`      ${i + 1}. ${img.name}`);
    });
    console.log('');
  }
  
  // Mostrar SKUs con una sola imagen
  const singleImage = skus.filter(sku => groups[sku].length === 1);
  console.log(`\n📷 SKUs con una sola imagen (${singleImage.length}):`);
  if (singleImage.length > 0) {
    singleImage.slice(0, 10).forEach(sku => {
      console.log(`   • SKU ${sku}: ${groups[sku][0].name}`);
    });
    if (singleImage.length > 10) {
      console.log(`   ... y ${singleImage.length - 10} más`);
    }
  }
  
  // Mostrar imágenes sin SKU
  if (orphans.length > 0) {
    console.log(`\n⚠️  Imágenes sin SKU identificable (${orphans.length}):`);
    console.log('   (Estas imágenes se ignorarán)\n');
    orphans.slice(0, 10).forEach(img => {
      console.log(`   • ${img.name}`);
    });
    if (orphans.length > 10) {
      console.log(`   ... y ${orphans.length - 10} más`);
    }
  }
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log('📈 RESUMEN');
  console.log('═══════════════════════════════════════════════════\n');
  console.log(`Total de imágenes: ${imageFiles.length}`);
  console.log(`SKUs únicos: ${skus.length}`);
  console.log(`Productos con carrusel (>1 imagen): ${multiImage.length}`);
  console.log(`Productos con 1 imagen: ${singleImage.length}`);
  console.log(`Imágenes sin SKU: ${orphans.length}`);
  console.log(`Total de imágenes a subir: ${imageFiles.length - orphans.length}`);
  console.log('');
}

main();

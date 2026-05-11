# Scripts de Gestión de Imágenes de Productos

Este directorio contiene scripts para gestionar imágenes de productos en Sanity CMS.

## Scripts Disponibles

### 1. `analyze-product-images.mjs`

Analiza las imágenes de productos sin subirlas. Útil para verificar qué se va a procesar.

**Uso:**
```bash
npm run products:analyze "/ruta/a/Fotografías"
```

**Ejemplo:**
```bash
npm run products:analyze "/Users/StuartGP/Downloads/yectic- Alimentos Convenientes San Patric/Fotografías"
```

**Salida:**
- Lista de SKUs con múltiples imágenes (tendrán carrusel)
- Lista de SKUs con una sola imagen
- Imágenes sin SKU identificable (se ignorarán)
- Resumen de estadísticas

### 2. `upload-product-images.mjs`

Sube automáticamente las imágenes a Sanity CMS y actualiza los productos.

**Requisitos:**
1. Crear un archivo `.env` en la raíz del proyecto con:
   ```env
   SANITY_PROJECT_ID=tu_project_id
   SANITY_DATASET=production
   SANITY_API_TOKEN=tu_token_con_permisos_de_escritura
   ```

2. Obtener un token de API con permisos de escritura:
   - Ve a https://www.sanity.io/manage
   - Selecciona tu proyecto
   - Ve a "API" → "Tokens"
   - Crea un nuevo token con permisos de "Editor" o "Administrator"

**Uso:**
```bash
npm run products:upload "/ruta/a/Fotografías"
```

**Ejemplo:**
```bash
npm run products:upload "/Users/StuartGP/Downloads/yectic- Alimentos Convenientes San Patric/Fotografías"
```

**Proceso:**
1. Escanea todas las imágenes en la carpeta
2. Agrupa por SKU (extrae el número al inicio del nombre del archivo)
3. Busca cada producto en Sanity por SKU
4. Sube las imágenes asociadas
5. Actualiza el campo `gallery` del producto
6. Muestra un resumen al final

## Análisis Actual

Basado en el último análisis de imágenes:

- **Total de imágenes:** 217
- **SKUs únicos:** 95
- **Productos con carrusel (>1 imagen):** 25
- **Productos con 1 imagen:** 70
- **Imágenes sin SKU:** 91
- **Total de imágenes a subir:** 126

### Productos destacados con múltiples imágenes:

- **SKU 9054795** (futbol Goalz): 5 imágenes
- **SKU 00500520** (Pan Martin's): 3 imágenes
- **SKU 470144** (Corte Twister): 3 imágenes
- **SKU 79038634** (Papa hash brown): 3 imágenes
- **25 productos más** con 2 imágenes cada uno

## Convenciones de Nombres

Para que las imágenes se asocien correctamente con los productos:

1. **El nombre del archivo debe comenzar con el SKU:**
   - ✅ Correcto: `10121 Ketchup Heinz.png`
   - ✅ Correcto: `10121 empaque.jpg`
   - ❌ Incorrecto: `Ketchup Heinz 10121.png`

2. **Extensiones soportadas:**
   - `.png`
   - `.jpg`
   - `.jpeg`
   - `.webp`

3. **Imágenes de logos se ignoran automáticamente:**
   - Archivos con "logo" en el nombre se saltan
   - Carpetas con "logo" en el nombre se saltan

## Cómo funciona el carrusel

Una vez que las imágenes se suben a Sanity:

1. **En ProductPage:** Se muestra automáticamente un carrusel si el producto tiene más de 1 imagen en su campo `gallery`
2. **Thumbnails:** Los usuarios pueden hacer clic en las miniaturas para cambiar de imagen
3. **Zoom:** Cada imagen tiene un botón de zoom
4. **Máximo:** Cada producto puede tener hasta 8 imágenes

## Notas Importantes

⚠️ **Antes de ejecutar `products:upload`:**
1. Ejecuta primero `products:analyze` para ver qué se va a subir
2. Asegúrate de tener un backup de tu base de datos de Sanity
3. El proceso subirá todas las imágenes encontradas (puede tardar varios minutos)
4. Las imágenes se suben a Sanity y NO se pueden deshacer fácilmente

💡 **Recomendación:**
- Prueba primero con un subconjunto pequeño de imágenes
- Verifica que los productos existan en Sanity con los SKUs correctos
- Revisa los resultados antes de continuar con más imágenes

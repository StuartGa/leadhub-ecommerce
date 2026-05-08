# Workflow de Integracion de Logos de Marcas

Este flujo asegura que todos los logos usados en el sitio sean correctos, esten optimizados y cumplan con uso autorizado.

## 1) Completar manifest

Archivo: `BRANDS_LOGO_MANIFEST.csv`

Campos clave:

- `official_website`: sitio oficial de la marca
- `logo_svg_url`: URL oficial de SVG (si existe)
- `logo_png_url`: URL oficial PNG (fallback)
- `license_source`: referencia de permiso/uso autorizado
- `approved`: `yes` o `pending`
- `use_in_site`: `yes` o `no`

## 2) Criterios de aceptacion por logo

Antes de integrar un logo:

1. Verificar que la URL venga de fuente oficial de la marca.
2. Verificar consistencia visual (sin deformacion, fondo limpio).
3. Confirmar permisos de uso (`license_source`).
4. Marcar `approved=yes` y `use_in_site=yes` en el manifest.

## 3) Integracion tecnica

Destino sugerido:

- `public/brands/<brand-id>.svg`
- `public/brands/<brand-id>.webp` (si aplica)

Luego actualizar:

- `src/infrastructure/data/brands.ts`

Formato recomendado:

- Prioridad 1: SVG
- Prioridad 2: WebP

## 4) Optimizacion

Si llega PNG/JPG:

1. Exportar a WebP (calidad 85-90).
2. Escalar maximo a 900px para evitar peso innecesario.
3. Mantener version original en una carpeta de respaldo si se requiere.

## 5) QA final

1. Revisar que el logo cargue en:
   - Home (`BrandsSection`)
   - Pagina de marcas (`BrandsPage`)
2. Probar fallback cuando un archivo no exista.
3. Ejecutar:

```bash
npm run lint
npm run build
```

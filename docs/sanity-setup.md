# Sanity CMS Setup (SaaS)

Este documento deja listo el flujo para que el cliente administre productos, categorias y marcas con workflow editorial.

## 1) Levantar Studio

1. Ir a `sanity/`.
2. Instalar dependencias: `npm install`.
3. Copiar variables: `.env.example` -> `.env`.
4. Completar:
   - `SANITY_STUDIO_PROJECT_ID`
   - `SANITY_STUDIO_DATASET`
5. Iniciar Studio: `npm run dev`.

## 2) Schemas incluidos

- `product` con workflow editorial (`draft`, `in_review`, `approved`, `published`, `archived`).
- `category` editable por cliente.
- `brand` editable por cliente.

Archivos:

- `sanity/schemaTypes/product.ts`
- `sanity/schemaTypes/category.ts`
- `sanity/schemaTypes/brand.ts`
- `sanity/schemaTypes/index.ts`
- `sanity/sanity.config.ts`

## 3) Conectar frontend (ya implementado)

Variables en app principal (`.env`):

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`
- `VITE_SANITY_USE_CDN`

Servicios conectados:

- `src/infrastructure/cms/sanityClient.ts`
- `src/infrastructure/cms/cmsProductRepository.ts`
- `src/infrastructure/cms/cmsBrandRepository.ts`

## 4) Workflow editorial recomendado

- Editor: crea/edita y cambia a `in_review`.
- Aprobador: valida y cambia a `approved`.
- Publicador: cambia a `published`.
- Para sacar del sitio: usar `isActive=false` o `archived`.

Nota: para estados `approved/published`, el schema exige `approvedBy` y `approvedAt`.

## 5) Migracion desde Excel (catalogo Abril 2026)

1. Normalizar columnas (nombre, sku, categoria, marca, descripcion, temperatura, stock, imagen, MOQ, step).
2. Crear referencias de categoria y marca primero.
3. Importar productos con slugs unicos.
4. Subir imagen principal y galeria por producto.
5. Validar productos faltantes y duplicados.

## 6) QA antes de publicar

En app principal:

1. `npm run lint`
2. `npm run build`
3. Probar:
   - `/productos`
   - `/productos/categoria/:slug`
   - `/products/:productId`
   - `/cotizacion`
   - `/contact`

## 7) Siguientes pasos sugeridos

1. Definir roles reales en Sanity (Editor/Aprobador/Admin).
2. Crear script de import para el Excel de Abril 2026.
3. Conectar webhook GHL v2 para validar `quoteItems` en CRM.
4. Agregar preview de documentos en Studio para revisión editorial rápida.

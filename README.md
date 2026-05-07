# San Patric Foodservice — Landing Page

Sitio web moderno y profesional para San Patric Foodservice, empresa 100% mexicana especializada en distribución y acondicionamiento de alimentos convenientes para el sector foodservice y retail.

## 🎯 Características

- **Diseño Stitch Replicado**: Paleta de colores rojo/rosa (#b12455, #500021) con Material Design 3
- **Catálogo de Productos**: 12 categorías de alimentos (Acompañantes, Proteínas, Lácteos, Repostería, etc.)
- **Formulario de Contacto**: Integración con GHL webhook, campos específicos foodservice (Giro del negocio, Sucursales, Localidad)
- **Secciones Completas**:
  - Hero con CTA y diseño split-screen
  - Sobre Nosotros con galería de imágenes
  - Estadísticas (+35 Proveedores, +750 Clientes, +200 Productos)
  - Temperatura de Distribución (Seco, Refrigerado, Congelado)
  - Clientes y Testimonios
  - Cobertura Nacional por regiones
- **Responsive**: Menú móvil hamburguesa completamente funcional
- **Optimizado**: Code splitting con React.lazy para mejor performance
- **SEO**: Meta tags en español, structured data, sitemap
- **Seguridad**: DOMPurify, Zod validation, CSP headers

## 🚀 Tech Stack

- **React 19** con TypeScript
- **Vite 8** para build ultrarrápido
- **Tailwind CSS v4** con tokens Material Design
- **React Router DOM** con lazy loading
- **React Hook Form + Zod** para validación
- **Framer Motion** para animaciones
- **DOMPurify** para protección XSS

## 📁 Estructura del Proyecto

```
src/
  domain/         # Tipos & esquemas (sin dependencias UI)
    types/        # Product, GHL interfaces
    schemas/      # Zod schemas (contactSchema con BUSINESS_TYPES, ESTADOS_MEXICO)
  application/    # Casos de uso
    hooks/        # useGHLIntegration, useDocumentTitle
    services/     # productService (DOMPurify sanitization)
  infrastructure/ # Fuentes de datos externas
    data/         # products.json (12 productos foodservice)
  ui/             # Presentación pura
    components/   
      home/       # HeroSection, AboutSection, StatsSection, etc.
      catalog/    # ProductGrid, ProductCard
      form/       # ContactForm (businessType, branchCount, location)
      layout/     # Header (con menú móvil), Footer
    pages/        # HomePage, ProductPage, ContactPage
```

## ⚙️ Instalación

### Prerequisitos

- Node.js 24+
- npm o pnpm

### Setup

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tu webhook de GHL
# VITE_GHL_WEBHOOK_URL=https://rest.gohighlevel.com/v1/tu-endpoint
```

### Desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173`

### Build Producción

```bash
npm run build
```

Output optimizado en `dist/` con:
- **Code splitting**: 6 chunks separados
- **HomePage**: 134KB (43KB gzip)
- **ContactPage**: 103KB (31KB gzip)
- **ProductPage**: 3.8KB (1.3KB gzip)
- **CSS total**: 29KB (5.9KB gzip)

### Preview

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 🎨 Diseño y Branding

### Paleta de Colores

- **Primary**: `#b12455` (brand-500) - Rosa San Patric
- **Secondary**: `#500021` (brand-900) - Burgundy
- **Surface**: Material Design 3 tokens
- **Logo**: SVG custom en `/public/logo.svg`

### Tipografía

- **Fuente**: Roboto (alternativa a Metropolis de Stitch)
- **Weights**: 300 (light), 400 (normal), 600 (semibold)
- **Sistema de texto**: headline-lg, display-xl, body-lg, label-caps

### Espaciado

- **Section padding**: 5rem (80px)
- **Container max**: 75rem (1200px)
- **Gutter**: 1.5rem (24px)
- **Unit base**: 0.5rem (8px)

## 📋 Formulario de Contacto

### Campos Implementados

1. **Giro del Negocio** (dropdown):
   - Restaurante
   - Hotel
   - Cafetería
   - Servicio de Catering
   - Hospital
   - Escuela
   - Supermercado
   - Mayorista
   - Otro

2. **Número de Sucursales** (number): 1-10,000

3. **Localidad** (dropdown): 32 estados de México

4. **Email** (email con validación)

5. **Teléfono** (tel con formato MX)

6. **Mensaje** (textarea 20-1000 caracteres)

7. **Productos de Interés** (multiselect chips)

### Validación

- **Schema**: `src/domain/schemas/contactSchema.ts`
- **Librería**: Zod v3 con mensajes en español
- **Sanitización**: DOMPurify antes de enviar a GHL

## 🌐 SEO

### Meta Tags (index.html)

- **Title**: "San Patric Foodservice — Alimentos Convenientes de Calidad Premium"
- **Description**: Optimizada para foodservice México
- **Locale**: `es_MX`
- **Theme color**: `#500021`

### Structured Data

```json
{
  "@type": "Organization",
  "name": "San Patric Foodservice",
  "availableLanguage": ["Spanish", "English"]
}
```

### Sitemap

`public/sitemap.xml` incluye:
- Homepage
- Contact page
- 12 páginas de productos

## 🔒 Seguridad

1. **`.env` nunca en git**: Webhook URL protegido
2. **Zod validation**: Todo input validado antes de enviar
3. **DOMPurify**: Sanitización de strings de productos
4. **No `dangerouslySetInnerHTML`**: En ningún componente
5. **CSP Headers**: Configurados en `vite.config.ts`, `_headers`, `vercel.json`
6. **HTTP errors ocultos**: Solo mensajes genéricos al usuario

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px (menú hamburguesa)
- **Tablet**: 768px - 1024px (md:)
- **Desktop**: > 1024px (lg:)

### Features Mobile

- Menú hamburguesa animado
- Hero section apilado verticalmente
- Grid de productos: 1 → 2 → 3 columnas
- Footer: 1 columna en móvil

## 🚢 Deployment

### GitHub Pages

Configurado en `.github/workflows/deploy-pages.yml`:

```yaml
- Build con VITE_BASE=/leadhub-ecommerce/
- Deploy a branch gh-pages
- SPA routing fallback con 404.html
```

URL: `https://stuartga.github.io/leadhub-ecommerce/`

### Netlify / Vercel

Soporta headers de seguridad completos:

- **Netlify**: `public/_headers`
- **Vercel**: `vercel.json`

## 🎯 Próximos Pasos (Opcional)

- [ ] Agregar imágenes reales de productos San Patric
- [ ] Integrar mapa interactivo de cobertura
- [ ] Agregar logos reales de clientes
- [ ] Implementar galería de fotos de almacenes/logística
- [ ] Agregar página de "Quiénes Somos" completa
- [ ] Integrar CMS para gestión de productos
- [ ] Agregar tracking real (GTM, GA4, Meta Pixel)

## 📄 Licencia

Proyecto privado para San Patric Foodservice.

## 📞 Contacto

Para preguntas sobre el proyecto, contactar al equipo de desarrollo.

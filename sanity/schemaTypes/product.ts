import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  groups: [
    { name: "catalog", title: "Catalogo" },
    { name: "content", title: "Contenido" },
    { name: "inventory", title: "Inventario" },
    { name: "media", title: "Media" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      group: "catalog",
      validation: (rule) => rule.required().min(2).max(140),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "catalog",
      options: { source: "name", maxLength: 120 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      group: "catalog",
      validation: (rule) => rule.required().min(2).max(60),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      group: "catalog",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Marca",
      type: "reference",
      to: [{ type: "brand" }],
      group: "catalog",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Descripcion corta",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().min(20).max(240),
    }),
    defineField({
      name: "longDescription",
      title: "Descripcion larga",
      type: "text",
      rows: 7,
      group: "content",
      validation: (rule) => rule.max(2000),
    }),
    defineField({
      name: "technicalInfo",
      title: "Ficha tecnica",
      type: "text",
      rows: 5,
      group: "content",
      validation: (rule) => rule.max(1500),
    }),
    defineField({
      name: "packaging",
      title: "Empaque",
      type: "string",
      group: "content",
      validation: (rule) => rule.max(250),
    }),
    defineField({
      name: "temperature",
      title: "Temperatura",
      type: "string",
      group: "inventory",
      options: {
        list: [
          { title: "Seco", value: "Seco" },
          { title: "Refrigerado", value: "Refrigerado" },
          { title: "Congelado", value: "Congelado" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seasonality",
      title: "Temporalidad",
      type: "string",
      group: "inventory",
      options: {
        list: [
          { title: "Todo el Ano", value: "Todo el Año" },
          { title: "Temporada", value: "Temporada" },
        ],
      },
    }),
    defineField({
      name: "inventoryUnit",
      title: "Unidad de inventario",
      type: "string",
      group: "inventory",
      initialValue: "unidad",
      options: {
        list: [{ title: "Unidad", value: "unidad" }],
      },
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "minOrderQty",
      title: "Cantidad minima",
      type: "number",
      group: "inventory",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "orderStep",
      title: "Incremento de pedido",
      type: "number",
      group: "inventory",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "inStock",
      title: "Disponible",
      type: "boolean",
      group: "inventory",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Etiquetas",
      type: "array",
      group: "catalog",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      group: "media",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeria",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (rule) => rule.min(1).max(8),
    }),
    defineField({
      name: "specSheet",
      title: "Ficha PDF",
      type: "file",
      group: "media",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "editorialStatus",
      title: "Estado editorial",
      type: "string",
      group: "workflow",
      initialValue: "draft",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "In review", value: "in_review" },
          { title: "Approved", value: "approved" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Activo en catalogo",
      type: "boolean",
      group: "workflow",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "approvedBy",
      title: "Aprobado por",
      type: "string",
      group: "workflow",
      validation: (rule) =>
        rule.custom((value, context) => {
          const status = (context.document as { editorialStatus?: string } | undefined)?.editorialStatus;
          if (status === "approved" || status === "published") {
            return value ? true : "Debe registrar quien aprobo este contenido.";
          }
          return true;
        }),
    }),
    defineField({
      name: "approvedAt",
      title: "Fecha de aprobacion",
      type: "datetime",
      group: "workflow",
      validation: (rule) =>
        rule.custom((value, context) => {
          const status = (context.document as { editorialStatus?: string } | undefined)?.editorialStatus;
          if (status === "approved" || status === "published") {
            return value ? true : "Debe registrar fecha de aprobacion.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "sku",
      media: "mainImage",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle ? `SKU: ${selection.subtitle}` : "Sin SKU",
        media: selection.media,
      };
    },
  },
});

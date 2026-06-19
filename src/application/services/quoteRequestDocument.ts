import { absoluteUrl } from "../constants/seo";

const BRAND_PRIMARY = "#b12455";
const BRAND_SECONDARY = "#500021";
const QUOTE_VALIDITY_DAYS = 7;

export interface QuoteRequestApplicant {
  contactName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  state?: string;
  locality?: string;
  message?: string;
}

export interface QuoteRequestDelivery {
  address?: string;
  requiredDate?: string;
  method?: string;
  notes?: string;
}

export interface QuoteRequestItem {
  productId?: string;
  productSlug?: string;
  productName: string;
  sku?: string;
  inventoryUnit?: string;
  quantity: number;
  notes?: string;
  technicalInfo?: string;
}

export interface QuoteRequestMeta {
  quoteNumber: string;
  requestDate: string;
  validityLabel: string;
  deadlineDate: string;
  subject: string;
  replyToEmail: string;
}

export interface BuildQuoteRequestHtmlInput {
  applicant?: QuoteRequestApplicant;
  delivery?: QuoteRequestDelivery;
  items?: QuoteRequestItem[];
  logoUrl?: string;
  generatedAt?: Date;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatLongDate(date: Date, timeZone = "America/Mexico_City"): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeZone,
  }).format(date);
}

function padQuoteSequence(value: number): string {
  return String(value).padStart(6, "0").slice(-6);
}

export function generateQuoteNumber(date = new Date()): string {
  const year = date.getFullYear();
  const sequence = padQuoteSequence(date.getTime() % 1_000_000);
  return `SC-${year}-${sequence}`;
}

export function buildQuoteRequestMeta(date = new Date()): QuoteRequestMeta {
  const quoteNumber = generateQuoteNumber(date);
  const requestDate = formatLongDate(date);
  const deadlineDate = formatLongDate(
    new Date(date.getTime() + QUOTE_VALIDITY_DAYS * 24 * 60 * 60 * 1000),
  );

  return {
    quoteNumber,
    requestDate,
    validityLabel: `${QUOTE_VALIDITY_DAYS} días naturales`,
    deadlineDate,
    subject: `Cotización - Sitio Web - No. ${quoteNumber}`,
    replyToEmail: "info@alimentosconvenientes.com.mx",
  };
}

function renderSpecs(item: QuoteRequestItem): string {
  const lines: string[] = [];

  if (item.sku) lines.push(`SKU: ${item.sku}`);
  if (item.inventoryUnit) lines.push(`Unidad: ${item.inventoryUnit}`);
  if (item.notes) lines.push(`Notas: ${item.notes}`);
  if (item.technicalInfo) lines.push(item.technicalInfo);

  if (lines.length === 0) {
    return "Conforme a ficha técnica del catálogo San Patric.";
  }

  return lines.map((line) => `• ${escapeHtml(line)}`).join("<br />");
}

function renderProductRows(items: QuoteRequestItem[] | undefined): string {
  if (!items?.length) {
    return `
      <tr>
        <td colspan="5" style="padding:16px;text-align:center;color:#64748b;">
          Sin productos en el carrito. El solicitante describió sus necesidades en el mensaje.
        </td>
      </tr>
    `;
  }

  return items
    .map(
      (item, index) => `
      <tr>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;text-align:center;">${index + 1}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;">${escapeHtml(item.sku || item.productId || "—")}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;">${escapeHtml(item.productName)}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;text-align:center;">${escapeHtml(String(item.quantity))}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;font-size:13px;line-height:1.5;">${renderSpecs(item)}</td>
      </tr>
    `,
    )
    .join("");
}

export function buildQuoteRequestHtml(input: BuildQuoteRequestHtmlInput): string {
  const meta = buildQuoteRequestMeta(input.generatedAt ?? new Date());
  const applicant = input.applicant ?? {};
  const delivery = input.delivery ?? {};
  const logoUrl = input.logoUrl ?? absoluteUrl("/brands/logos/san-patric.svg");

  const deliveryAddress = delivery.address?.trim() || "A convenir";
  const deliveryDate = delivery.requiredDate?.trim() || "A convenir";
  const deliveryMethod = delivery.method?.trim() || "A convenir";
  const deliveryNotes =
    delivery.notes?.trim() ||
    "Indicar tiempos y condiciones disponibles en su cotización.";

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Solicitud de Cotización ${escapeHtml(meta.quoteNumber)}</title>
  </head>
  <body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:920px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:28px 32px 20px;border-bottom:3px solid ${BRAND_PRIMARY};">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="vertical-align:top;width:55%;">
                <img src="${escapeHtml(logoUrl)}" alt="San Patric Foodservice" height="48" style="display:block;max-width:220px;height:auto;" />
              </td>
              <td style="vertical-align:top;text-align:right;">
                <div style="font-size:28px;font-weight:700;color:${BRAND_SECONDARY};letter-spacing:0.04em;">SOLICITUD DE COTIZACIÓN</div>
                <div style="margin-top:10px;font-size:14px;color:#334155;">No. ${escapeHtml(meta.quoteNumber)}</div>
                <div style="margin-top:4px;font-size:14px;color:#334155;">Fecha de solicitud: ${escapeHtml(meta.requestDate)}</div>
                <div style="margin-top:4px;font-size:14px;color:#334155;">Vigencia de la solicitud: ${escapeHtml(meta.validityLabel)}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px 8px;">
          <div style="font-size:18px;font-weight:700;color:${BRAND_PRIMARY};">Solicitud de cotización - Sitio Web</div>
          <p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#334155;">
            Por favor, envíen su mejor cotización para los productos y cantidades solicitados, conforme a las especificaciones indicadas.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 32px 24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width:50%;vertical-align:top;padding-right:16px;">
                <div style="font-size:16px;font-weight:700;color:${BRAND_SECONDARY};margin-bottom:12px;">Datos del solicitante</div>
                <div style="font-size:14px;line-height:1.8;color:#334155;">
                  <div><strong>Nombre:</strong> ${escapeHtml(applicant.contactName || "—")}</div>
                  <div><strong>Empresa:</strong> ${escapeHtml(applicant.companyName || "—")}</div>
                  <div><strong>Correo electrónico:</strong> ${escapeHtml(applicant.email || "—")}</div>
                  <div><strong>Teléfono de contacto:</strong> ${escapeHtml(applicant.phone || "—")}</div>
                  <div><strong>Estado:</strong> ${escapeHtml(applicant.state || "—")}</div>
                  <div><strong>Localidad:</strong> ${escapeHtml(applicant.locality || "—")}</div>
                </div>
              </td>
              <td style="width:50%;vertical-align:top;padding-left:16px;">
                <div style="font-size:16px;font-weight:700;color:${BRAND_SECONDARY};margin-bottom:12px;">Información de entrega (opcional)</div>
                <div style="font-size:14px;line-height:1.8;color:#334155;">
                  <div><strong>Dirección:</strong> ${escapeHtml(deliveryAddress)}</div>
                  <div><strong>Fecha requerida de entrega:</strong> ${escapeHtml(deliveryDate)}</div>
                  <div><strong>Método de entrega preferido:</strong> ${escapeHtml(deliveryMethod)}</div>
                  <div><strong>Notas de entrega:</strong> ${escapeHtml(deliveryNotes)}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 32px 24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th style="padding:10px 12px;border:1px solid ${BRAND_PRIMARY};background:${BRAND_PRIMARY};color:#ffffff;text-align:left;font-size:13px;">No.</th>
                <th style="padding:10px 12px;border:1px solid ${BRAND_PRIMARY};background:${BRAND_PRIMARY};color:#ffffff;text-align:left;font-size:13px;">Código / SKU</th>
                <th style="padding:10px 12px;border:1px solid ${BRAND_PRIMARY};background:${BRAND_PRIMARY};color:#ffffff;text-align:left;font-size:13px;">Producto</th>
                <th style="padding:10px 12px;border:1px solid ${BRAND_PRIMARY};background:${BRAND_PRIMARY};color:#ffffff;text-align:left;font-size:13px;">Cantidad</th>
                <th style="padding:10px 12px;border:1px solid ${BRAND_PRIMARY};background:${BRAND_PRIMARY};color:#ffffff;text-align:left;font-size:13px;">Especificaciones técnicas (requeridas)</th>
              </tr>
            </thead>
            <tbody>
              ${renderProductRows(input.items)}
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 32px 24px;">
          <div style="font-size:16px;font-weight:700;color:${BRAND_SECONDARY};margin-bottom:10px;">Instrucciones para el proveedor</div>
          <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;color:#334155;">
            <li>Enviar cotización detallada por producto, incluyendo precio unitario, impuestos y condiciones comerciales.</li>
            <li>Confirmar disponibilidad de inventario y tiempos de entrega estimados.</li>
            <li>Incluir ficha técnica o documentación de calidad cuando aplique.</li>
            <li>Responder antes de la fecha límite indicada al correo y asunto señalados.</li>
          </ul>
          ${
            applicant.message
              ? `<p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#334155;"><strong>Mensaje del solicitante:</strong> ${escapeHtml(applicant.message)}</p>`
              : ""
          }
        </td>
      </tr>
      <tr>
        <td style="padding:20px 32px 28px;border-top:1px solid #e2e8f0;background:#fafafa;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="vertical-align:top;width:55%;">
                <div style="font-size:15px;font-weight:700;color:${BRAND_SECONDARY};">Enviar cotización a:</div>
                <div style="margin-top:8px;font-size:14px;color:#334155;">${escapeHtml(meta.replyToEmail)}</div>
                <div style="margin-top:8px;font-size:14px;color:#334155;"><strong>Asunto:</strong> ${escapeHtml(meta.subject)}</div>
              </td>
              <td style="vertical-align:top;text-align:right;">
                <div style="font-size:15px;font-weight:700;color:${BRAND_SECONDARY};">Fecha límite para recibir cotización</div>
                <div style="margin-top:8px;font-size:18px;font-weight:700;color:${BRAND_PRIMARY};">${escapeHtml(meta.deadlineDate)}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildQuoteRequestPreviewInput(
  applicant: QuoteRequestApplicant,
  items: QuoteRequestItem[],
  delivery?: QuoteRequestDelivery,
): BuildQuoteRequestHtmlInput {
  return {
    applicant,
    delivery,
    items,
    logoUrl: absoluteUrl("/brands/logos/san-patric.svg"),
  };
}

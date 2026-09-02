function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderRow(label, value) {
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;width:38%;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(value)}</td>
    </tr>
  `;
}

export function buildLandingLeadEmail({ payload }) {
  const productInterest = payload.categories?.[0] ?? "—";
  const subject = `Nuevo lead HORECA — ${payload.companyName}`;

  const html = `
    <div style="font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
      <h1 style="margin:0 0 8px;font-size:20px;color:#500021;">Nuevo lead — Landing HORECA</h1>
      <p style="margin:0 0 20px;color:#64748b;font-size:14px;">
        Solicitud recibida desde la landing de Alimentos Convenientes San Patric.
      </p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        ${renderRow("Nombre", payload.contactName)}
        ${renderRow("Negocio", payload.companyName)}
        ${renderRow("Correo", payload.email)}
        ${renderRow("Teléfono", payload.phone)}
        ${renderRow("Tipo de negocio", payload.businessType)}
        ${renderRow("Producto de interés", productInterest)}
        ${renderRow("Estado", payload.state)}
        ${renderRow("Mensaje", payload.message)}
      </table>
    </div>
  `;

  return { subject, html };
}

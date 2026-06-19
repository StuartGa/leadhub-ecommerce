import { useMemo } from "react";

import {
  buildQuoteRequestHtml,
  type QuoteRequestApplicant,
  type QuoteRequestDelivery,
  type QuoteRequestItem,
  buildQuoteRequestPreviewInput,
} from "../../../application/services/quoteRequestDocument";

interface QuoteRequestPreviewProps {
  applicant: QuoteRequestApplicant;
  items: QuoteRequestItem[];
  delivery?: QuoteRequestDelivery;
  title?: string;
}

export function QuoteRequestPreview({
  applicant,
  items,
  delivery,
  title = "Vista previa — Solicitud de Cotización",
}: QuoteRequestPreviewProps) {
  const html = useMemo(
    () => buildQuoteRequestHtml(buildQuoteRequestPreviewInput(applicant, items, delivery)),
    [applicant, delivery, items],
  );

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm font-semibold text-brand-900">{title}</p>
        <p className="text-xs text-slate-600">
          Formato profesional enviado al equipo comercial cuando hay productos en el carrito.
        </p>
      </div>
      <iframe
        title={title}
        srcDoc={html}
        className="h-[720px] w-full bg-white"
        sandbox="allow-same-origin"
      />
    </div>
  );
}

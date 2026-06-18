import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useGHLIntegration } from "../../../application/hooks/useGHLIntegration";
import { mapLeadToGHLPayload } from "../../../application/services/leadService";
import {
  type LeadFormValues,
  leadSchema,
  LANDING_PRODUCTS,
} from "../../../domain/schemas/leadSchema";
import {
  BUSINESS_TYPES,
  ESTADOS_MEXICO,
} from "../../../domain/schemas/contactSchema";

const inputClass =
  "w-full rounded border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none";

const labelClass = "mb-1 block text-xs font-medium text-slate-600";

export function LeadForm() {
  const { submit, status, error, reset: resetGHL } = useGHLIntegration();
  const [honeypot, setHoneypot] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      acceptPrivacy: undefined,
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    const payload = mapLeadToGHLPayload(data);
    await submit(payload, "landing-horeca", honeypot);
  };

  if (status === "success") {
    return (
      <div
        className="rounded-xl bg-white p-6 shadow-xl sm:p-8"
        aria-live="polite"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-7 w-7 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            ¡Solicitud enviada!
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Un asesor se pondrá en contacto contigo pronto.
          </p>
          <button
            type="button"
            onClick={() => {
              resetGHL();
              reset();
            }}
            className="mt-6 cursor-pointer rounded bg-brand-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:p-8">
      <h2 className="mb-1 text-center text-base font-semibold leading-snug text-brand-700 sm:text-lg">
        Solicita información y un asesor te contactará
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-5 flex flex-col gap-3.5"
      >
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <div>
          <label htmlFor="lead-contactName" className={labelClass}>
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <input
            {...register("contactName")}
            id="lead-contactName"
            type="text"
            autoComplete="name"
            placeholder="Ej: Juan Pérez"
            aria-invalid={errors.contactName ? "true" : "false"}
            className={inputClass}
          />
          {errors.contactName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.contactName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-companyName" className={labelClass}>
            Nombre del negocio <span className="text-red-500">*</span>
          </label>
          <input
            {...register("companyName")}
            id="lead-companyName"
            type="text"
            autoComplete="organization"
            placeholder="Ej: Restaurante El Buen Sabor"
            aria-invalid={errors.companyName ? "true" : "false"}
            className={inputClass}
          />
          {errors.companyName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-email" className={labelClass}>
            Correo electrónico <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            id="lead-email"
            type="email"
            autoComplete="email"
            placeholder="correo@empresa.com"
            aria-invalid={errors.email ? "true" : "false"}
            className={inputClass}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lead-phone" className={labelClass}>
            Teléfono / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+52 55 1234 5678"
            aria-invalid={errors.phone ? "true" : "false"}
            className={inputClass}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lead-businessType" className={labelClass}>
            Tipo de negocio <span className="text-red-500">*</span>
          </label>
          <select
            {...register("businessType")}
            id="lead-businessType"
            defaultValue=""
            aria-invalid={errors.businessType ? "true" : "false"}
            className={inputClass}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p className="mt-1 text-xs text-red-600">
              {errors.businessType.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-productInterest" className={labelClass}>
            Productos de interés <span className="text-red-500">*</span>
          </label>
          <select
            {...register("productInterest")}
            id="lead-productInterest"
            defaultValue=""
            aria-invalid={errors.productInterest ? "true" : "false"}
            className={inputClass}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {LANDING_PRODUCTS.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
          {errors.productInterest && (
            <p className="mt-1 text-xs text-red-600">
              {errors.productInterest.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-state" className={labelClass}>
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            {...register("state")}
            id="lead-state"
            defaultValue=""
            aria-invalid={errors.state ? "true" : "false"}
            className={inputClass}
          >
            <option value="" disabled>
              Selecciona tu estado
            </option>
            {ESTADOS_MEXICO.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <input
            {...register("acceptPrivacy")}
            id="lead-acceptPrivacy"
            type="checkbox"
            aria-invalid={errors.acceptPrivacy ? "true" : "false"}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
          />
          <label htmlFor="lead-acceptPrivacy" className="text-xs text-slate-600">
            Acepto el{" "}
            <a href="#" className="text-brand-600 underline hover:text-brand-700">
              aviso de privacidad
            </a>{" "}
            y el tratamiento de mis datos personales.{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.acceptPrivacy && (
          <p className="text-xs text-red-600">{errors.acceptPrivacy.message}</p>
        )}

        {status === "error" && error && (
          <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 w-full cursor-pointer rounded-md bg-brand-600 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-800 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Enviando…" : "Enviar solicitud"}
        </button>
      </form>
    </div>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useGHLIntegration } from "../../../application/hooks/useGHLIntegration";
import type { GHLWebhookPayload } from "../../../domain/types/ghl";
import {
  type ContactFormValues,
  contactSchema,
  BUSINESS_TYPES,
  ESTADOS_MEXICO,
  PRODUCT_CATEGORIES,
} from "../../../domain/schemas/contactSchema";

export function ContactForm() {
  const { submit, status, error, reset: resetGHL } = useGHLIntegration();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  // Sync form value when selectedCategories changes
  useEffect(() => {
    setValue("categories", selectedCategories);
    trigger("categories");
  }, [selectedCategories, setValue, trigger]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const onSubmit = async (data: ContactFormValues) => {
    const payload: GHLWebhookPayload = {
      contactName: data.contactName.trim(),
      companyName: data.companyName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      businessType: data.businessType,
      branchCount: data.branchCount,
      state: data.state,
      locality: data.locality.trim(),
      categories: data.categories,
      message: data.message.trim(),
    };
    await submit(payload);
  };

  if (status === "success") {
    return (
      <section
        id="contact"
        className="mx-auto max-w-xl px-6 py-24 text-center"
        aria-live="polite"
      >
        <div className="rounded-lg border border-green-200 bg-green-50 p-10">
          <p className="font-sans text-2xl font-semibold text-green-800">
            ¡Gracias por tu consulta!
          </p>
          <p className="mt-2 font-sans text-base text-green-700">
            Nos pondremos en contacto contigo en las próximas 24 horas.
          </p>
          <button
            type="button"
            onClick={() => {
              resetGHL();
              setSelectedCategories([]);
              reset();
            }}
            className="mt-6 cursor-pointer rounded bg-brand-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-900 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Enviar otra consulta
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-xl px-6 py-24 sm:px-6"
      aria-labelledby="contact-heading"
    >
      <h2
        id="contact-heading"
        className="mb-8 text-center font-sans text-3xl font-normal uppercase tracking-wider text-slate-900 sm:text-4xl"
      >
        CONTÁ<span className="font-semibold">CTANOS</span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-md sm:p-8"
      >
        {/* Nombre del Contacto */}
        <div>
          <label
            htmlFor="contactName"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nombre del Contacto <span className="text-red-500">*</span>
          </label>
          <input
            {...register("contactName")}
            id="contactName"
            type="text"
            autoComplete="name"
            placeholder="Ej: Juan Pérez"
            aria-invalid={errors.contactName ? "true" : "false"}
            aria-describedby={errors.contactName ? "contactName-error" : undefined}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
          />
          {errors.contactName && (
            <p id="contactName-error" className="mt-1 text-xs text-red-600">
              {errors.contactName.message}
            </p>
          )}
        </div>

        {/* Nombre de la Empresa */}
        <div>
          <label
            htmlFor="companyName"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nombre de la Empresa <span className="text-red-500">*</span>
          </label>
          <input
            {...register("companyName")}
            id="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Ej: Restaurante El Buen Sabor"
            aria-invalid={errors.companyName ? "true" : "false"}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
          />
          {errors.companyName && (
            <p id="companyName-error" className="mt-1 text-xs text-red-600">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Email y Teléfono */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="correo@empresa.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phone")}
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="55 1234 5678"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-xs text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Giro del Negocio y Número de Sucursales */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="businessType"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Giro del Negocio <span className="text-red-500">*</span>
            </label>
            <select
              {...register("businessType")}
              id="businessType"
              aria-invalid={errors.businessType ? "true" : "false"}
              aria-describedby={errors.businessType ? "businessType-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            >
              <option value="">Seleccione una opción</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.businessType && (
              <p id="businessType-error" className="mt-1 text-xs text-red-600">
                {errors.businessType.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="branchCount"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Número de Sucursales <span className="text-red-500">*</span>
            </label>
            <input
              {...register("branchCount", { valueAsNumber: true })}
              id="branchCount"
              type="number"
              min="1"
              max="10000"
              placeholder="Ej: 5"
              aria-invalid={errors.branchCount ? "true" : "false"}
              aria-describedby={errors.branchCount ? "branchCount-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            />
            {errors.branchCount && (
              <p id="branchCount-error" className="mt-1 text-xs text-red-600">
                {errors.branchCount.message}
              </p>
            )}
          </div>
        </div>

        {/* Estado y Localidad */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="state"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Estado <span className="text-red-500">*</span>
            </label>
            <select
              {...register("state")}
              id="state"
              aria-invalid={errors.state ? "true" : "false"}
              aria-describedby={errors.state ? "state-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            >
              <option value="">Seleccione un estado</option>
              {ESTADOS_MEXICO.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
            {errors.state && (
              <p id="state-error" className="mt-1 text-xs text-red-600">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="locality"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Localidad o Código Postal <span className="text-red-500">*</span>
            </label>
            <input
              {...register("locality")}
              id="locality"
              type="text"
              placeholder="Ej: Guadalajara o 44100"
              aria-invalid={errors.locality ? "true" : "false"}
              aria-describedby={errors.locality ? "locality-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            />
            {errors.locality && (
              <p id="locality-error" className="mt-1 text-xs text-red-600">
                {errors.locality.message}
              </p>
            )}
          </div>
        </div>

        {/* Categorías */}
        <div>
          <label
            id="categories-label"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Elegir Categorías <span className="text-red-500">*</span>
          </label>

          {/* Hidden input for form validation */}
          <input
            type="hidden"
            {...register("categories")}
          />

          {/* Selected chips */}
          {selectedCategories.length > 0 && (
            <div
              className="mb-3 flex flex-wrap gap-2"
              aria-labelledby="categories-label"
            >
              {selectedCategories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-2 rounded-lg bg-brand-100 px-3 py-1.5 text-sm font-medium text-brand-800"
                >
                  <span>{category}</span>
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    aria-label={`Eliminar ${category}`}
                    className="rounded-full p-0.5 transition-colors hover:bg-brand-200 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Category selection list */}
          <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-slate-300 p-3">
            {PRODUCT_CATEGORIES.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-brand-50 text-brand-900 font-medium"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category}</span>
                    {isSelected && (
                      <svg
                        className="h-5 w-5 text-brand-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {errors.categories && (
            <p
              id="categories-error"
              className="mt-1 text-xs text-red-600"
            >
              {errors.categories.message}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Mensaje <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={4}
            placeholder="Cuéntanos sobre tu negocio y necesidades..."
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="cursor-pointer rounded bg-brand-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-900 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Enviando..." : "Enviar Consulta"}
        </button>
      </form>
    </section>
  );
}

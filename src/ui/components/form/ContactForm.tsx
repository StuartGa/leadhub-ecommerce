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
} from "../../../domain/schemas/contactSchema";
import type { Product } from "../../../domain/types/product";

interface ContactFormProps {
  products: Product[];
  preselectedProductIds?: string[];
}

export function ContactForm({
  products,
  preselectedProductIds = [],
}: ContactFormProps) {
  const { submit, status, error, reset: resetGHL } = useGHLIntegration();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      productInterestIds: preselectedProductIds,
    },
  });

  // Initialize selected IDs from preselection
  useEffect(() => {
    if (preselectedProductIds.length > 0) {
      const validIds = preselectedProductIds.filter((id) =>
        products.some((p) => p.id === id),
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIds(validIds);
      setValue("productInterestIds", validIds);
      reset({
        productInterestIds: validIds,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync form value when selectedIds changes
  useEffect(() => {
    setValue("productInterestIds", selectedIds);
    trigger("productInterestIds");
  }, [selectedIds, setValue, trigger]);

  const toggleProduct = (productId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const removeProduct = (productId: string) => {
    setSelectedIds((prev) => prev.filter((id) => id !== productId));
  };

  const onSubmit = async (data: ContactFormValues) => {
    // Derive product names from IDs
    const productInterestNames = data.productInterestIds
      .map((id) => products.find((p) => p.id === id)?.name)
      .filter((name): name is string => name !== undefined);

    const payload: GHLWebhookPayload = {
      businessType: data.businessType,
      branchCount: data.branchCount,
      location: data.location,
      email: data.email.trim(),
      phone: data.phone.trim(),
      message: data.message.trim(),
      productInterestIds: data.productInterestIds,
      productInterestNames,
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
              setSelectedIds([]);
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
              htmlFor="location"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Localidad (Estado) <span className="text-red-500">*</span>
            </label>
            <select
              {...register("location")}
              id="location"
              aria-invalid={errors.location ? "true" : "false"}
              aria-describedby={errors.location ? "location-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            >
              <option value="">Seleccione un estado</option>
              {ESTADOS_MEXICO.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
            {errors.location && (
              <p id="location-error" className="mt-1 text-xs text-red-600">
                {errors.location.message}
              </p>
            )}
          </div>
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
            placeholder="Ejemplo: 5"
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

        <div>
          <label
            id="productInterest-label"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Productos de Interés <span className="text-red-500">*</span>
          </label>

          {/* Hidden input for form validation */}
          <input
            type="hidden"
            {...register("productInterestIds")}
          />

          {/* Selected chips */}
          {selectedIds.length > 0 && (
            <div
              className="mb-3 flex flex-wrap gap-2"
              aria-labelledby="productInterest-label"
            >
              {selectedIds.map((id) => {
                const product = products.find((p) => p.id === id);
                if (!product) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-2 rounded-lg bg-brand-100 px-3 py-1.5 text-sm font-medium text-brand-800"
                  >
                    <span>{product.name}</span>
                    <button
                      type="button"
                      onClick={() => removeProduct(id)}
                      aria-label={`Eliminar ${product.name}`}
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
                );
              })}
            </div>
          )}

          {/* Product selection list */}
          <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-slate-300 p-3">
            {products.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.id)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-brand-50 text-brand-900 font-medium"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{product.name}</span>
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

          {errors.productInterestIds && (
            <p
              id="productInterest-error"
              className="mt-1 text-xs text-red-600"
            >
              {errors.productInterestIds.message}
            </p>
          )}
        </div>

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useGHLIntegration } from "../../../application/hooks/useGHLIntegration";
import type { GHLWebhookPayload } from "../../../domain/types/ghl";
import {
  type ContactFormValues,
  contactSchema,
} from "../../../domain/schemas/contactSchema";
import type { Product } from "../../../domain/types/product";

interface ContactFormProps {
  products: Product[];
  preselectedProduct?: string | null;
}

export function ContactForm({
  products,
  preselectedProduct,
}: ContactFormProps) {
  const { submit, status, error, reset } = useGHLIntegration();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      productInterest: preselectedProduct ?? "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const payload: GHLWebhookPayload = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      message: data.message.trim(),
      productInterest: data.productInterest || undefined,
    };
    await submit(payload);
  };

  if (status === "success") {
    return (
      <section
        id="contact"
        className="mx-auto max-w-xl px-4 py-24 text-center"
        aria-live="polite"
      >
        <div className="rounded-2xl border border-green-200 bg-green-50 p-10">
          <p className="text-2xl font-semibold text-green-800">
            Thank you for your inquiry!
          </p>
          <p className="mt-2 text-green-700">
            We will get back to you within 24 hours.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 cursor-pointer rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Send another inquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-xl px-4 py-24 sm:px-6"
      aria-labelledby="contact-heading"
    >
      <h2
        id="contact-heading"
        className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
      >
        Get in Touch
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              type="text"
              autoComplete="given-name"
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-1 text-xs text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              type="text"
              autoComplete="family-name"
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            />
            {errors.lastName && (
              <p id="lastName-error" className="mt-1 text-xs text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
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
            Phone <span className="text-red-500">*</span>
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
            htmlFor="productInterest"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Service Interested In
          </label>
          <select
            {...register("productInterest")}
            id="productInterest"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
          >
            <option value="">Select a service (optional)</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Message <span className="text-red-500">*</span>
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
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="cursor-pointer rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </section>
  );
}

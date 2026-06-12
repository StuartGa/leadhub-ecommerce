import type { ReactNode } from "react";

interface IdealForItem {
  label: string;
  icon: ReactNode;
}

interface IdealForGridProps {
  title?: string;
  items: IdealForItem[];
  variant?: "grey" | "white";
}

export function IdealForGrid({
  title = "Ideales para:",
  items,
  variant = "grey",
}: IdealForGridProps) {
  return (
    <div
      className={
        variant === "grey"
          ? "mt-12 bg-slate-50 py-10 sm:py-12"
          : "mt-12 bg-white py-10 sm:py-12"
      }
    >
      <p className="mb-8 text-center text-sm font-semibold text-slate-800 sm:text-base">
        {title}
      </p>
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-center gap-x-6 gap-y-8 px-4 sm:gap-x-10 lg:gap-x-14">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex w-[7.5rem] flex-col items-center gap-3 text-center sm:w-32 lg:w-36"
          >
            <div className="flex h-14 w-14 items-center justify-center text-brand-600 sm:h-16 sm:w-16 [&_svg]:h-10 [&_svg]:w-10 sm:[&_svg]:h-12 sm:[&_svg]:w-12">
              {item.icon}
            </div>
            <span className="text-xs leading-snug text-slate-700 sm:text-sm">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CheckItem({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-3 text-sm text-slate-800">
      <svg
        className="h-4 w-4 shrink-0 text-brand-600"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </li>
  );
}

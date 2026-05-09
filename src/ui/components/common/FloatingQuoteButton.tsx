import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuoteCart } from "../../../application/hooks/useQuoteCart";

export function FloatingQuoteButton() {
  const { distinctProducts } = useQuoteCart();

  if (distinctProducts === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="fixed bottom-1/3 right-6 z-50"
    >
      <Link
        to="/cotizacion"
        aria-label={`${distinctProducts} productos en cotización`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-brand-700 focus-visible:ring-4 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white shadow">
          {distinctProducts}
        </span>
      </Link>
    </motion.div>
  );
}

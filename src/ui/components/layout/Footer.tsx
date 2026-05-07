import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} LeadHub. All rights reserved.
          </p>
          <nav aria-label="Footer links">
            <ul className="flex gap-6 text-sm text-slate-500">
              <li>
                <Link to="/contact" className="transition-colors hover:text-slate-700">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-slate-700">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-slate-700">
                  Terms of Service
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

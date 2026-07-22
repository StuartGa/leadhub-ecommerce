import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

type RouteErrorBoundaryProps = {
  children: ReactNode;
};

type RouteErrorBoundaryState = {
  hasError: boolean;
};

export class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  state: RouteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Route render failed:", error, info.componentStack);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-slate-900">
        <h1 className="text-2xl font-bold text-brand-900">
          No pudimos cargar esta página
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          Puede deberse a una actualización reciente del sitio. Recarga la página
          o regresa al inicio para continuar.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={this.handleRetry}
            className="rounded bg-brand-600 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-800"
          >
            Recargar
          </button>
          <Link
            to="/"
            className="rounded border border-slate-300 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-slate-700 transition-colors hover:border-brand-500 hover:text-brand-700"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    );
  }
}

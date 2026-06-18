import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

function isSafeSpaPath(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) {
    return false;
  }
  if (path.includes("\\") || /[\0\r\n]/.test(path)) {
    return false;
  }
  return true;
}

function applyGitHubPagesRedirect() {
  const url = new URL(window.location.href);
  const redirectedPath = url.searchParams.get("p");
  if (!redirectedPath || !isSafeSpaPath(redirectedPath)) return;

  url.searchParams.delete("p");
  const cleanBase = url.pathname.replace(/\/$/, "");
  window.history.replaceState(
    null,
    "",
    `${cleanBase}${redirectedPath}${url.search}${url.hash}`,
  );
}

applyGitHubPagesRedirect();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

function applyGitHubPagesRedirect() {
  const url = new URL(window.location.href);
  const redirectedPath = url.searchParams.get("p");
  if (!redirectedPath) return;

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

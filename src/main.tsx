
  // @ts-ignore react-dom/client types are not installed in this project.
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  // @ts-ignore CSS module declarations are not installed in this project.
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);

  // Register Progressive Web App service worker for Mobile & Desktop offline and installation support
  if ("serviceWorker" in navigator && !window.location.host.includes("localhost")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("The Pride Times PWA ServiceWorker active:", reg.scope))
        .catch((err) => console.warn("PWA ServiceWorker registration notice:", err));
    });
  }
  
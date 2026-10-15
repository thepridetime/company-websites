
  // @ts-ignore react-dom/client types are not installed in this project.
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  // @ts-ignore CSS module declarations are not installed in this project.
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  
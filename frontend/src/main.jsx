import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Use a self-executing async function to load polyfills dynamically.
// This bypasses the static module analysis that is causing the CJS/ESM SyntaxError.
(async () => {
  try {
    // Dynamically import the polyfills
    const bufferModule = await import('buffer');
    const processModule = await import('process');

    // Attach the necessary objects to the global window scope for compatibility.
    // We defensively check for the Buffer class on the root object, or the default export.
    window.Buffer = bufferModule.Buffer || bufferModule.default;
    window.process = processModule;

    // Once polyfills are loaded, render the application
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  } catch (error) {
    console.error("Failed to load polyfills and render application:", error);
  }
})();
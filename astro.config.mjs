// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Define la URL base de tu sitio para generar URLs absolutas en el sitemap.
  site: "https://timbertec.pages.dev/",
  /* Esto controla el error de las rutas terminadas en / de cloudflare */
  trailingSlash: "always",
  integrations: [sitemap()],
});

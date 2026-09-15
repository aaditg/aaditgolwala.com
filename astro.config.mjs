// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// Canonical host. www redirects here in worker/index.js.
// SITE_URL overrides for preview deploys; `||` because CI passes "" when unset.
const site = process.env.SITE_URL || "https://aaditgolwala.com";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
});
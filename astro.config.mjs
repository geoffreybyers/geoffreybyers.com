// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://geoffreybyers.com",
  trailingSlash: "never",
  integrations: [mdx(), sitemap(), preact()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "min-light",
        dark: "night-owl",
      },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ["/pagefind/pagefind.js"],
      },
    },
  },
});
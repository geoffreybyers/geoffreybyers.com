// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://geoffreybyers.com",
  trailingSlash: "never",
  integrations: [mdx()],
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
  },
});

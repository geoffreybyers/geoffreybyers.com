// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://geoffreybyers.com",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
});

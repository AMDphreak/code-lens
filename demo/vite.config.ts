import path from "node:path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: "./",
  plugins: [solid()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@code-lens/solid": path.resolve(__dirname, "../packages/solid/src/index.ts"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 5174,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensure it points to the directory containing `index.html`
  base: "./",
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "@vitejs/plugin-react"],
  },
});

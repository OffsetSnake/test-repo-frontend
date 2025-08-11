import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import solidSvg from "vite-plugin-solid-svg";
import path from "path";

export default defineConfig({
  plugins: [solid(), solidSvg()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`, // можно подключить глобально
      },
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});

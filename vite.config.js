import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://v6.exchangerate-api.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api/, "/v6/4b948ebe6e96d10d04c97923"),
      },
    },
  },
  plugins: [react()],
});

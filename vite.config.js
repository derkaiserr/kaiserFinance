import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v6": "https://v6.exchangerate-api.com",
    },
  },
  plugins: [react()],
});

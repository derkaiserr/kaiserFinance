import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api":
        "https://v6.exchangerate-api.com/v6/5395552a5b807960dbf0f7df/latest/USD",
    },
  },
  plugins: [react()],
});

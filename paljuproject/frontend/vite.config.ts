import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",           // Serve on all network interfaces
    port: 5173,                // Keep default or change if you like
    proxy: {
      "/api": "http://192.168.1.3:5000", // Proxy API calls to Flask
    },
  },
});

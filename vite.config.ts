import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  server: { https: false }, // Not needed for Vite 5+
  plugins: [react(), mkcert()],
});

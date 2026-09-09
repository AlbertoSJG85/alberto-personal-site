import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Salida standalone: la imagen Docker de producción solo necesita
  // node + el bundle generado, sin node_modules completo ni el código
  // fuente — mucho más ligera para Coolify.
  output: "standalone",
};

export default nextConfig;

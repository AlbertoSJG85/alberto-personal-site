# Imagen de producción para Coolify. Tres etapas: dependencias, build y
# runtime — la que corre en el servidor solo lleva el output "standalone"
# de Next.js (server.js + node_modules mínimos), no el código fuente ni el
# árbol de dependencias completo.
#
# Runtime y base fijados por versión, no con una etiqueta flotante como
# "node:20" o "node:lts": si el digest de "20" cambia mañana, el build de
# hoy no debe verse afectado.
FROM node:20.18.1-alpine3.20 AS base

# ---------------------------------------------------------------- deps
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# `npm ci`, no `npm install`: instalación congelada desde el lockfile,
# nunca resolver versiones nuevas en el propio despliegue.
RUN npm ci

# ---------------------------------------------------------------- builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------------------------------------------------------------- runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# `sharp` (para el optimizador de imágenes de next/image fuera de Vercel)
# necesita las librerías nativas de Alpine.
RUN apk add --no-cache libc6-compat

# Usuario propio, no root: el proceso de la aplicación no necesita
# privilegios de administrador dentro del contenedor.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

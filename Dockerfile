# -----------------------
# ✅ Etapa 1: Build de la app con Vite
# -----------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -----------------------
# ✅ Etapa 2: Imagen final optimizada (usando un servidor estático)
# -----------------------
FROM node:20-alpine AS production

WORKDIR /app

# Instalar un servidor estático (serve)
RUN npm install -g serve

# Copiar solo los archivos de build
COPY --from=build /app/dist ./dist

# Exponer puerto (Render usa 10000, pero 4173 es el de vite preview)
EXPOSE 4173

# Comando de producción
CMD ["serve", "-s", "dist", "-l", "4173"]
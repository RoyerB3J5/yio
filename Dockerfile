FROM node:22-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.21.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-slim AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.21.0 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 1. Declarar todos los argumentos que envía Easypanel
ARG SHOPIFY_STOREFRONT_ACCESS_TOKEN
ARG SHOPIFY_API_SECRET
ARG SHOPIFY_STOREFRONT_API_VERSION
ARG SHOPIFY_STORE_DOMAIN
ARG NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL

# 2. Asignarlos como Variables de Entorno para el Build
ENV SHOPIFY_STOREFRONT_ACCESS_TOKEN=$SHOPIFY_STOREFRONT_ACCESS_TOKEN
ENV SHOPIFY_API_SECRET=$SHOPIFY_API_SECRET
ENV SHOPIFY_STOREFRONT_API_VERSION=$SHOPIFY_STOREFRONT_API_VERSION
ENV SHOPIFY_STORE_DOMAIN=$SHOPIFY_STORE_DOMAIN
ENV NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL=$NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL

RUN pnpm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
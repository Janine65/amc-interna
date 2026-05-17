# --- Stage 1: Build ---
# Tipp: für volle Reproduzierbarkeit Digest pinnen:
#   FROM node:22-bookworm-slim@sha256:<digest> AS builder
FROM node:22-bookworm-slim AS builder

ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    CI=true

WORKDIR /app

# pnpm via corepack (offizieller Node-Mechanismus, reproduzierbar)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Erst nur Lockfiles kopieren -> bessere Layer-Caching für Dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Jetzt erst restliche Sourcen kopieren
COPY . .
RUN pnpm run build --prod

# --- Stage 2: Runtime ---
# Non-root NGINX (läuft als UID 101, kann an Ports >= 1024 binden -> 4200 passt)
FROM nginxinc/nginx-unprivileged:1.28-alpine

# nginx.conf erst, damit Server-Block vor den Assets steht
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /app/dist/ /usr/share/nginx/html/

EXPOSE 4200

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4200/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]

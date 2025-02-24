FROM node:20-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build --prod
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/ ./
COPY --from=builder /app/nginx.conf/ /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
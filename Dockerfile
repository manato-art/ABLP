# --- build stage: produce the static export (out/) ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- run stage: serve the static files ---
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g serve@14
COPY --from=builder /app/out ./out

# Railway injects PORT at runtime; serve binds 0.0.0.0 by default.
CMD ["sh", "-c", "serve out -l ${PORT:-3000}"]

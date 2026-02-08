FROM node:24-alpine AS base

FROM base AS builder
RUN apk update

WORKDIR /app

RUN npm i pnpm@10.26.2 -g
COPY . .

RUN pnpm dlx turbo@^2.5.3 prune @apartments-ai/core --docker

FROM base AS installer

WORKDIR /app

RUN npm i pnpm@10.26.2 -g

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apartments-ai

USER apartments-ai

COPY --from=installer --chown=apartments-ai:nodejs /app .

CMD ["node", "apps/core/dist/main.js"]
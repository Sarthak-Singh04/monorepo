# Base image for both builder and installer
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update

# Builder stage
FROM base AS builder
WORKDIR /app
# Install turbo globally
RUN yarn global add turbo

# Copy the entire monorepo
COPY . .

# Prune the project (using `docs` as the app name)
RUN turbo prune --scope=chatbot --docker

# Installer stage
FROM base AS installer
WORKDIR /app

# Install pnpm globally
RUN yarn global add pnpm
RUN yarn global add turbo

# Copy pruned workspace and install dependencies with pnpm
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Copy the full source from the pruned workspace
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args for remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

# Build the `docs` project
RUN turbo build --filter=chatbot...

# Runner stage for production
FROM base AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy necessary files for production
COPY --from=installer /app/apps/chatbot/next.config.js .
COPY --from=installer /app/apps/chatbot/package.json .

# Leverage output traces to reduce image size
COPY --from=installer --chown=nextjs:nodejs /app/apps/chatbot/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/chatbot/.next/static ./apps/docs/.next/static
# Uncomment to include public assets
COPY --from=installer --chown=nextjs:nodejs /app/apps/chatbot/public ./apps/docs/public

# Start the Next.js server
CMD node apps/chatbot/server.js

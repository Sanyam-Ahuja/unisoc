FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY backend/package.json backend/pnpm-lock.yaml backend/tsconfig.json ./
COPY backend/pnpm-workspace.yaml ./
COPY backend/src ./src
RUN pnpm install --frozen-lockfile && pnpm build
ENV NODE_ENV=production
EXPOSE 8000
CMD ["pnpm", "start"]

FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY backend/package.json backend/tsconfig.json ./
COPY backend/src ./src
RUN pnpm install --no-frozen-lockfile && pnpm build
ENV NODE_ENV=production
EXPOSE 8000
CMD ["pnpm", "start"]

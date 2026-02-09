# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY tsconfig.json ./

# Copy packages
# COPY packages/ ./packages/

# Copy notification-service
COPY services/notification-service/ ./services/notification-service/

# Install dependencies (workspace-aware)
RUN npm ci

# Build shared packages first
# RUN npm run build --workspace=packages/common
# RUN npm run build --workspace=packages/logger
# RUN npm run build --workspace=packages/database

# Build notification-service
RUN npm run build --workspace=services/notification-service

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY tsconfig.json ./

# Copy packages
# COPY packages/ ./packages/

# Copy notification-service source
COPY services/notification-service/package.json ./services/notification-service/

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built artifacts from builder
# COPY --from=builder /app/packages/common/dist ./packages/common/dist
# COPY --from=builder /app/packages/logger/dist ./packages/logger/dist
# COPY --from=builder /app/packages/database/dist ./packages/database/dist
COPY --from=builder /app/services/notification-service/dist ./services/notification-service/dist

WORKDIR /app/services/notification-service

EXPOSE 4000

CMD ["node", "dist/main.js"]

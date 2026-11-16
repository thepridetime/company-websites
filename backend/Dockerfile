# Multi-stage production build for AWS Elastic Beanstalk / ECS / App Runner
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Final lean runtime image
FROM node:20-alpine

WORKDIR /usr/src/app

# Security: run as non-root user
USER node

COPY --chown=node:node --from=builder /usr/src/app ./

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Built-in container healthcheck for AWS ECS / ALB
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["node", "server.js"]


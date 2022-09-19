# Web Dashboard Build Stage
FROM node:16.6.1-alpine AS web-dashboard-build

WORKDIR /tmp/web-dashboard
COPY web-dashboard/package*.json ./

RUN npm ci
COPY web-dashboard/ ./

RUN npm run build

# Server Build Stage
FROM node:16.6.1-alpine AS server-build

WORKDIR /tmp/server
COPY server/package*.json ./

RUN npm ci
COPY server/ ./

RUN npm run build

# Image
FROM node:16.6.1-alpine

ARG DATE_CREATED
ARG VERSION

LABEL org.opencontainers.image.created=$DATE_CREATED
LABEL org.opencontainers.image.version=$VERSION
LABEL org.opencontainers.image.authors="moonstar-x"
LABEL org.opencontainers.image.vendor="Freenalytics"
LABEL org.opencontainers.image.title="Freenalytics"
LABEL org.opencontainers.image.description="An open source, self-hosted dashboard for usage analytics of general use applications."
LABEL org.opencontainers.image.source="https://github.com/freenalytics/freenalytics"

WORKDIR /opt/app
COPY server/package*.json ./

RUN npm ci --only=prod
COPY README.md LICENSE Dockerfile ./
COPY --from=server-build /tmp/server/build/ ./build/
COPY --from=web-dashboard-build /tmp/web-dashboard/build/ ./client-build/

ENV PORT=4000
ENV NODE_ENV=production

CMD ["npm", "start"]

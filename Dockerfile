FROM node:22-alpine AS base

RUN npm install -g pnpm@10.27.0

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_MEDIA_URL
ARG NEXT_PUBLIC_TELEGRAM_BOT_USERNAME
ARG NEXT_PUBLIC_LIVEKIT_WS_URL
ARG NEXT_PUBLIC_WEBSOCKET_URL

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
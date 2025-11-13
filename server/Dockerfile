FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV DATABASE_URL="mysql://root:root@db:3306/todo"

RUN npx prisma generate
RUN npm run build

# ----------------------------------------

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV DATABASE_URL="mysql://root:root@db:3306/todo"
#ENV JWT_SECRET="supersecret"

EXPOSE 3000

CMD npx prisma migrate deploy && node dist/src/main.js

FROM node:18-alpine
WORKDIR /usr/src/app

COPY shared/package.json ./shared/package.json
RUN npm install --prefix shared

COPY services/auth/package.json ./services/auth/package.json
RUN npm install --prefix services/auth

COPY shared ./shared
COPY services/auth ./services/auth

RUN if [ -f /usr/src/app/services/auth/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/auth && npx prisma generate --schema prisma/schema.prisma; \
    fi

CMD ["sh", "-c", "cd /usr/src/app/services/auth && npm run dev"]

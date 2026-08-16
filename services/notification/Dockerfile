FROM node:18-alpine
WORKDIR /usr/src/app

COPY shared/package.json ./shared/package.json
RUN npm install --prefix shared

COPY services/notification/package.json ./services/notification/package.json
RUN npm install --prefix services/notification

COPY shared ./shared
COPY services/notification ./services/notification

RUN if [ -f /usr/src/app/services/notification/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/notification && npx prisma generate --schema prisma/schema.prisma; \
    fi

CMD ["sh", "-c", "cd /usr/src/app/services/notification && npm run dev"]

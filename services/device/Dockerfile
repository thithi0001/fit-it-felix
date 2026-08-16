FROM node:18-alpine
WORKDIR /usr/src/app

COPY shared/package.json ./shared/package.json
RUN npm install --prefix shared

COPY services/device/package.json ./services/device/package.json
RUN npm install --prefix services/device

COPY shared ./shared
COPY services/device ./services/device

RUN if [ -f /usr/src/app/services/device/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/device && npx prisma generate --schema prisma/schema.prisma; \
    fi

CMD ["sh", "-c", "cd /usr/src/app/services/device && npm run dev"]

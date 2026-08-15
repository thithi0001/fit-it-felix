FROM node:18-alpine
WORKDIR /usr/src/app

COPY shared/package.json ./shared/package.json
RUN npm install --prefix shared

COPY services/inventory/package.json ./services/inventory/package.json
RUN npm install --prefix services/inventory

COPY shared ./shared
COPY services/inventory ./services/inventory

RUN if [ -f /usr/src/app/services/inventory/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/inventory && npx prisma generate --schema prisma/schema.prisma; \
    fi

CMD ["sh", "-c", "cd /usr/src/app/services/inventory && npm run dev"]

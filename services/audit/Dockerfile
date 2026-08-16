FROM node:18-alpine
WORKDIR /usr/src/app

COPY shared/package.json ./shared/package.json
RUN npm install --prefix shared

COPY services/audit/package.json ./services/audit/package.json
RUN npm install --prefix services/audit

COPY shared ./shared
COPY services/audit ./services/audit

RUN if [ -f /usr/src/app/services/audit/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/audit && npx prisma generate --schema prisma/schema.prisma; \
    fi

CMD ["sh", "-c", "cd /usr/src/app/services/audit && npm run dev"]

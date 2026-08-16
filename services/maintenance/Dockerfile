FROM node:18-alpine
WORKDIR /usr/src/app

COPY shared/package.json ./shared/package.json
RUN npm install --prefix shared

COPY services/maintenance/package.json ./services/maintenance/package.json
RUN npm install --prefix services/maintenance

COPY shared ./shared
COPY services/maintenance ./services/maintenance

RUN if [ -f /usr/src/app/services/maintenance/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/maintenance && npx prisma generate --schema prisma/schema.prisma; \
    fi

CMD ["sh", "-c", "cd /usr/src/app/services/maintenance && npm run dev"]

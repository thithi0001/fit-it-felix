FROM node:18-alpine
WORKDIR /usr/src/app

COPY shared/package.json ./shared/package.json
RUN npm install --prefix shared

COPY services/user/package.json ./services/user/package.json
RUN npm install --prefix services/user

COPY shared ./shared
COPY services/user ./services/user

RUN if [ -f /usr/src/app/services/user/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/user && npx prisma generate --schema prisma/schema.prisma; \
    fi

CMD ["sh", "-c", "cd /usr/src/app/services/user && npm run dev"]

FROM node:18-alpine
WORKDIR /usr/src/app

COPY shared/package.json ./shared/package.json
RUN npm install --prefix shared

COPY gateway/package.json ./gateway/package.json
RUN npm install --prefix gateway

COPY shared ./shared
COPY gateway ./gateway

CMD ["sh", "-c", "cd /usr/src/app/gateway && npm run dev"]

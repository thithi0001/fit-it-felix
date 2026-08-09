FROM node:18-alpine
WORKDIR /usr/src/app

COPY shared/package.json ./shared/package.json
RUN npm install --prefix shared

COPY shared ./shared

CMD ["node", "-e", "console.log('shared package ready')"]

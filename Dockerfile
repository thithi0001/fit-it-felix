FROM node:18
WORKDIR /usr/src/app

ARG SERVICE_PATH=services/auth
ENV SERVICE_PATH=${SERVICE_PATH}

COPY . .

RUN test -f /usr/src/app/shared/package.json \
    && npm install --prefix shared \
    && npm install --prefix ${SERVICE_PATH}

CMD ["sh", "-c", "cd /usr/src/app/${SERVICE_PATH} && npm run dev --if-present"]

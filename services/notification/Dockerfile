FROM node:18-alpine
WORKDIR /usr/src/app

# Copy dependency manifests first for better Docker cache reuse
COPY shared/package.json ./shared/package.json
COPY services/notification/package.json ./services/notification/package.json

# Install shared + service dependencies
RUN npm install --prefix shared \
    && npm install --prefix services/notification

# Copy Prisma schema before application code so client generation can use cache efficiently
COPY services/notification/prisma ./services/notification/prisma
RUN if [ -f /usr/src/app/services/notification/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/notification && npx prisma generate --schema prisma/schema.prisma; \
    fi

# Copy the rest of the application source after dependencies are installed
COPY shared ./shared
COPY services/notification ./services/notification

CMD ["sh", "-c", "cd /usr/src/app/services/notification && npm run dev"]

FROM node:18-alpine
WORKDIR /usr/src/app

# Copy dependency manifests first for better Docker cache reuse
COPY shared/package.json ./shared/package.json
COPY services/device/package.json ./services/device/package.json

# Install shared + service dependencies
RUN npm install --prefix shared \
    && npm install --prefix services/device

# Copy Prisma schema before application code so client generation can use cache efficiently
COPY services/device/prisma ./services/device/prisma
RUN if [ -f /usr/src/app/services/device/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/device && npx prisma generate --schema prisma/schema.prisma; \
    fi

# Copy the rest of the application source after dependencies are installed
COPY shared ./shared
COPY services/device ./services/device

CMD ["sh", "-c", "cd /usr/src/app/services/device && npm run dev"]

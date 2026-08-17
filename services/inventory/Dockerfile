FROM node:18-alpine
WORKDIR /usr/src/app

# Copy dependency manifests first for better Docker cache reuse
COPY shared/package.json ./shared/package.json
COPY services/inventory/package.json ./services/inventory/package.json

# Install shared + service dependencies
RUN npm install --prefix shared \
    && npm install --prefix services/inventory

# Copy Prisma schema before application code so client generation can use cache efficiently
COPY services/inventory/prisma ./services/inventory/prisma
RUN if [ -f /usr/src/app/services/inventory/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/inventory && npx prisma generate --schema prisma/schema.prisma; \
    fi

# Copy the rest of the application source after dependencies are installed
COPY shared ./shared
COPY services/inventory ./services/inventory

CMD ["sh", "-c", "cd /usr/src/app/services/inventory && npm run dev"]

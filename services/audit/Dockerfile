FROM node:18-alpine
WORKDIR /usr/src/app

# Copy dependency manifests first for better Docker cache reuse
COPY shared/package.json ./shared/package.json
COPY services/audit/package.json ./services/audit/package.json

# Install shared + service dependencies
RUN npm install --prefix shared \
    && npm install --prefix services/audit

# Copy Prisma schema before application code so client generation can use cache efficiently
COPY services/audit/prisma ./services/audit/prisma
RUN if [ -f /usr/src/app/services/audit/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/audit && npx prisma generate --schema prisma/schema.prisma; \
    fi

# Copy the rest of the application source after dependencies are installed
COPY shared ./shared
COPY services/audit ./services/audit

CMD ["sh", "-c", "cd /usr/src/app/services/audit && npm run dev"]

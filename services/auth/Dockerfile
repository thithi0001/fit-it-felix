FROM node:18-alpine
WORKDIR /usr/src/app

# Copy dependency manifests first for better Docker cache reuse
COPY shared/package.json ./shared/package.json
COPY services/auth/package.json ./services/auth/package.json

# Install shared + service dependencies
RUN npm install --prefix shared \
    && npm install --prefix services/auth

# Copy Prisma schema before application code so client generation can use cache efficiently
COPY services/auth/prisma ./services/auth/prisma
RUN if [ -f /usr/src/app/services/auth/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/auth && npx prisma generate --schema prisma/schema.prisma; \
    fi

# Copy the rest of the application source after dependencies are installed
COPY shared ./shared
COPY services/auth ./services/auth

CMD ["sh", "-c", "cd /usr/src/app/services/auth && npm run dev"]

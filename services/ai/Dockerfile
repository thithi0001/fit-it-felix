FROM node:18-alpine
WORKDIR /usr/src/app

# Copy dependency manifests first for better Docker cache reuse
COPY shared/package.json ./shared/package.json
COPY services/ai/package.json ./services/ai/package.json

# Install shared + service dependencies
RUN npm install --prefix shared \
    && npm install --prefix services/ai

# Copy Prisma schema before application code so client generation can use cache efficiently
COPY services/ai/prisma ./services/ai/prisma
RUN if [ -f /usr/src/app/services/ai/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/ai && npx prisma generate --schema prisma/schema.prisma; \
    fi

# Copy the rest of the application source after dependencies are installed
COPY shared ./shared
COPY services/ai ./services/ai

CMD ["sh", "-c", "cd /usr/src/app/services/ai && npm run dev"]

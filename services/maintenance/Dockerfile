FROM node:18-alpine
WORKDIR /usr/src/app

# Copy dependency manifests first for better Docker cache reuse
COPY shared/package.json ./shared/package.json
COPY services/maintenance/package.json ./services/maintenance/package.json

# Install shared + service dependencies
RUN npm install --prefix shared \
    && npm install --prefix services/maintenance

# Copy Prisma schema before application code so client generation can use cache efficiently
COPY services/maintenance/prisma ./services/maintenance/prisma
RUN if [ -f /usr/src/app/services/maintenance/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/maintenance && npx prisma generate --schema prisma/schema.prisma; \
    fi

# Copy the rest of the application source after dependencies are installed
COPY shared ./shared
COPY services/maintenance ./services/maintenance

CMD ["sh", "-c", "cd /usr/src/app/services/maintenance && npm run dev"]

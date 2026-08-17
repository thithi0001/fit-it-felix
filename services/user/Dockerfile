FROM node:18-alpine
WORKDIR /usr/src/app

# Copy dependency manifests first for better Docker cache reuse
COPY shared/package.json ./shared/package.json
COPY services/user/package.json ./services/user/package.json

# Install shared + service dependencies
RUN npm install --prefix shared \
    && npm install --prefix services/user

# Copy Prisma schema before application code so client generation can use cache efficiently
COPY services/user/prisma ./services/user/prisma
RUN if [ -f /usr/src/app/services/user/prisma/schema.prisma ]; then \
      cd /usr/src/app/services/user && npx prisma generate --schema prisma/schema.prisma; \
    fi

# Copy the rest of the application source after dependencies are installed
COPY shared ./shared
COPY services/user ./services/user

CMD ["sh", "-c", "cd /usr/src/app/services/user && npm run dev"]

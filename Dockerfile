FROM mcr.microsoft.com/playwright:v1.60.0-jammy

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm 

RUN pnpm install --frozen-lockfile || true && \
    pnpm approve-builds --all || true && \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

CMD ["pnpm", "test"]
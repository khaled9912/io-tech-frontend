# -------------------------
# Stage 1: Build the Next.js app
# -------------------------
FROM node:18-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --frozen-lockfile || yarn install --frozen-lockfile

# Copy all source code
COPY . .

# Build the Next.js app
RUN npm run build || yarn build

# -------------------------
# Stage 2: Run the Next.js app
# -------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies
RUN npm install --omit=dev || yarn install --production

# Expose Next.js port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]

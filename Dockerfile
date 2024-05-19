# Stage 1: Build the React app
FROM node:17-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React app
FROM node:17-alpine
WORKDIR /app
COPY --from=builder /app/build /app
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "/app", "-l", "3000"]

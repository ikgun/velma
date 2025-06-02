## Use Node 23 (matching your installed version)
#FROM node:23 AS build
#
## Set working directory
#WORKDIR /app
#
## Copy package files and install dependencies
#COPY package*.json ./
#RUN npm install
#
## Copy rest of source code
#COPY . .
#
#RUN npm run build
## Expose Vite dev server port
#EXPOSE 3000
#
## Start dev server (hot reload)
#CMD ["npm", "run", "dev"]


# Stage 1: Build the frontend with Node.js
FROM node:23 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy custom nginx config into container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose NGINX port
EXPOSE 8080

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]


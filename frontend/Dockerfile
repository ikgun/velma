# Use Node 23 (matching your installed version)
FROM node:23 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of source code
COPY . .

RUN npm run build
# Expose Vite dev server port
EXPOSE 3000

# Start dev server (hot reload)
CMD ["npm", "run", "dev"]

#FROM node:23 AS build
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN npm install
#
#COPY . .
#
#ARG VITE_CLERK_PUBLISHABLE_KEY
#ARG VITE_API_BASE_URL
#
#ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
#ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
#
#RUN echo THE VAL IS $VITE_CLERK_PUBLISHABLE_KEY
#
#RUN npm run build
#
#FROM nginx:alpine
#
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#
#COPY --from=build /app/dist /usr/share/nginx/html
#
#EXPOSE 8080
#
#CMD ["nginx", "-g", "daemon off;"]


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


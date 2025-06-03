# Stage 1: Build the frontend with Node.js
FROM node:23 AS builder

WORKDIR /app

# Accept the Clerk publishable key as a build argument
ARG VITE_CLERK_PUBLISHABLE_KEY
# Set it as an environment variable so Vite can read it during build
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

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
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]



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
#FROM node:23 AS builder
#
#WORKDIR /app
#
#COPY package*.json ./
#RUN npm install
#
#COPY . .
## Inject environment variable (build arg -> env)
#ARG VITE_CLERK_PUBLISHABLE_KEY
#ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
#RUN npm run build
#
## Stage 2: Serve with NGINX
#FROM nginx:alpine
#
## Copy custom nginx config into container
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#
## Copy built frontend from builder stage
#COPY --from=builder /app/dist /usr/share/nginx/html
#
## Expose NGINX port
#EXPOSE 80
#
## Run NGINX in foreground
#CMD ["nginx", "-g", "daemon off;"]

#ELIAS
## Stage 1: Build
#FROM node:20 AS build
#WORKDIR /app
#COPY . .
#
#ARG VITE_CLERK_PUBLISHABLE_KEY
#ARG VITE_API_PATH
#
#ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
#ENV VITE_API_PATH=$VITE_API_PATH
#
#RUN npm install
#RUN npm run build
#
#
## Stage 2: Serve
#FROM nginx:alpine
#WORKDIR /usr/share/nginx/html
#COPY --from=build /app/dist .
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

#AMANDAS
#FROM node:18 AS build
#WORKDIR /app
#COPY .env.production .env
#COPY package*.json ./
#RUN npm install
#COPY . .
#ARG VITE_REACT_APP_TEST_1
#ENV VITE_REACT_APP_TEST_1=${VITE_REACT_APP_TEST_1}
#RUN echo THE VAL IS $VITE_REACT_APP_TEST_1
#RUN npm run build
#FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /app/dist /usr/share/nginx/html
#EXPOSE 8080
#CMD ["nginx", "-g", "daemon off;"]



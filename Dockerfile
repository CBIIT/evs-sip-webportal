# Stage 1: Build React App with Vite
FROM node:18 AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Copy the entire project into the container
COPY . .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Set working directory inside Nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy the built files from the previous stage
COPY --from=builder /usr/src/app/build .

# Copy custom Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 
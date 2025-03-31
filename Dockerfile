# Stage 1: Build React App with Vite
# Use an alpine variant for smaller image size
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# Copy these first to leverage Docker cache
COPY package*.json ./

# Install dependencies using npm ci for faster, more reliable builds
# If you don't have a package-lock.json, use 'npm install'
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React app
# Vite typically outputs to './dist', verify this matches your project setup
RUN npm run build

# Stage 2: Serve static files with Apache HTTP Server (httpd)
FROM httpd:alpine

# Set Apache's document root as working directory
WORKDIR /usr/local/apache2/htdocs/

# Remove default index.html
RUN rm -f index.html

# Copy built assets from the builder stage's 'dist' directory
# Ensure '/app/dist' matches the output directory from the build stage
COPY --from=builder /app/dist .

# Copy a custom httpd.conf file to handle SPA routing and logging
# This configuration ensures that requests to non-existent files/paths
# are redirected to /index.html for React Router to handle.
# COPY my-httpd.conf /usr/local/apache2/conf/httpd.conf

# Expose port 80 (standard HTTP port)
EXPOSE 80

# Start Apache in the foreground
# httpd-foreground runs Apache and keeps the container running
CMD ["httpd-foreground"]

# Use an official Node runtime as a parent image
FROM node:14-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app/

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Use an official NGINX runtime as a parent image
FROM nginx:alpine

# Copy the build output from the previous stage to the default NGINX public folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]

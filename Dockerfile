# Use the official Node.js runtime as the base image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -f

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build


# Use an official Nginx runtime as the base image
FROM nginx:latest

# Copy the build output from your local machine to the working directory in the container
COPY  dist/ /usr/share/nginx/html

# Configure Nginx to serve your React app
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that Nginx will listen on
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
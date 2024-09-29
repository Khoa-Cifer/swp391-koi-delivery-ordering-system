# Build stage
FROM node:22 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight server to serve the app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

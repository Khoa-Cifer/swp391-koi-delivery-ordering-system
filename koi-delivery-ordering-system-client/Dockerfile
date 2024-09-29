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

# Expose the port
EXPOSE 5173

# Start nginx server
CMD ["npm", "run", "dev"]

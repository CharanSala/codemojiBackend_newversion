# Use an official Node.js image as the base image
FROM node:18

# Update package list and install system packages including g++
RUN apt-get update && apt-get install -y build-essential g++ python3

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package.json package-lock.json ./

# Install node dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port that your app listens on (adjust if needed)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]

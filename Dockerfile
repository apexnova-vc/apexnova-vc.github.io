# First stage: Node.js base image for building/compiling the app
FROM node:21 as build-stage

# Set the working directory in the Node.js container
WORKDIR /com.docker.devenvironments.code

# Copy package.json and package-lock.json (if available) into the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your source code
COPY . .

# Second stage: Ubuntu base image for running the app
FROM --platform=linux/amd64 ubuntu:20.04

# Set the working directory in the Ubuntu container
WORKDIR /com.docker.devenvironments.code

# Copy the built app from the previous stage into this stage
COPY --from=build-stage /com.docker.devenvironments.code ./

# Install Node.js and any other Ubuntu packages you need
RUN apt-get update && apt-get install -y curl && \
  curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
  apt-get install -y nodejs

# Add metadata to the image to describe which repo this image belongs to
LABEL org.opencontainers.image.source="https://github.com/apexnova-vc/sample_web"

# Define the command to run the app
CMD ["npm", "run", "start"]

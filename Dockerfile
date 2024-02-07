# Use the official Ubuntu base image
FROM ubuntu:22.04

# Set the working directory in the container
WORKDIR /com.docker.devenvironments.code

# Install Node.js, and other necessary packages
RUN apt-get update && apt-get install -y curl gnupg software-properties-common git xsel wget xvfb fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst --no-install-recommends && \
    curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
    apt-get install -y nodejs && \
    # Clean up
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your source code into the container
COPY . .

# Install Puppeteer which will automatically download the appropriate version of Chromium
RUN npm i puppeteer

# Optionally, install serve to serve the application, if necessary
RUN npm install -g serve

# Add metadata to the image to describe which repo this image belongs to
LABEL org.opencontainers.image.source="https://github.com/apexnova-vc/web"

# Define the command to run your app (adjust as necessary)
CMD ["tail", "-f", "/dev/null"]
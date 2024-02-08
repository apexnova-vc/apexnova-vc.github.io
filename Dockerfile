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
FROM --platform=linux/amd64 ubuntu:latest

# Set the working directory in the Ubuntu container
WORKDIR /com.docker.devenvironments.code

# Copy the built app from the previous stage into this stage
COPY --from=build-stage /com.docker.devenvironments.code ./

# Install Node.js and any other Ubuntu packages you need
RUN apt-get update && apt-get install -y curl gnupg software-properties-common git xsel && \
  curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
  apt-get install -y nodejs

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Install Puppeteer and its browser dependencies
RUN npm i && npx puppeteer browsers install chrome

RUN npm install -g serve

# Add metadata to the image to describe which repo this image belongs to
LABEL org.opencontainers.image.source="https://github.com/apexnova-vc/web"

# Define the command to run the app
CMD ["tail", "-f", "/dev/null"]

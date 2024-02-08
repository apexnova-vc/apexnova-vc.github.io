# Use the latest official Ubuntu base image
FROM ubuntu:latest

# Set the working directory in the container
WORKDIR /com.docker.devenvironments.code

# Install Node.js, and other necessary packages including the additional libraries
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    software-properties-common \
    git \
    xsel \
    wget \
    xvfb \
    openssh-client \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    ttf-mscorefonts-installer \
    libnss3 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatomic1 \
    libcairo2 \
    libcups2 \
    libdouble-conversion3 \
    libevent-2.1-7 \
    libgbm1 \
    libjsoncpp25 \
    liblcms2-2 \
    libminizip1 \
    libopenjp2-7 \
    libwebp7 \
    libwebpdemux2 \
    libwebpmux3 \
    libwoff1 \
    libxcomposite1 \
    libxdamage1 \
    libxkbcommon0 \
    libopus0 \
    libpango-1.0-0 \
    libpulse0 \
    libsnappy1v5 \
    libgtk-3-0 \
    libxrandr2 \
    libxnvctrl0 \
    libxslt1.1 \
    --no-install-recommends && \
    curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
    apt-get install -y nodejs && \
    # Clean up
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set environment variable to prevent Puppeteer from downloading Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your source code into the container
COPY . .

# Install Puppeteer without downloading the default Chromium
RUN npm i puppeteer

# Optionally, install serve to serve the application, if necessary
RUN npm install -g serve

# Add metadata to the image to describe which project this image belongs to
LABEL org.opencontainers.image.source="https://github.com/apexnova-vc/web"

# Define the command to run your app (adjust as necessary)
CMD ["tail", "-f", "/dev/null"]

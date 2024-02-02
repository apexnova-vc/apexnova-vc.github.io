# TypeScript Web Template with GraphQL

This repository contains the source code for a web project template built using TypeScript and GraphQL. The project is designed to be used with Visual Studio Code for development and testing.

## Getting Started

Follow the instructions below to set up the project on your local machine for development and testing.

### Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm (Node Package Manager)](https://www.npmjs.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Repository Structure

The repository is organized into directories that contain the project source code, build scripts, resources, and configuration files. Here's a brief overview of the structure:

- `src/`: Contains the main application source code.
- `build/`: Contains build scripts and configuration files.
- `public/`: Contains static assets like HTML files.
- `node_modules/`: Contains project dependencies.
- `package.json`: Configuration file for npm packages and scripts.
- `tsconfig.json`: TypeScript configuration file.

## Building and Running

You can use npm commands to build, run, and test your web application efficiently. Here are some essential commands:

### Building the Application:

- `npm install`: Installs project dependencies.
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production-ready application.

### Running Tests:

- `npm run test`: Runs unit tests.
- `npm run test:e2e`: Runs end-to-end tests.

### Code Analysis:

- `npm run lint`: Lints your code for code quality.
- `npm run stylelint`: Lints your CSS/SCSS styles.

### Deployment:

- Should only be run in github action, not locally

## Running End-to-End Tests on Host Browser

To test using a host browser or visualize the test on the host browser, follow these steps:

1. Launch a Chrome browser instance on your host.

2. Ensure that the browser is configured to listen on a specific port using the `--remote-debugging-port` flag. For example:
google-chrome-stable --remote-debugging-port=53249

3. In your test code, use Puppeteer to connect to the existing browser instance on the host. Update the `beforeEach` section of your test as follows:

```javascript
beforeEach(async () => {
  browser = await puppeteer.connect({
    browserWSEndpoint:
      "ws://host.docker.internal:53249/devtools/browser/e7078bee-a204-4e98-9cc0-b3b63ba8404c",
  });
});
```

Now, when you run your end-to-end tests (npm run test:e2e), they will connect to the host browser instance and allow you to visualize the tests.

## License

This project is open-source and available under the MIT License. See the LICENSE file for details.

Acknowledgments
Special thanks to the creators of the Android project README template that inspired this README.
vbnet
Copy code

Click on the link above to download the README.md file.
import fs from "fs";
import path from "path";

import chalk from "chalk";
import ts from "typescript";

import paths from "./paths";

function getAdditionalModulePaths(options: { [key: string]: string } = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return "";
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  if (path.relative(paths.appNodeModules, baseUrlResolved) === "") {
    return null;
  }

  if (path.relative(paths.appSrc, baseUrlResolved) === "") {
    return [paths.appSrc];
  }

  if (path.relative(paths.appPath, baseUrlResolved) === "") {
    return null;
  }

  throw new Error(
    chalk.red.bold(
      "Your project's `baseUrl` can only be set to `src` or `node_modules`." +
        " Create React App does not support other values at this time.",
    ),
  );
}

function getWebpackAliases(options: { [key: string]: string } = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  if (path.relative(paths.appPath, baseUrlResolved) === "") {
    return {
      src: paths.appSrc,
    };
  }
}

function getJestAliases(options: { [key: string]: string } = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  if (path.relative(paths.appPath, baseUrlResolved) === "") {
    return {
      "^src/(.*)$": "<rootDir>/src/$1",
    };
  }
}

function getModules() {
  // Check if TypeScript is setup
  const hasTsConfig = fs.existsSync(paths.appTsConfig);
  const hasJsConfig = fs.existsSync(paths.appJsConfig);

  if (hasTsConfig && hasJsConfig) {
    throw new Error(
      "You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file.",
    );
  }

  let config: { [key: string]: string } = {};

  if (hasTsConfig) {
    config = ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config;
    // Otherwise we'll check if there is jsconfig.json
    // for non TS projects.
  } else if (hasJsConfig) {
    config = require(paths.appJsConfig);
  }

  config = config || {};
  const options = config.compilerOptions || {};

  return {
    additionalModulePaths: getAdditionalModulePaths(options),
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options),
    hasTsConfig,
  };
}

export default getModules();

import crypto from "crypto";
import fs from "fs";
import path from "path";

import chalk from "chalk";

import paths from "../paths.ts";

interface KeyAndCert {
  cert: Buffer;
  key: Buffer;
  keyFile: string;
  crtFile: string;
}

function validateKeyAndCerts({
  cert,
  key,
  keyFile,
  crtFile,
}: KeyAndCert): void {
  let encrypted: Buffer = Buffer.alloc(0);

  try {
    // publicEncrypt will throw an error with an invalid cert
    encrypted = crypto.publicEncrypt(cert, Buffer.from("test"));
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `The certificate "${chalk.yellow(crtFile)}" is invalid.\n${err.message}`,
      );
    }
  }

  try {
    crypto.privateDecrypt(key, encrypted);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `The certificate key "${chalk.yellow(keyFile)}" is invalid.\n${err.message}`,
      );
    }
  }
}

// Read file and throw an error if it doesn't exist
function readEnvFile(file: string, type: string): Buffer {
  if (!fs.existsSync(file)) {
    throw new Error(
      `You specified ${chalk.cyan(type)} in your env, but the file "${chalk.yellow(file)}" can't be found.`,
    );
  }
  return fs.readFileSync(file);
}

// Get the https config
// Return cert files if provided in env, otherwise just true or false
export default function getHttpsConfig(): KeyAndCert | boolean {
  const { SSL_CRT_FILE, SSL_KEY_FILE, HTTPS } = process.env;
  const isHttps = HTTPS === "true";

  if (isHttps && SSL_CRT_FILE && SSL_KEY_FILE) {
    const crtFile = path.resolve(paths.appPath, SSL_CRT_FILE);
    const keyFile = path.resolve(paths.appPath, SSL_KEY_FILE);
    const config: KeyAndCert = {
      cert: readEnvFile(crtFile, "SSL_CRT_FILE"),
      key: readEnvFile(keyFile, "SSL_KEY_FILE"),
      keyFile,
      crtFile,
    };

    validateKeyAndCerts(config);
    return config;
  }
  return isHttps;
}

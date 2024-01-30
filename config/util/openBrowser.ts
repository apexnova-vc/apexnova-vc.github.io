import { execSync } from "child_process";

import chalk from "chalk";
import spawn from "cross-spawn";
import open from "open";

// https://github.com/sindresorhus/open#app
const OSX_CHROME = "google chrome";

const Actions = Object.freeze({
  NONE: 0,
  BROWSER: 1,
  SCRIPT: 2,
});

function getBrowserEnv() {
  const value = process.env.BROWSER;
  const args = process.env.BROWSER_ARGS
    ? process.env.BROWSER_ARGS.split(" ")
    : [];
  let action;
  if (!value) {
    action = Actions.BROWSER;
  } else if (value.toLowerCase().endsWith(".js")) {
    action = Actions.SCRIPT;
  } else if (value.toLowerCase() === "none") {
    action = Actions.NONE;
  } else {
    action = Actions.BROWSER;
  }
  return { action, value, args };
}

function executeNodeScript(scriptPath: string, url: string) {
  const extraArgs = process.argv.slice(2);
  const child = spawn(process.execPath, [scriptPath, ...extraArgs, url], {
    stdio: "inherit",
  });
  child.on("close", (code) => {
    if (code !== 0) {
      console.log();
      console.log(
        chalk.red(
          "The script specified as BROWSER environment variable failed.",
        ),
      );
      console.log(chalk.cyan(scriptPath) + " exited with code " + code + ".");
      console.log();
    }
  });
  return true;
}

function startBrowserProcess(
  browser: string | undefined,
  url: string,
  args: string[],
) {
  const shouldTryOpenChromiumWithAppleScript =
    process.platform === "darwin" &&
    (typeof browser !== "string" || browser === OSX_CHROME);

  if (shouldTryOpenChromiumWithAppleScript) {
    const supportedChromiumBrowsers = [
      "Google Chrome Canary",
      "Google Chrome",
      "Microsoft Edge",
      "Brave Browser",
      "Vivaldi",
      "Chromium",
    ];

    for (const chromiumBrowser of supportedChromiumBrowsers) {
      try {
        execSync('ps cax | grep "' + chromiumBrowser + '"');
        execSync(
          'osascript openChrome.applescript "' +
            encodeURI(url) +
            '" "' +
            chromiumBrowser +
            '"',
          {
            cwd: __dirname,
            stdio: "ignore",
          },
        );
        return true;
      } catch (err) {
        // Ignore errors.
      }
    }
  }

  if (process.platform === "darwin" && browser === "open") {
    browser = undefined;
  }

  if (typeof browser === "string" && args.length > 0) {
    browser = [browser, ...args];
  }

  try {
    const options = { app: browser, wait: false, url: true };
    open(url, options).catch(() => {}); // Prevent `unhandledRejection` error.
    return true;
  } catch (err) {
    return false;
  }
}

function openBrowser(url: string) {
  const { action, value, args } = getBrowserEnv();
  switch (action) {
    case Actions.NONE:
      return false;
    case Actions.SCRIPT:
      return executeNodeScript(value, url);
    case Actions.BROWSER:
      return startBrowserProcess(value, url, args);
    default:
      throw new Error("Not implemented.");
  }
}

export default openBrowser;

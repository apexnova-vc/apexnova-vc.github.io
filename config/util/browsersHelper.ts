import fs from "fs";
import os from "os";

import browserslist from "browserslist";
import chalk from "chalk";
import pkgUp from "pkg-up";
import prompts from "prompts";

const defaultBrowsers = {
  production: [">0.2%", "not dead", "not op_mini all"],
  development: [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version",
  ],
};

async function shouldSetBrowsers(isInteractive: boolean): Promise<boolean> {
  if (!isInteractive) {
    return Promise.resolve(true);
  }

  const question = {
    type: "confirm",
    name: "shouldSetBrowsers",
    message:
      chalk.yellow("We're unable to detect target browsers.") +
      `\n\nWould you like to add the defaults to your ${chalk.bold(
        "package.json",
      )}?`,
    initial: true,
  };

  const answer = await prompts(question);
  return answer.shouldSetBrowsers;
}

async function checkBrowsers(
  dir: string,
  isInteractive: boolean,
  retry = true,
): Promise<any> {
  const current = browserslist.loadConfig({ path: dir });
  if (current != null) {
    return Promise.resolve(current);
  }

  if (!retry) {
    throw new Error(
      chalk.red("As of react-scripts >=2 you must specify targeted browsers.") +
        os.EOL +
        `Please add a ${chalk.underline(
          "browserslist",
        )} key to your ${chalk.bold("package.json")}.`,
    );
  }

  const shouldSet = await shouldSetBrowsers(isInteractive);
  if (!shouldSet) {
    return checkBrowsers(dir, isInteractive, false);
  }

  try {
    const filePath = await pkgUp({ cwd: dir });
    if (filePath == null) {
      throw new Error();
    }
    const pkg = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    pkg["browserslist"] = defaultBrowsers;
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + os.EOL);

    browserslist.clearCaches();
    console.log();
    console.log(
      `${chalk.green("Set target browsers:")} ${chalk.cyan(
        defaultBrowsers.join(", "),
      )}`,
    );
    console.log();
  } catch (error) {
    // Swallow any error
  }

  return checkBrowsers(dir, isInteractive, false);
}

export { defaultBrowsers, checkBrowsers };

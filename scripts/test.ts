import "../config/tests.cjs";

process.on("unhandledRejection", (err) => {
  throw err;
});

import "../config/env.cjs";

// Ensure environment variables are read.
import { execSync } from "child_process";

import { jest } from "jest";

let argv = process.argv.slice(2);

function isInGitRepository() {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    execSync("hg --cwd . root", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
}

// Watch unless on CI or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf("--watchAll") === -1 &&
  argv.indexOf("--watchAll=false") === -1
) {
  // https://github.com/facebook/create-react-app/issues/5210
  const hasSourceControl = isInGitRepository() || isInMercurialRepository();
  argv.push(hasSourceControl ? "--watch" : "--watchAll");
}

jest.run(argv);

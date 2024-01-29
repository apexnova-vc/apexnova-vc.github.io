import path from "path";

import escape from "escape-string-regexp";

export default function ignoredFiles(appSrc: string): RegExp {
  return new RegExp(
    `^(?!${escape(
      path.normalize(appSrc + "/").replace(/[\\]+/g, "/"),
    )}).+/node_modules/`,
    "g",
  );
}

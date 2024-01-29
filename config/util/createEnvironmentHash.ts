import { createHash } from "crypto";

import { Env } from "../env";

export default (env: Env) => {
  const hash = createHash("md5");
  hash.update(JSON.stringify(env));

  return hash.digest("hex");
};

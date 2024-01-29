import fs from "fs";

import evalSourceMapMiddleware from "react-dev-utils/evalSourceMapMiddleware";
import ignoredFiles from "react-dev-utils/ignoredFiles";
import noopServiceWorkerMiddleware from "react-dev-utils/noopServiceWorkerMiddleware";
import redirectServedPath from "react-dev-utils/redirectServedPathMiddleware";

import paths from "./paths";
import getHttpsConfig from "./util/getHttpsConfig";

const host = process.env.HOST || "0.0.0.0";
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

export default function (proxy, allowedHost) {
  const disableFirewall =
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true";

  return {
    allowedHosts: disableFirewall ? "all" : [allowedHost],
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
    compress: true,
    static: {
      directory: paths.appPublic,
      publicPath: [paths.publicUrlOrPath],
      watch: {
        ignored: ignoredFiles(paths.appSrc),
      },
    },
    client: {
      webSocketURL: {
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },
    https: getHttpsConfig(),
    host,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    proxy,
    onBeforeSetupMiddleware(devServer) {
      devServer.app.use(evalSourceMapMiddleware(devServer));

      if (fs.existsSync(paths.proxySetup)) {
        import(paths.proxySetup).then((proxySetup) => {
          proxySetup.default(devServer.app);
        });
      }
    },
    onAfterSetupMiddleware(devServer) {
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },
  };
}

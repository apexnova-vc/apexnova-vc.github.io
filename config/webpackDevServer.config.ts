import fs from "fs";

import { Application } from "express"; // Importing the type for Express application

import paths from "./paths";
import evalSourceMapMiddleware from "./util/evalSourceMapMiddleware";
import getHttpsConfig from "./util/getHttpsConfig";
import ignoredFiles from "./util/ignoredFiles";
import noopServiceWorkerMiddleware from "./util/noopServiceWorkerMiddleware";
import redirectServedPath from "./util/redirectServedPathMiddleware";

// Define interface for the proxy and allowedHost
interface ProxyConfig {
  [key: string]: string; // TODO
}

// Define types for the environment variables
const host: string = process.env.HOST || "0.0.0.0";
const sockHost: string | undefined = process.env.WDS_SOCKET_HOST;
const sockPath: string | undefined = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort: string | undefined = process.env.WDS_SOCKET_PORT;

export default function (proxy: ProxyConfig, allowedHost: string) {
  const disableFirewall: boolean =
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
    onBeforeSetupMiddleware(devServer: { app: Application }) {
      devServer.app.use(evalSourceMapMiddleware(devServer));

      if (fs.existsSync(paths.proxySetup)) {
        import(paths.proxySetup).then((proxySetup) => {
          if (proxySetup.default) {
            proxySetup.default(devServer.app);
          }
        });
      }
    },
    onAfterSetupMiddleware(devServer: { app: Application }) {
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },
  };
}

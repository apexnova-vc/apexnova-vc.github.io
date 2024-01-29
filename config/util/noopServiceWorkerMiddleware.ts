import path from "path";

// Define types for the request, response, and next function. Adjust as per the actual usage.
interface Request {
  url: string;
}

interface Response {
  setHeader: (name: string, value: string) => void;
  send: (body: string) => void;
}

type NextFunction = () => void;

const noopServiceWorkerContent = `
// This service worker file is effectively a 'no-op' that will reset any
// previous service worker registered for the same host:port combination.
// In the production build, this file is replaced with an actual service worker
// file that will precache your site's local assets.
// See https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});
`;

export default function createNoopServiceWorkerMiddleware(servedPath: string) {
  return function noopServiceWorkerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (req.url === path.posix.join(servedPath, "service-worker.js")) {
      res.setHeader("Content-Type", "text/javascript");
      res.send(noopServiceWorkerContent);
    } else {
      next();
    }
  };
}

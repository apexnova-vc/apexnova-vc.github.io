import path from "path";

// Define types for the request, response, and next function. Adjust as per the actual usage.
interface Request {
  url: string;
  path: string;
}

interface Response {
  redirect: (url: string) => void;
}

type NextFunction = () => void;

export default function createRedirectServedPathMiddleware(servedPath: string) {
  // remove end slash so user can land on `/test` instead of `/test/`
  servedPath = servedPath.slice(0, -1);
  return function redirectServedPathMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (
      servedPath === "" ||
      req.url === servedPath ||
      req.url.startsWith(servedPath)
    ) {
      next();
    } else {
      const newPath = path.posix.join(
        servedPath,
        req.path !== "/" ? req.path : "",
      );
      res.redirect(newPath);
    }
  };
}

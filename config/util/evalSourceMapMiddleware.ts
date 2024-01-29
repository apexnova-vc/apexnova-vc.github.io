/* eslint-disable @typescript-eslint/no-explicit-any*/
// TODO
import { Buffer } from "buffer";

import { Request, Response, NextFunction } from "express";

// Define the Source interface
interface Source {
  map: () => object;
  source: () => string;
}

// Define interface for the Server
type Server = { [key: string]: any };

// Function to encode a source map in base64
function base64SourceMap(source: Source): string {
  const base64 = Buffer.from(JSON.stringify(source.map()), "utf8").toString(
    "base64",
  );
  return `data:application/json;charset=utf-8;base64,${base64}`;
}

// Function to get the source by its ID
function getSourceById(server: Server, id: string): Source {
  const module: any = Array.from(server._stats.compilation.modules).find(
    (m: any) => server._stats.compilation.chunkGraph.getModuleId(m) == id,
  );
  return module.originalSource();
}

// Middleware for retrieving a generated source
export default function createEvalSourceMapMiddleware(server: Server) {
  return function handleWebpackInternalMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (req.url.startsWith("/__get-internal-source")) {
      const fileName = req.query.fileName as string;
      const idMatch = fileName.match(/webpack-internal:\/\/\/(.+)/);
      const id = idMatch ? idMatch[1] : null;
      if (!id || !server._stats) {
        next();
      } else {
        const source = getSourceById(server, id);
        const sourceMapURL = `//# sourceMappingURL=${base64SourceMap(source)}`;
        const sourceURL = `//# sourceURL=webpack-internal:///${id}`;
        res.end(`${source.source()}\n${sourceMapURL}\n${sourceURL}`);
      }
    } else {
      next();
    }
  };
}

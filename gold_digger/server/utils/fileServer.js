import fs from 'node:fs';
import path from 'node:path';
import { getMimeType } from './mimeTypes.js';

export function serveStaticFile(res, filePath, contentType, on404) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (on404) {
        on404();
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - File Not Found');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

export function serve404(res, publicDir) {
  const filePath = path.join(publicDir, '404.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Page Not Found');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

export function serveFileIfExists(res, filePath, on404) {
  const extname = path.extname(filePath);
  const contentType = getMimeType(extname);

  /*
    File access constants
    F_OK - determining if a file exists,,
  */
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      on404();
    } else {
      serveStaticFile(res, filePath, contentType, on404);
    }
  });
}

export default { serveStaticFile, serve404, serveFileIfExists };
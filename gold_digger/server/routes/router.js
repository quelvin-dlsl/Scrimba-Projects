
import path from 'node:path';
import { serveStaticFile, serve404, serveFileIfExists } from '../utils/fileServer.js';

class Router {
  constructor(publicDir, sseHandler, purchaseHandler) {
    this.publicDir = publicDir;
    this.sseHandler = sseHandler;
    this.purchaseHandler = purchaseHandler;
  }

  route(req, res, currentPrice) {
    const { method, url } = req;

    console.log(`${method} ${url}`);

    // GET requests
    if (method === 'GET') {
      this.handleGet(req, res, url, currentPrice);
    }
    // POST requests
    else if (method === 'POST') {
      this.handlePost(req, res, url, currentPrice);
    }
    // Unsupported methods
    else {
      this.sendMethodNotAllowed(res);
    }
  }

  handleGet(req, res, url, currentPrice) {
    // SSE endpoint for live prices
    if (url === '/api/prices') {
      this.sseHandler.handleConnection(req, res, currentPrice);
    }
    // Home page
    else if (url === '/' || url === '/index.html') {
      const filePath = path.join(this.publicDir, 'index.html');
      serveStaticFile(res, filePath, 'text/html', () => {
        serve404(res, this.publicDir);
      });
    }
    // Static files
    else {
      this.serveStatic(res, url);
    }
  }

  handlePost(req, res, url, currentPrice) {
    if (url === '/api/purchase') {
      this.purchaseHandler.handle(req, res, currentPrice);
    } else {
      this.sendNotFound(res);
    }
  }

  serveStatic(res, url) {
    const filePath = path.join(this.publicDir, url);

    serveFileIfExists(res, filePath, () => {
      serve404(res, this.publicDir);
    });
  }

  sendNotFound(res) {
    serve404(res, this.publicDir);
  }

  sendMethodNotAllowed(res) {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 - Method Not Allowed');
  }
}

export default Router;
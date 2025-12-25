import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import configuration
import config from './config/config.js';

// Import services
import { generateGoldPrice } from './services/priceGenerator.js';
import PurchaseLogger from './services/purchaseLogger.js';

// Import handlers
import SSEHandler from './handlers/sseHandler.js';
import PurchaseHandler from './handlers/purchaseHandler.js';

// Import router
import Router from './routes/router.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get public directory path
const publicDir = path.join(__dirname, config.paths.public);

// Initialize services
const purchaseLogger = new PurchaseLogger();
const sseHandler = new SSEHandler();
const purchaseHandler = new PurchaseHandler(purchaseLogger);

// Initialize router
const router = new Router(publicDir, sseHandler, purchaseHandler);

// Initialize current gold price
let currentGoldPrice = generateGoldPrice();

// Create HTTP server
const server = http.createServer((req, res) => {
  router.route(req, res, currentGoldPrice);
});

// Setup price update interval
function startPriceUpdates() {
  setInterval(() => {
    // Generate new price
    currentGoldPrice = generateGoldPrice(currentGoldPrice);

    // Broadcast to all SSE clients
    sseHandler.broadcast(currentGoldPrice);

    // Log price update
    console.log(`Price updated: £${currentGoldPrice}/oz | Clients: ${sseHandler.getClientCount()}`);
  }, config.prices.updateInterval);
}

// Start server
function startServer() {
  server.listen(config.server.port, () => {
    console.log('\n' + '='.repeat(60));
    console.log('GoldDigger Server Started');
    console.log('='.repeat(60));
    console.log(`Server running at: http://${config.server.host}:${config.server.port}`);
    console.log(`Initial gold price: £${currentGoldPrice}/oz`);
    console.log(`Price update interval: ${config.prices.updateInterval / 1000}s`);
    console.log('='.repeat(60) + '\n');

    // Start price updates
    startPriceUpdates();
  });
}

// Graceful shutdown handler
function setupGracefulShutdown() {
  process.on('SIGTERM', () => {
    console.log('\nSIGTERM received. Shutting down gracefully...');

    // Disconnect all SSE clients
    sseHandler.disconnectAll();

    // Close server
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('\nSIGINT received. Shutting down gracefully...');

    // Disconnect all SSE clients
    sseHandler.disconnectAll();

    // Close server
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Initialize application
setupGracefulShutdown();
startServer();

export const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: 'localhost'
  },

  // Price update configuration
  prices: {
    updateInterval: 3000, // 3 seconds
    basePrice: 1850,      // Base price in GBP
    minPrice: 1750,       // Minimum price
    maxPrice: 1950,       // Maximum price
    maxChangePercent: 0.5 // Maximum 0.5% change per update
  },

  // Paths configuration
  paths: {
    public: '../public',
    data: '../data',
    logFile: 'purchases.txt'
  },

  // SSE configuration
  sse: {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    }
  }
};

export default config;
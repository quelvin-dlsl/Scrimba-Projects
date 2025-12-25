// services/priceGenerator.js - Realistic gold price generation algorithm

import config from '../config/config.js';

const { basePrice, minPrice, maxPrice, maxChangePercent } = config.prices;

export function generateGoldPrice(previousPrice = null) {
  // If no previous price, start at base price with small random variation
  if (previousPrice === null) {
    const variation = (Math.random() - 0.5) * 100;
    return parseFloat((basePrice + variation).toFixed(2));
  }

  // Calculate maximum change amount
  const maxChange = previousPrice * (maxChangePercent / 100);

  // Generate random change (can be positive or negative)
  // Using a bias toward smaller changes for realism
  const randomFactor = Math.random();
  const changeMultiplier = Math.pow(randomFactor, 2) * (Math.random() > 0.5 ? 1 : -1);
  const priceChange = maxChange * changeMultiplier;

  // Calculate new price
  let newPrice = previousPrice + priceChange;

  // Ensure price stays within realistic bounds
  if (newPrice < minPrice) {
    newPrice = minPrice + Math.random() * 10;
  } else if (newPrice > maxPrice) {
    newPrice = maxPrice - Math.random() * 10;
  }

  // Add slight mean reversion (tendency to return to base price)
  const meanReversionStrength = 0.02;
  const distanceFromBase = newPrice - basePrice;
  newPrice -= distanceFromBase * meanReversionStrength;

  return parseFloat(newPrice.toFixed(2));
}

export function getPriceStats(currentPrice) {
  const percentFromBase = (((currentPrice - basePrice) / basePrice) * 100).toFixed(2);

  return {
    current: currentPrice,
    base: basePrice,
    deviation: percentFromBase,
    min: minPrice,
    max: maxPrice
  };
}

export default { generateGoldPrice, getPriceStats };
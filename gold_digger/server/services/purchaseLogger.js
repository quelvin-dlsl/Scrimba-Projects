
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../config/config.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PurchaseLogger extends EventEmitter {
  constructor() {
    super();

    // Setup paths from config
    this.dataDir = path.join(__dirname, config.paths.data);
    this.logFile = path.join(this.dataDir, config.paths.logFile);

    // Initialize log file
    this.initializeLogFile();

    // Listen to 'purchase' event
    this.on('purchase', (data) => {
      this.writeToLog(data);
    });

    console.log(`Purchase logger initialized`);
    console.log(`Log file: ${this.logFile}`);
  }

  initializeLogFile() {
    // Create data directory if it doesn't exist
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
      console.log(`Created data directory: ${this.dataDir}`);
    }

    // Create log file with header if it doesn't exist
    if (!fs.existsSync(this.logFile)) {
      const header = this.createLogHeader();
      fs.writeFileSync(this.logFile, header);
      console.log(`Created log file: ${this.logFile}`);
    }
  }

  createLogHeader() {
    return '=== GoldDigger Purchase Log ===\n' +
           'Format: [Timestamp] | Amount: £X.XX | Price/oz: £X.XX | Ounces: X.XXXX\n' +
           '='.repeat(80) + '\n\n';
  }

  logPurchase(purchaseData) {
    this.emit('purchase', purchaseData);
  }

  formatLogEntry(data) {
    const { amount, pricePerOunce, ounces, timestamp } = data;

    return `[${timestamp}] | Amount: £${amount.toFixed(2)} | ` +
           `Price/oz: £${pricePerOunce.toFixed(2)} | ` +
           `Ounces: ${ounces}\n`;
  }

  writeToLog(data) {
    const logEntry = this.formatLogEntry(data);

    // Append to file
    fs.appendFile(this.logFile, logEntry, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
        this.emit('error', err);
      } else {
        console.log(`Purchase logged: £${data.amount.toFixed(2)} → ${data.ounces} oz`);
        this.emit('logged', data);
      }
    });
  }

  async readLog() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.logFile, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  parsePurchaseLine(line) {
    const amountMatch = line.match(/Amount: £([\d.]+)/);
    const ouncesMatch = line.match(/Ounces: ([\d.]+)/);

    if (amountMatch && ouncesMatch) {
      return {
        amount: parseFloat(amountMatch[1]),
        ounces: parseFloat(ouncesMatch[1])
      };
    }

    return null;
  }

  async getStats() {
    try {
      const logData = await this.readLog();
      const lines = logData.split('\n').filter(line => line.startsWith('['));

      let totalAmount = 0;
      let totalOunces = 0;

      lines.forEach(line => {
        const purchase = this.parsePurchaseLine(line);
        if (purchase) {
          totalAmount += purchase.amount;
          totalOunces += purchase.ounces;
        }
      });

      return {
        totalPurchases: lines.length,
        totalAmountInvested: totalAmount.toFixed(2),
        totalOuncesPurchased: totalOunces.toFixed(4),
        averageInvestment: lines.length > 0 ? (totalAmount / lines.length).toFixed(2) : 0
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return null;
    }
  }
}

export default PurchaseLogger;
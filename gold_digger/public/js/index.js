// public/js/index.js - Client-side JavaScript for GoldDigger

// DOM Elements
const priceDisplay = document.getElementById('price-display');
const connectionStatus = document.getElementById('connection-status');
const investmentForm = document.querySelector('form');
const investmentInput = document.getElementById('investment-amount');
const dialog = document.querySelector('dialog');
const dialogSummary = document.getElementById('investment-summary');
const dialogButton = dialog.querySelector('button');

// Current gold price
let currentPrice = null;

// Store event source globally to prevent multiple connections
let priceEventSource = null;

// Initialize Server-Sent Events for live price updates
function initializePriceStream() {
  // Close existing connection if any
  if (priceEventSource) {
    priceEventSource.close();
  }

  priceEventSource = new EventSource('/api/prices');

  priceEventSource.onopen = () => {
    console.log('✅ Connected to price stream');
    updateConnectionStatus(true);
  };

  priceEventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      currentPrice = data.price;
      updatePriceDisplay(currentPrice);
    } catch (error) {
      console.error('Error parsing price data:', error);
    }
  };

  priceEventSource.onerror = (error) => {
    console.error('❌ Price stream error:', error);
    updateConnectionStatus(false);

    // Don't auto-reconnect immediately to prevent multiple connections
    // The browser will automatically try to reconnect
  };

  return priceEventSource;
}

// Update price display
function updatePriceDisplay(price) {
  priceDisplay.textContent = price.toFixed(2);

  // Add a subtle animation on price change
  priceDisplay.style.transform = 'scale(1.05)';
  setTimeout(() => {
    priceDisplay.style.transform = 'scale(1)';
  }, 200);
}

// Update connection status indicator
function updateConnectionStatus(isConnected) {
  if (isConnected) {
    connectionStatus.textContent = 'Live Price 🟢';
    connectionStatus.style.color = 'var(--gold)';
  } else {
    connectionStatus.textContent = 'Disconnected 🔴';
    connectionStatus.style.color = '#ff6b6b';
  }
}

// Handle form submission
investmentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const amount = parseFloat(investmentInput.value);

  // Validation
  if (!amount || amount <= 0 || isNaN(amount)) {
    alert('Please enter a valid investment amount');
    return;
  }

  if (!currentPrice) {
    alert('Waiting for price data. Please try again in a moment.');
    return;
  }

  // Disable button during purchase
  const investBtn = document.getElementById('invest-btn');
  investBtn.disabled = true;
  investBtn.textContent = 'Processing...';

  console.log('💳 Sending purchase request:', { amount });

  try {
    // Send purchase request to server
    const response = await fetch('/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Purchase result:', result);

    if (result.success) {
      // Show success dialog
      showPurchaseDialog(result.ounces, amount);

      // Reset form
      investmentInput.value = '';
    } else {
      alert(`Purchase failed: ${result.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('❌ Purchase error:', error);
    alert(`An error occurred: ${error.message}. Please try again.`);
  } finally {
    // Re-enable button
    investBtn.disabled = false;
    investBtn.textContent = 'Invest Now!';
  }
});

// Show purchase dialog with summary
function showPurchaseDialog(ounces, amount) {
  dialogSummary.textContent =
    `You just bought ${ounces} ounces (ozt) for £${amount.toFixed(2)}.\nYou will receive documentation shortly.`;

  dialog.showModal();
}

// Close dialog on button click
dialogButton.addEventListener('click', () => {
  dialog.close();
});

// Close dialog on backdrop click
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});

// Add smooth transition to price display
priceDisplay.style.transition = 'transform 0.2s ease';

// Initialize price stream on page load
console.log('🪙 GoldDigger client initialized');
initializePriceStream();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (priceEventSource) {
    priceEventSource.close();
  }
});
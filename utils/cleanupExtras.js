// utils/cleanupExtras.js

export function limpiarClicksYCarrito() {
  if (typeof window === 'undefined') return { clicks: 0, cart: 0 };

  const keys = Object.keys(localStorage);
  let clicks = 0;
  let cart = 0;

  keys.forEach(key => {
    if (key.startsWith('clicks-')) {
      localStorage.removeItem(key);
      clicks++;
    }
    if (key.startsWith('cart-')) {
      localStorage.removeItem(key);
      cart++;
    }
  });

  return { clicks, cart };
}

export function limpiarCarritoHuerfano() {
  if (typeof window === 'undefined') return 0;
  const keys = Object.keys(localStorage);
  let count = 0;
  keys.forEach(k => {
    if (k.startsWith('cart-')) {
      const item = localStorage.getItem(k);
      try {
        const parsed = JSON.parse(item);
        if (!parsed?.product) {
          localStorage.removeItem(k);
          count++;
        }
      } catch {
        localStorage.removeItem(k);
        count++;
      }
    }
  });
  return count;
}

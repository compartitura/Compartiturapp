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

// utils/cleanupFavorites.js

export function limpiarFavoritosSinProducto() {
  if (typeof window === 'undefined') return 0;

  const keys = Object.keys(localStorage);
  let limpiados = 0;

  keys.forEach(key => {
    if (key.startsWith('favorite-')) {
      const id = key.replace('favorite-', '');
      if (!localStorage.getItem(`product-${id}`)) {
        localStorage.removeItem(key);
        limpiados++;
      }
    }
  });

  return limpiados;
}

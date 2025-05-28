// utils/autoCleanup.js
import { limpiarFavoritosSinProducto } from './cleanupFavorites';
import { limpiarCarritoHuerfano } from './cleanupExtras';

export function autoLimpiarDatosLocalStorage() {
  if (typeof window === 'undefined') return;

  limpiarFavoritosSinProducto();
  limpiarCarritoHuerfano();
}

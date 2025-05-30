// pages/favorites.js
import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Link from 'next/link';
import { limpiarFavoritosSinProducto } from '../utils/cleanupFavorites';

function getFavoritosDesdeLocalStorage() {
  const usados = [];
  const nuevos = [];

  Object.keys(localStorage).forEach(k => {
    if (!k.startsWith('favorite-')) return;
    try {
      const id = k.replace('favorite-', '');
      const product = JSON.parse(localStorage.getItem(`product-${id}`));
      if (product) {
        if (product?.id?.startsWith('u')) usados.push(product);
        else nuevos.push(product);
      }
    } catch {}
  });

  return {
    usados: usados.sort((a, b) => {
      const ida = parseInt(a.id?.replace(/\D/g, '') || 0);
      const idb = parseInt(b.id?.replace(/\D/g, '') || 0);
      return idb - ida;
    }),
    nuevos,
  };
}

export default function FavoritesPage() {
  const [usados, setUsados] = useState([]);
  const [nuevos, setNuevos] = useState([]);

  useEffect(() => {
    const { usados, nuevos } = getFavoritosDesdeLocalStorage();
    setUsados(usados);
    setNuevos(nuevos);
  }, []);

  return (
    <main className="bg-white min-h-screen pt-[150px] px-4 max-w-4xl mx-auto relative">
      <Link href="/" className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black z-50">
        &times;
      </Link>

      <h1 className="text-2xl font-semibold mb-6 text-center">❤️ Mi lista de deseos</h1>
      <h3 className="text-l mb-6 text-center">Aquí tienes todos tus deseos guardados para cuando quieras comprarlos tenerlo bien a mano.</h3>

      <div className="text-right mb-4">
        <button
          onClick={() => {
            const count = limpiarFavoritosSinProducto();
            alert(`${count} favoritos sin producto fueron eliminados.`);
            location.reload();
          }}
          className="text-xs bg-gray-100 border border-gray-300 px-3 py-1 rounded hover:bg-gray-200"
        >
          Limpiar favoritos huérfanos
        </button>
      </div>

      {usados.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-green-700 mb-4">🎸 Usados</h2>
          <div className="flex flex-col gap-4">
            {usados.map(product => (
              <Card key={`u-${product.id || product.ArticleNumber}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {nuevos.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">🆕 Nuevos</h2>
          <div className="flex flex-col gap-4">
            {nuevos.map(product => (
              <Card key={`n-${product.ArticleNumber || product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {usados.length === 0 && nuevos.length === 0 && (
        <p className="text-center text-gray-500">No tienes productos guardados todavía.</p>
      )}
    </main>
  );
}
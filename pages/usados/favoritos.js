// pages/usados/favoritos.js
import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';

export default function FavoritosUsados() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const usados = keys.filter(k => k.startsWith('favorite-'))
      .map(k => {
        try {
          const fav = JSON.parse(localStorage.getItem(k));
          if (fav.favorite === true && fav.product?.id?.startsWith('u')) return fav.product;
        } catch {}
        return null;
      })
      .filter(Boolean);
    setFavoritos(usados);
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-4 pt-28">
      <h1 className="text-2xl font-bold mb-6 text-center">Favoritos - Usados</h1>
      {favoritos.length > 0 ? (
        <div className="flex flex-col gap-4">
          {favoritos.map(product => (
            <Card key={product.ArticleNumber || product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500">No tienes productos usados en favoritos aún.</p>
      )}
    </main>
  );
}

import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = [];
    for (let key in localStorage) {
      if (key.startsWith('favorite-')) {
        try {
          const product = JSON.parse(localStorage.getItem(`product-${key.replace('favorite-', '')}`));
          if (product) favs.push(product);
        } catch (e) {}
      }
    }
    setFavorites(favs);
  }, []);

  return (
    <main className="bg-white min-h-screen pt-28 px-4 max-w-4xl mx-auto relative">
      <Link href="/" className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black z-50">
        &times;
      </Link>

      <h1 className="text-2xl font-semibold mb-6 text-center">❤️ Mis favoritos</h1>

      {favorites.length > 0 ? (
        <div className="flex flex-col gap-4">
          {favorites.map(p => (
            <Card key={p.ArticleNumber} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tenés productos guardados todavía.</p>
      )}
    </main>
  );
}

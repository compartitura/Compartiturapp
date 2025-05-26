import Link from 'next/link';
import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = [];
    for (let key in localStorage) {
      if (key.startsWith('favorite-')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data.favorite && data.count >= 0) {
            const productData = JSON.parse(localStorage.getItem(`product-${key.replace('favorite-', '')}`));
            if (productData) favs.push(productData);
          }
        } catch (e) {
          // ignora corruptos
        }
      }
    }
    setFavorites(favs);
  }, []);

  return (
<main className="bg-white min-h-screen pt-60 px-4 max-w-4xl mx-auto">
      <Link href="/" className="absolute top-8 right-5 text-2xl text-gray-400 hover:text-black z-50">
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
        <p className="text-center text-gray-500">Todavía no tienes productos guardados como favoritos.</p>
      )}
    </main>
  );
}

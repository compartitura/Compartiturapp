import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const FALLBACK = '/logo-compartitura3.png';

export default function Card({ product, query = '' }) {
  const { Brand, Model, ImageURL, Description, affiliateURL, ArticleNumber } = product;
  const title = `${Brand} ${Model}`;
  const snippet = Description?.length > 60 ? Description.slice(0, 60) + '…' : Description;

  const [src, setSrc] = useState(ImageURL || FALLBACK);
  const [favorite, setFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const favData = JSON.parse(localStorage.getItem(`favorite-${ArticleNumber}`));
    if (favData) {
      setFavorite(favData.favorite);
      setFavoriteCount(favData.count);
    } else {
      const initialCount = Math.floor(Math.random() * 100);
      setFavoriteCount(initialCount);
      localStorage.setItem(`favorite-${ArticleNumber}`, JSON.stringify({ favorite: false, count: initialCount }));
    }
  }, [ArticleNumber]);

  const toggleFavorite = () => {
    setFavorite(prev => {
      const updated = !prev;
      const count = updated ? favoriteCount + 1 : favoriteCount - 1;
      setFavoriteCount(count);
      localStorage.setItem(`favorite-${ArticleNumber}`, JSON.stringify({ favorite: updated, count }));
      if (updated) {
        localStorage.setItem(`product-${ArticleNumber}`, JSON.stringify(product));
      } else {
        localStorage.removeItem(`product-${ArticleNumber}`);
      }
      return updated;
    });
  };

  const highlight = (text) => {
    if (!query || query.length < 2) return text;
    const regex = new RegExp(`(${query})`, 'ig');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-200">{part}</mark> : part
    );
  };

  return (
    <Link href={`/products/${ArticleNumber}`}>
      <div className="w-full flex items-start gap-4 bg-white rounded-lg p-4 shadow transition-transform hover:-translate-y-1 relative cursor-pointer">
        <img
          src={src}
          alt={Model}
          width={70}
          height={70}
          className="w-[70px] h-[70px] object-contain flex-shrink-0 bg-white rounded"
          onError={e => (e.currentTarget.src = FALLBACK)}
        />

        <div className="flex flex-col flex-grow text-sm">
          <div className="flex justify-between items-start">
            <h2 className="font-semibold text-base text-gray-800">
              {highlight(title)}
            </h2>
            <button onClick={(e) => { e.preventDefault(); toggleFavorite(); }} className="ml-2">
              <svg className={`w-5 h-5 ${favorite ? 'text-red-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                C13.09 3.81 14.76 3 16.5 3
                19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          {snippet && (
            <p className="text-gray-600 mt-1">{highlight(snippet)}</p>
          )}

          <div className="mt-2 flex justify-end">
            <span className="text-xs text-red-500">❤️ {favoriteCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

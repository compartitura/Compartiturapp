// components/ui/Card.jsx
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const FALLBACK = '/logo-compartitura3.png';

export default function Card({ product }) {
  const { Brand, Model, ImageURL, Description, affiliateURL, ArticleNumber } = product;
  const title = `${Brand} ${Model}`;
  const snippet =
    Description?.length > 60 ? Description.slice(0, 60) + '…' : Description;

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
      return updated;
    });
  };

  return (
    <div className="w-full flex items-start gap-4 bg-white rounded-lg p-4 shadow transition-transform hover:-translate-y-1 relative">
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
          <h2 className="font-semibold text-base text-gray-800">{title}</h2>
          <button onClick={toggleFavorite} className="ml-2">
            <svg className={`w-5 h-5 ${favorite ? 'text-red-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3
              19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        {snippet && <p className="text-gray-600 mt-1">{snippet}</p>}

        <div className="mt-2 flex justify-between items-center">
          <Link href={affiliateURL} legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium text-sm"
            >
              Más información →
            </a>
          </Link>
          <div className="text-xs text-red-500 flex items-center">
            ❤️ {favoriteCount}
          </div>
        </div>
      </div>
    </div>
  );
}

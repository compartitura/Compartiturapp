// components/ui/Header.jsx
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { translateCategory } from '../../utils/translations';

export default function Header({ onSearchClick }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        const count = Array.isArray(data) ? data.length : Array.isArray(data.default) ? data.default.length : 0;
        setTotalCount(count);

        const cats = Array.from(
          new Set(
            data.map(p => (p.CategoryTree || '').split('>')[0].trim()).filter(Boolean)
          )
        ).sort();
        setCategories(cats);
      })
      .catch(console.error);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow">
      {/* Top header */}
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center h-20">
        <div className="text-lg font-bold text-black">Compartitura</div>
<Link
  href="/search"
  className="cursor-pointer bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-500 hover:shadow-inner"
>
  Buscar 🔍︎
</Link>

      </div>

      {/* Horizontal category bar */}
      <div className="w-full overflow-x-auto bg-gray-50 border-t border-b border-gray-200">
        <div className="flex gap-3 px-4 py-2 min-w-max">
          {categories.map(cat => (
            <Link
              key={cat}
              href={{ pathname: `/categories/${encodeURIComponent(cat)}`, query: { page: 1 } }}
              className="flex-shrink-0 bg-white border border-gray-300 text-sm px-3 py-1 rounded-md hover:bg-primary hover:text-white transition whitespace-nowrap"
            >
              {translateCategory(cat)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

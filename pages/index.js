// pages/index.js
import fs from 'fs';
import path from 'path';
import { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../components/ui/Card';

export async function getStaticProps() {
  const all = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'versions', 'products.json'), 'utf-8')

  );

  const firstLevels = Array.from(
    new Set(
      all
        .map(p => (p.CategoryTree || '').split('>')[0].trim())
        .filter(Boolean)
    )
  ).sort();

  const FAVORITE_CATEGORIES = [
    'Guitarras',
    'Teclados',
    'Instrumentos de Viento'
  ];
  const sortedCategories = [
    ...FAVORITE_CATEGORIES.filter(cat => firstLevels.includes(cat)),
    ...firstLevels.filter(cat => !FAVORITE_CATEGORIES.includes(cat))
  ];

  const page = parseInt(query.page || '1', 10);
  const perPage = 20;
  const totalPages = Math.ceil(all.length / perPage);
  const slice = all.slice(
    (page - 1) * perPage,
    (page - 1) * perPage + perPage

  );

  return {
    props: { allProducts: all },
  };
}

export default function Inicio({ allProducts }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef();

  const loadMore = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleCount(prev => prev + 20);
          setIsLoadingMore(false);
        }, 400);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <main className="bg-white w-full mx-auto p-4 pt-28 max-w-5xl">
      <div className="flex flex-col gap-6">
        {allProducts.slice(0, visibleCount).map(product => (
          <Card key={product.ArticleNumber} product={product} />
        ))}

        {visibleCount < allProducts.length && (
          <>
            <div ref={loadMore} className="h-10" />
            {isLoadingMore && (
              <p className="text-sm text-gray-500 text-center animate-pulse">
                Cargando más...
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

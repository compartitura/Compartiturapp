// pages/index.js

import { useState, useRef, useCallback, useEffect } from 'react';
import Card from '../components/ui/Card';

export async function getServerSideProps({ req }) {
  const baseUrl = req.headers.host?.startsWith('localhost')
    ? 'http://localhost:3000'
    : 'https://' + req.headers.host;

  const res = await fetch(`${baseUrl}/data/versions/products.json`);
  const all = (await res.json()).slice(0, 1000); // Limita a los primeros 1000 productos

  return {
    props: { allProducts: all },
  };
}

export default function Inicio({ allProducts }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' o 'grid'
  const observer = useRef();

  useEffect(() => {
    const saved = localStorage.getItem('viewMode');
    if (saved) setViewMode(saved);
  }, []);

  const toggleView = () => {
    const next = viewMode === 'list' ? 'grid' : 'list';
    setViewMode(next);
    localStorage.setItem('viewMode', next);
  };

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
<div className="flex justify-end mb-4">
  <button
    onClick={toggleView}
    className="text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-200"
  >
    {viewMode === 'list' ? '☰☰' : '☰'}
  </button>
</div>
      <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-6'}>
        {allProducts.slice(0, visibleCount).map(product => (
          <Card key={product.ArticleNumber} product={product} view={viewMode} />
        ))}
      </div>

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
    </main>
  );
}

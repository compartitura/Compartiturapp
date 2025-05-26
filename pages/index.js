// pages/index.js
import fs from 'fs';
import path from 'path';
import { useState, useRef, useCallback } from 'react';
import Card from '../components/ui/Card';

export async function getStaticProps() {
  const all = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'versions', 'products.json'), 'utf-8')
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

import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import Card from '../../components/ui/Card';
import { useState, useEffect, useRef, useCallback } from 'react';

export async function getServerSideProps({ params }) {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/versions/products.json'), 'utf-8')
  );

  return {
    props: {
      allProducts: data,
    },
  };
}

export default function CategoryPage({ allProducts }) {
  const router = useRouter();
  const { slug = [], page = 1 } = router.query;
  const currentCategory = decodeURIComponent(slug[0] || '');
  const currentSub = decodeURIComponent(slug[1] || '');
  const currentSubsub = decodeURIComponent(slug[2] || '');

  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef();

  const [viewMode, setViewMode] = useState('list');

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

  const filtered = allProducts.filter(p => {
    const tree = (p.CategoryTree || '').split('>').map(s => s.trim());
    return (
      tree[0] === currentCategory &&
      (!currentSub || tree[1] === currentSub) &&
      (!currentSubsub || tree[2] === currentSubsub)
    );
  });

  return (
    <main className="bg-white w-full mx-auto p-4 pt-[120px] max-w-5xl">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleView}
          className="text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-200"
        >
          {viewMode === 'list' ? '☰☰' : '☰'}
        </button>
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-6'}>
        {filtered.slice(0, visibleCount).map(product => (
          <Card key={product.ArticleNumber} product={product} view={viewMode} />
        ))}
      </div>

      {visibleCount < filtered.length && (
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

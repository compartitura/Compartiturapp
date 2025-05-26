import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import Card from '../../components/ui/Card';
import { translateCategory } from '../../utils/translations';

export async function getServerSideProps({ params }) {
  const all = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/versions/products.json'), 'utf-8')
  );

  const slugArr = params.slug || [];
  const prefix = slugArr.join(' > ').toLowerCase();

  const inCategory = all.filter(p =>
    (p.CategoryTree || '').toLowerCase().startsWith(prefix)
  );

  const subs = Array.from(
    new Set(
      inCategory
        .map(p => {
          const levels = (p.CategoryTree || '').split('>').map(s => s.trim());
          return levels[slugArr.length];
        })
        .filter(Boolean)
    )
  ).sort();

  const subItems = subs.map(sub => {
    const prod = inCategory.find(p => {
      const levels = (p.CategoryTree || '').split('>').map(s => s.trim());
      return levels[slugArr.length] === sub;
    });
    return {
      name: sub,
      slug: encodeURIComponent(sub),
      imageURL: prod?.ImageURL || '/logo-compartitura3.png'
    };
  });

  const filtered = inCategory;

  return {
    props: {
      slug: slugArr,
      subItems,
      filtered,
    },
  };
}

export default function Categoria({ slug, subItems, filtered }) {
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
    <div className="bg-white w-full mx-auto p-6 pt-28">
      <nav className="text-sm mb-4">
        <Link href="/" legacyBehavior>
          <a className={slug.length === 0 ? 'font-semibold text-primary' : 'hover:underline'}>
            {translateCategory('Inicio')}
          </a>
        </Link>
        {slug.map((parte, i) => {
          const rutaSlug = slug.slice(0, i + 1).map(encodeURIComponent).join('/');
          return (
            <span key={i}>
              {' › '}
              <Link href={`/categories/${rutaSlug}`} legacyBehavior>
                <a className={i === slug.length - 1 ? 'font-semibold text-primary' : 'hover:underline'}>
                  {translateCategory(parte)}
                </a>
              </Link>
            </span>
          );
        })}
      </nav>

      {subItems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {subItems.map(item => (
            <Link key={item.name} href={`/categories/${[...slug, item.slug].join('/')}`} legacyBehavior>
              <a className="flex items-center gap-4 bg-white p-4 rounded-lg shadow hover:-translate-y-1 transition-transform">
                <img
                  src={item.imageURL || '/logo-compartitura3.png'}
                  alt={item.name}
                  className="w-[70px] h-[70px] object-contain bg-white rounded"
                  onError={e => e.currentTarget.src = '/logo-compartitura3.png'}
                />
                <span className="text-base font-semibold text-gray-800">{translateCategory(item.name)}</span>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filtered.slice(0, visibleCount).map(product => (
            <Card key={product.ArticleNumber} product={product} />
          ))}

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
        </div>
      )}
    </div>
  );
}

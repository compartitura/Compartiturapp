import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useEffect, useState, useRef, useCallback } from 'react';
import Card from '../../components/ui/Card';
import { translateCategory } from '../../utils/translations';

export async function getServerSideProps({ params, query }) {
  const all = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'versions', 'products.json'), 'utf-8')
  );

  const slugArr = (params.slug || []).map(decodeURIComponent);
  const prefix = slugArr.join(' > ').toLowerCase().trim();
  const brandFilter = query.brand?.toLowerCase() || null;

  let inCategory = all.filter(p => {
    const cat = (p.CategoryTree || '').toLowerCase().trim();
    return cat === prefix;
  });

  if (brandFilter) {
    inCategory = inCategory.filter(p => p.Brand?.toLowerCase() === brandFilter);
  }

  const subs = Array.from(
    new Set(
      all
        .filter(p => (p.CategoryTree || '').toLowerCase().trim().startsWith(prefix + ' >'))
        .map(p => {
          const levels = (p.CategoryTree || '').split('>').map(s => s.trim());
          return levels[slugArr.length];
        })
        .filter(Boolean)
    )
  ).sort();

  const FAVORITE_SUBCATEGORIES = [
    'Saxofones', 'Trompetas', 'Clarinetes', 'Fliscornos', 'Trompas',
    'Trombones', 'Trompas tenor', 'Barítonos', 'Trompa alto/barítono',
    'Bombardinos', 'Tubas', 'Oboes', 'Fagots', 'Flautas traveseras', 'Flautas de pico'
  ];

  const sortedSubs = [
    ...FAVORITE_SUBCATEGORIES.filter(s => subs.includes(s)),
    ...subs.filter(s => !FAVORITE_SUBCATEGORIES.includes(s))
  ];

  const subItems = sortedSubs.map(sub => {
    const prod = all.find(p => {
      const levels = (p.CategoryTree || '').split('>').map(s => s.trim());
      return (
        levels[slugArr.length] === sub &&
        (p.CategoryTree || '').toLowerCase().trim().startsWith(prefix + ' >')
      );
    });
    return {
      name: sub,
      slug: encodeURIComponent(sub),
      imageURL: prod?.ImageURL || '/logo-compartitura3.png'
    };
  });

  return {
    props: {
      slug: slugArr,
      subItems,
      products: inCategory,
      brandFilter
    },
  };
}

export default function Categoria({ slug, subItems, products, brandFilter }) {
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
    <div className="bg-white w-full mx-auto p-6 pt-[120px]">
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

      {brandFilter && (
        <p className="text-sm mb-4">
          Filtrando por marca: <span className="font-semibold">{brandFilter}</span>
        </p>
      )}

      {subItems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {subItems.map(item => (
            <Link key={item.name} href={`/categories/${[...slug, item.slug].join('/')}`} legacyBehavior>
              <a className="flex items-center gap-4 bg-white p-4 rounded-lg shadow hover:-translate-y-1 transition-transform">
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-[70px] h-[70px] object-contain bg-white rounded"
                  onError={e => (e.currentTarget.src = '/logo-compartitura3.png')}
                />
                <span className="text-base font-semibold text-gray-800">{translateCategory(item.name)}</span>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {products.slice(0, visibleCount).map(product => (
            <Card key={product.ArticleNumber} product={product} />
          ))}

          {visibleCount < products.length && (
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

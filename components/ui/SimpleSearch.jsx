import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from './Card';
import { translateCategory } from '../../utils/translations';
import keywordAliases from '../../utils/keyword-aliases';

export default function SimpleSearch() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef();

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  const expandQueryWithAliases = (q) => {
    const base = q.toLowerCase().trim();
    const singular = base.endsWith('s') && base.length > 3 ? base.slice(0, -1) : base;

    const aliasOriginal = keywordAliases[base] || [];
    const aliasSingular = keywordAliases[singular] || [];

    return Array.from(new Set([base, singular, ...aliasOriginal, ...aliasSingular]));
  };

  useEffect(() => {
    const raw = query.toLowerCase().trim();
    if (raw.length < 2) {
      setFiltered([]);
      setVisibleCount(20);
      return;
    }

    const queryVariants = expandQueryWithAliases(raw);

    const results = products
      .filter(p => {
        const texto = `${p.Brand} ${p.Model} ${p.CategoryTree || ''}`;
        const categoria = (p.CategoryTree || '').split('>').pop().trim();
        const traducido = translateCategory(categoria);
        const searchable = `${texto} ${traducido}`.toLowerCase();

        return queryVariants.some(q => searchable.includes(q));
      })
      .slice(0, 1000);

    setFiltered(results);
    setVisibleCount(20);
  }, [query, products]);

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
    <div className="p-4 pt-36 max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar por marca, modelo o categoría..."
        className="w-full px-4 py-2 border rounded text-sm mb-4"
        autoFocus
      />

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filtered.slice(0, visibleCount).map(p => (
            <Card key={p.ArticleNumber} product={p} query={query} />
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
      ) : query.length >= 2 ? (
        <p className="text-sm text-gray-500 text-center">No se encontraron resultados.</p>
      ) : null}
    </div>
  );
}

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { translateCategory } from '../../utils/translations';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryTree, setCategoryTree] = useState({});
  const [expanded, setExpanded] = useState({});
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Armar árbol de categorías
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        const tree = {};
        data.forEach(p => {
          const levels = (p.CategoryTree || '').split('>').map(s => s.trim());
          if (!levels[0]) return;
          if (!tree[levels[0]]) tree[levels[0]] = {};
          if (levels[1]) {
            if (!tree[levels[0]][levels[1]]) tree[levels[0]][levels[1]] = new Set();
            if (levels[2]) tree[levels[0]][levels[1]].add(levels[2]);
          }
        });
        // Convertir Sets a arrays
        const cleaned = {};
        Object.entries(tree).forEach(([cat, subs]) => {
          cleaned[cat] = {};
          Object.entries(subs).forEach(([sub, subsubs]) => {
            cleaned[cat][sub] = Array.from(subsubs).sort();
          });
        });
        setCategoryTree(cleaned);
      });
  }, []);

  // Auto-hide del header superior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowHeader(false);
      else setShowHeader(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggle = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      {/* Header superior: ocultable */}
      <div className={`transition-all duration-300 ${showHeader ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" legacyBehavior>
            <a>
              <Image
                src="https://www.compartitura.org/medias/images/captura3.5dc51b958b6c69.11833439-0x80-1-.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </a>
          </Link>

          {/* Título */}
          <div className="text-sm font-semibold text-gray-700 text-center flex-grow">
            Instrumentos y accesorios nuevos
          </div>

          {/* ❤️ Favoritos */}
          <Link href="/favorites" legacyBehavior>
            <a title="Mis favoritos" className="ml-4">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3
                  19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </a>
          </Link>
        </div>
      </div>

      {/* Segunda fila: hamburguesa + buscador */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-b">
        <button onClick={() => setMenuOpen(true)}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2}
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link
          href="/search"
          className="cursor-pointer bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-500 hover:shadow-inner"
        >
          Buscar 🔍︎
        </Link>
      </div>

      {/* Menú lateral desplegable */}
{menuOpen && (
  <div className="fixed top-0 left-0 w-4/5 h-screen bg-white shadow-xl z-50 overflow-y-auto p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Categorías</h2>
      <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-black text-2xl">&times;</button>
    </div>

    {Object.entries(categoryTree).map(([cat, subs]) => (
      <div key={cat} className="mb-3">
        <button
          onClick={() => toggle(cat)}
          className="w-full text-left text-sm font-semibold text-gray-800 hover:underline"
        >
          {expanded[cat] ? '▼' : '▶'} {translateCategory(cat)}
        </button>

        {expanded[cat] && (
          <div className="ml-4 mt-1 flex flex-col gap-1">
            {Object.keys(subs).map(sub => (
              <Link
                key={sub}
                href={`/categories/${encodeURIComponent(cat)}/${encodeURIComponent(sub)}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-600 hover:text-black"
              >
                {translateCategory(sub)}
              </Link>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)}


    </header>
  );
}

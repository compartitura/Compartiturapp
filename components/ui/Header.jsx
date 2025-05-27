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
  const [wishlistCount, setWishlistCount] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowHeader(false);
      else setShowHeader(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const favs = keys.filter(k => k.startsWith('favorite-') && localStorage.getItem(k).includes('"favorite":true'));
    setWishlistCount(favs.length);
  }, [menuOpen]); // actualizar cada vez que se abre el menú

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

          {/* 🛒 Lista de deseos con contador */}
          <Link href="/favorites" legacyBehavior>
            <a title="Mi lista de deseos" className="ml-4 relative">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h13M10 21h.01M16 21h.01" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
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

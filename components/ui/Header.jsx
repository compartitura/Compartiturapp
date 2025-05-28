import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { translateCategory } from '../../utils/translations';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryTree, setCategoryTree] = useState({});
  const [expanded, setExpanded] = useState({});
  const [showHeader, setShowHeader] = useState(true);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const lastScrollY = useRef(0);
  const { data: session } = useSession();

  const calcularTotalDeseos = () => {
    let total = 0;
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('favorite-')) {
        try {
          const item = JSON.parse(localStorage.getItem(k));
          if (item?.favorite === true) total++;
        } catch {}
      }
      if (k.startsWith('cart-')) {
        try {
          const item = JSON.parse(localStorage.getItem(k));
          if (item?.added === true) total++;
        } catch {}
      }
    });
    return total;
  };

  useEffect(() => {
    const updateCount = () => setWishlistCount(calcularTotalDeseos());
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  useEffect(() => {
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
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      const menu = document.getElementById('side-menu');
      if (menu && !menu.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#abrirform' && session) {
      setShowForm(true);
      window.location.hash = '';
    }
  }, [session]);

  const toggle = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="px-4 py-2 flex items-center justify-between border-b">
          <Link href="/">
            <Image
              src="https://www.compartitura.org/medias/images/captura3.5dc51b958b6c69.11833439-0x80-1-.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>

          <div className="text-sm font-semibold text-gray-700 text-center flex-grow">
            Instrumentos y accesorios
          </div>

          <Link href="/favorites" className="ml-4 relative" title="Mi lista de deseos">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h13M10 21h.01M16 21h.01" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>

        <div className={`transition-all duration-300 ${showHeader ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
          <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
            <button onClick={() => setMenuOpen(true)}>
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
        </div>
      </header>

      {menuOpen && (
        <div id="side-menu" className="fixed top-0 left-0 w-4/5 h-screen bg-white shadow-xl z-50 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Categorías</h2>
            <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-black text-2xl">&times;</button>
          </div>

          <div className="mb-6">
            <Link
              href="/usados"
              onClick={() => setMenuOpen(false)}
              className="block text-base font-bold bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
            >
              Instrumentos Usados
            </Link>
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
                      className="text-sm text-gray-600 hover:text-black"
                      onClick={() => setMenuOpen(false)}
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

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-500 text-2xl leading-none"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Publicar instrumento usado</h2>
            <p className="text-sm text-gray-600">Aquí irá el formulario para ingresar los datos del instrumento.</p>
          </div>
        </div>
      )}

      <div className="group fixed bottom-6 right-6 z-50">
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block text-xs bg-black text-white px-3 py-1 rounded shadow">
          Publicar un instrumento en venta
        </div>
        <button
          onClick={() => {
            if (session) setShowForm(true);
            else signIn('google', { callbackUrl: window.location.href + '#abrirform' });
          }}
          className="bg-black text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl hover:opacity-90"
          aria-label="Publicar"
        >
          +
        </button>
      </div>
    </>
  );
}

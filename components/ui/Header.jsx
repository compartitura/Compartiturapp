// components/ui/Header.jsx
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [logueado, setLogueado] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const datos = localStorage.getItem('usuario-logueado');
    if (datos) {
      const perfil = JSON.parse(datos);
      setLogueado(true);
      if (perfil.avatar) setAvatar(perfil.avatar);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario-logueado');
    localStorage.removeItem('logueado');
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <div className="px-6 py-2 flex items-center justify-between border-b">
        <Link href="/">
          <Image
            src="https://www.compartitura.org/medias/images/captura3.5dc51b958b6c69.11833439-0x80-1-.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>

        <div className="text-1xl font-semibold">Compartitura.org</div>

        <div className="flex items-center gap-4">
          <Link href="/favorites" title="Favoritos">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h13M10 21h.01M16 21h.01" />
            </svg>
          </Link>

          {logueado ? (
            <>
              <Link href="/cuenta" title="Mi cuenta">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border" />
                ) : (
                  <span className="text-sm">👤</span>
                )}
              </Link>
              <button onClick={cerrarSesion} className="text-sm text-red-600 hover:underline">Cerrar sesión</button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-gray-700 hover:underline">Iniciar sesión</Link>
          )}
        </div>
      </div>
    </header>
  );
}

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
                  {Object.entries(subs).map(([sub, subsubs]) =>
                    subsubs.length > 0 ? (
                      <div key={sub}>
                        <button
                          onClick={() => toggle(`${cat}>${sub}`)}
                          className="text-sm text-gray-700 hover:underline"
                        >
                          {expanded[`${cat}>${sub}`] ? '▼' : '▶'} {translateCategory(sub)}
                        </button>
                        {expanded[`${cat}>${sub}`] && (
                          <div className="ml-4 mt-1 flex flex-col gap-1">
                            {subsubs.map(subsub => (
                              <Link
                                key={subsub}
                                href={`/categories/${encodeURIComponent(cat)}/${encodeURIComponent(sub)}/${encodeURIComponent(subsub)}`}
                                className="text-sm text-gray-600 hover:text-black"
                                onClick={() => setMenuOpen(false)}
                              >
                                {translateCategory(subsub)}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={sub}
                        href={`/categories/${encodeURIComponent(cat)}/${encodeURIComponent(sub)}`}
                        className="text-sm text-gray-700 hover:text-black ml-1"
                        onClick={() => setMenuOpen(false)}
                      >
                        {translateCategory(sub)}
                      </Link>
                    )
                  )}
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
    Publicar instrumento
  </div>
  <button
    onClick={() => setShowForm(true)}
    className="bg-black text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl hover:opacity-90"
    aria-label="Publicar"
  >
    +
  </button>
</div>
    </>
  );
}

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
            <Link href="/cuenta" title="Mi cuenta">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border" />
              ) : (
                <span className="text-sm">👤</span>
              )}
            </Link>
          ) : (
            <Link href="/login" className="text-sm text-gray-700 hover:underline">Iniciar sesión</Link>
          )}
        </div>
      </div>
    </header>
  );
}
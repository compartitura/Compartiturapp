import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import Link from 'next/link';

export async function getStaticProps() {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/versions/products.json'), 'utf-8')
  );

  const ultimos = data.slice(-20).reverse();
  const destacados = data.slice(0, 6);
  const buscados = Array.isArray(data) ? data.slice(100, 108) : [];

  return {
    props: {
      ultimos,
      destacados,
      buscados
    },
  };
}

export default function Home({ ultimos, destacados, buscados }) {
  const [musicoActivo, setMusicoActivo] = useState(null);

  const musicos = [
    { nombre: 'Carla Rivas', instrumento: 'Violín', img: 'https://placehold.co/100x100?text=Carla', tel: '+34666111222' },
    { nombre: 'Javi Gómez', instrumento: 'Bajo', img: 'https://placehold.co/100x100?text=Javi', tel: '+34666111333' },
    { nombre: 'Marina León', instrumento: 'Piano', img: 'https://placehold.co/100x100?text=Marina', tel: '+34666111444' },
  ];

  return (
    <main className="pt-28 px-4 max-w-6xl mx-auto space-y-12">

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Partituras destacadas</h2>
          <Link href="/partituras" className="text-sm text-gray-600 hover:underline">Ver todas</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["Jazz", "Clásica", "Pop", "Rock"].map((nombre, i) => (
            <div key={i} className="border rounded p-3 text-center">
              <img src={`https://placehold.co/240x280?text=${nombre}`} alt={nombre} className="mx-auto rounded mb-2" />
              <p className="text-sm font-medium">{nombre}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Productos destacados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {destacados.map(p => (
            <a key={p.ArticleNumber} href={p.affiliateURL} className="border p-3 rounded hover:shadow text-center">
              <img src={p.ImageURL} alt={p.Model} className="mx-auto mb-2 rounded" />
              <p className="text-sm">{p.Brand} {p.Model}</p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Lo más buscado</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.isArray(buscados) && buscados.map(p => (
            <a key={p.ArticleNumber} href={p.affiliateURL} className="border p-3 rounded hover:shadow text-center">
              <img src={p.ImageURL} alt={p.Model} className="mx-auto mb-2 rounded" />
              <p className="text-sm">{p.Brand} {p.Model}</p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Últimos productos añadidos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ultimos.map(p => (
            <a key={p.ArticleNumber} href={p.affiliateURL} className="border p-3 rounded hover:shadow text-center">
              <img src={p.ImageURL} alt={p.Model} className="mx-auto mb-2 rounded" />
              <p className="text-sm">{p.Brand} {p.Model}</p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Músicos destacados</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {musicos.map((m, i) => (
            <div key={i} className="text-center cursor-pointer" onClick={() => setMusicoActivo(m)}>
              <img src={m.img} alt={m.nombre} className="rounded-full w-20 h-20 mx-auto mb-2" />
              <p className="text-sm font-medium">{m.nombre}</p>
              <p className="text-xs text-gray-500">{m.instrumento}</p>
            </div>
          ))}
        </div>
        {musicoActivo && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-80 text-center relative">
              <button
                className="absolute top-2 right-3 text-gray-400 hover:text-black"
                onClick={() => setMusicoActivo(null)}
              >✕</button>
              <img src={musicoActivo.img} alt={musicoActivo.nombre} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-1">{musicoActivo.nombre}</h3>
              <p className="text-sm text-gray-600 mb-4">{musicoActivo.instrumento}</p>
              <a
                href={`https://wa.me/${musicoActivo.tel.replace('+', '')}`}
                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                target="_blank"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </section>

      <section className="bg-gray-100 p-6 rounded text-center">
        <h2 className="text-lg font-semibold mb-2">Únete a nuestra comunidad en WhatsApp</h2>
        <p className="text-sm text-gray-600 mb-4">Conectá con músicos, novedades, y ofertas exclusivas.</p>
        <a
          href="https://wa.me/34123456789"
          className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          target="_blank"
        >Entrar al grupo</a>
      </section>

    </main>
  );
}

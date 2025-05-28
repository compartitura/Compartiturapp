import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';

export async function getServerSideProps({ params }) {
  const slug = params.slug?.[0] || '';
  const all = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data/versions/products.json'), 'utf-8')
  );

  const product = all.find(p => String(p.ArticleNumber) === slug);

  if (!product) return { notFound: true };

  const similares = all
    .filter(p =>
      p.ArticleNumber !== product.ArticleNumber &&
      p.CategoryTree === product.CategoryTree
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return {
    props: { product, similares }
  };
}

function getVideoURL(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function ProductPage({ product, similares }) {
  const { Brand, Model, Description, ImageURL, affiliateURL, ArticleNumber } = product;
  const [videoId, setVideoId] = useState(null);
  const [videoMeta, setVideoMeta] = useState(null);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [cartAdded, setCartAdded] = useState(false);

  useEffect(() => {
    const favData = JSON.parse(localStorage.getItem(`favorite-${ArticleNumber}`));
    if (favData?.count) setFavoriteCount(favData.count);

    const cartData = JSON.parse(localStorage.getItem(`cart-${ArticleNumber}`));
    if (cartData?.added) setCartAdded(true);
  }, [ArticleNumber]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const clean = (text) =>
          text.toLowerCase()
            .replace(/["'`]/g, '')
            .replace(/[-_]/g, ' ')
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        const brandClean = clean(Brand);
        const modelClean = clean(Model);
        const res = await fetch(`/api/video?brand=${encodeURIComponent(brandClean)}&model=${encodeURIComponent(modelClean)}`);
        const data = await res.json();
        if (data.videoId) {
          setVideoId(data.videoId);
          setVideoMeta(data.meta || null);
        }
      } catch (err) {
        console.error('Error al cargar video:', err);
      }
    };

    fetchVideo();
  }, [Brand, Model]);

  const handleAddToCart = () => {
    localStorage.setItem(`cart-${ArticleNumber}`, JSON.stringify({ added: true, product }));
    setCartAdded(true);

    const favData = JSON.parse(localStorage.getItem(`favorite-${ArticleNumber}`)) || { favorite: false, count: 0 };
    if (!favData.favorite) {
      const updatedCount = favData.count + 1;
      localStorage.setItem(`favorite-${ArticleNumber}`, JSON.stringify({ favorite: true, count: updatedCount }));
      localStorage.setItem(`product-${ArticleNumber}`, JSON.stringify(product));
      setFavoriteCount(updatedCount);
    }
  };

  return (
    <main className="bg-white min-h-screen mt-[150px] px-4 max-w-xl mx-auto text-center">
      <div className="mb-6">
        <img
          src={ImageURL || '/logo-compartitura3.png'}
          alt={Model}
          className="mx-auto max-h-[200px] w-auto object-contain rounded"
          onError={(e) => { e.currentTarget.src = '/logo-compartitura3.png'; }}
        />
      </div>

      <div className="mb-4 flex items-center justify-center gap-3 flex-wrap">
        <Link
          href={`/categories/${encodeURIComponent(product.CategoryTree?.split('>')[0]?.trim() || '')}/${encodeURIComponent(product.CategoryTree?.split('>')[1]?.trim() || '')}?brand=${encodeURIComponent(Brand)}`}
          legacyBehavior
        >
          <a className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider hover:bg-gray-300 transition">
            Ver más de {Brand}
          </a>
        </Link>

        <span className="text-sm text-red-500">
          ❤️ {favoriteCount}
        </span>
      </div>

      <h1 className="text-2xl font-semibold mb-4">{Brand} {Model}</h1>

      {Description && (
        <p className="text-gray-600 text-sm mb-6">{Description}</p>
      )}

      <div className="flex flex-col items-center gap-2 mb-6">
        <Link href={affiliateURL} legacyBehavior>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg text-sm font-medium tracking-wide hover:opacity-90 transition"
          >
            Más información →
          </a>
        </Link>

        {!cartAdded ? (
          <button
            onClick={handleAddToCart}
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium tracking-wide hover:bg-gray-300 transition"
          >
            🛒 Guardar
          </button>
        ) : (
          <p className="text-sm text-green-600 font-medium">🛒 Producto añadido</p>
        )}
      </div>

      {videoId ? (
        <>
          <div className="aspect-video w-full max-w-xl mx-auto rounded overflow-hidden shadow mb-3">
            <iframe
              className="w-full h-full"
              src={getVideoURL(videoId)}
              title={`${Brand} ${Model} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {videoMeta?.title && videoMeta?.channel && (
            <p className="text-xs text-gray-500 italic mb-6">
              🎥 {videoMeta.title} — por <strong>{videoMeta.channel}</strong>
            </p>
          )}
        </>
      ) : (
        <p className="text-xs text-gray-400 mt-2 mb-6">
          No se encontró un demo en YouTube para este producto.
        </p>
      )}

      {similares.length > 0 && (
        <section className="mt-10 text-left">
          <h2 className="text-lg font-semibold mb-4 text-center">🎯 Otros productos similares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {similares.map(prod => (
              <Card key={prod.ArticleNumber} product={prod} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

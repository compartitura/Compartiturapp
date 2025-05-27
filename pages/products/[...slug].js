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
  const { Brand, Model, Description, ImageURL, affiliateURL } = product;
  const [videoId, setVideoId] = useState(null);

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
        }
      } catch (err) {
        console.error('Error al cargar video:', err);
      }
    };

    fetchVideo();
  }, [Brand, Model]);

  return (
    <main className="bg-white min-h-screen mt-[150px] px-4 max-w-xl mx-auto text-center">
      <div className="mb-6">
        <img
          src={ImageURL || '/logo-compartitura3.png'}
          alt={Model}
          className="mx-auto max-h-[200px] w-auto object-contain rounded"
          onError={(e) => e.currentTarget.src = '/logo-compartitura3.png'}
        />
      </div>

      <div className="mb-2">
        <span className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          {Brand}
        </span>
      </div>

      <h1 className="text-2xl font-semibold mb-4">{Brand} {Model}</h1>

      {Description && (
        <p className="text-gray-600 text-sm mb-6">{Description}</p>
      )}

      <Link href={affiliateURL} legacyBehavior>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg text-sm font-medium tracking-wide hover:opacity-90 transition mb-6"
        >
          Ver en Thomann →
        </a>
      </Link>

      {videoId ? (
        <div className="aspect-video w-full max-w-xl mx-auto rounded overflow-hidden shadow mb-6">
          <iframe
            className="w-full h-full"
            src={getVideoURL(videoId)}
            title={`${Brand} ${Model} demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
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

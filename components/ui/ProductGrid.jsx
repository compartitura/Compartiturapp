// components/ProductGrid.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductGrid({ products }) {
  return (
    <div className="flex flex-col gap-6 p-4">
      {products.map((product) => {
        const name = product.name || `${product.Brand || ''} ${product.Model || ''}`.trim();
        const description = product.description || product.Description;
        const image = product.image || product.ImageURL || '/logo-compartitura3.png';
        const price = product.price || product.Price;
        const id = product.ArticleNumber || product.id;
        const isUsed = id?.startsWith('u');
        const badgeText = isUsed ? 'Usado' : 'Nuevo';
        const badgeColor = isUsed ? 'bg-yellow-400' : 'bg-green-500';

        return (
          <Link key={id} href={`/product/${id}`} className="border rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row gap-4 hover:shadow-md transition">
            <div className="relative">
              <Image
                src={image}
                alt={name}
                width={300}
                height={300}
                className="w-full md:w-48 h-auto object-cover"
                onError={(e) => (e.target.src = '/logo-compartitura3.png')}
              />
              <span className={`absolute top-2 right-2 px-2 py-0.5 text-xs text-white rounded ${badgeColor}`}>{badgeText}</span>
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="mt-2 text-sm text-gray-600">{description}</p>
              </div>
              <div className="mt-4 font-bold">
                {product.Currency || '€'} {price}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

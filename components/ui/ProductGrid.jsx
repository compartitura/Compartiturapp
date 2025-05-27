// components/ProductGrid.jsx
import React from 'react';
import Image from 'next/image';

export default function ProductGrid({ products }) {
  return (
    <div className="flex flex-col gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row gap-4">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full md:w-48 h-auto object-cover"
          />
          <div className="p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{product.description}</p>
            </div>
            <div className="mt-4 font-bold">${product.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
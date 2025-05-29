// pages/usados/index.js
import { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../../components/ui/Card';
import { useSession } from 'next-auth/react';

export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(process.cwd(), 'public/data/used-products.json');
  let products = [];

  try {
    const file = fs.readFileSync(filePath, 'utf8');
    products = JSON.parse(file);
  } catch (err) {
    console.error('No se pudo leer used-products.json', err);
  }

  return {
    props: { products },
  };
}

export default function Usados({ products }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ Brand: '', Model: '', Description: '', Price: '', ImageURL: '', Phone: '', Location: '' });
  const [uploading, setUploading] = useState(false);
  const observer = useRef();
  const { data: session } = useSession();

  const loadMore = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleCount(prev => prev + 20);
          setIsLoadingMore(false);
        }, 400);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.success) setForm(prev => ({ ...prev, ImageURL: data.imageUrl }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/add-used-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      window.location.reload();
    } else {
      alert('Error al guardar el producto');
    }
  };

  return (
    <main className="bg-white w-full mx-auto p-4 pt-[150px] max-w-5xl relative">
      <h1 className="text-2xl font-bold text-center mb-6">Instrumentos Usados</h1>

      <div className="flex flex-col gap-6">
        {products.slice(0, visibleCount).map(product => (
          <Card key={product.ArticleNumber || product.id} product={product} />
        ))}

        {visibleCount < products.length && (
          <>
            <div ref={loadMore} className="h-10" />
            {isLoadingMore && (
              <p className="text-sm text-gray-500 text-center animate-pulse">
                Cargando más...
              </p>
            )}
          </>
        )}
      </div>

      <button
        onClick={() => {
          if (session) setShowForm(true);
          else alert('Debes iniciar sesión para publicar un instrumento usado.');
        }}
        className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-green-600 z-50"
        title="Publicar instrumento usado"
      >
        +
      </button>

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input name="Brand" value={form.Brand} onChange={handleChange} placeholder="Marca" className="border px-3 py-2 rounded text-sm" required />
              <input name="Model" value={form.Model} onChange={handleChange} placeholder="Modelo" className="border px-3 py-2 rounded text-sm" required />
              <textarea name="Description" value={form.Description} onChange={handleChange} placeholder="Descripción" className="border px-3 py-2 rounded text-sm" required />
              <input name="Price" value={form.Price} onChange={handleChange} placeholder="Precio" className="border px-3 py-2 rounded text-sm" required />
              <input name="Phone" value={form.Phone} onChange={handleChange} placeholder="Teléfono para WhatsApp" className="border px-3 py-2 rounded text-sm" required />
              <input name="Location" value={form.Location} onChange={handleChange} placeholder="Ubicación (Ciudad, País)" className="border px-3 py-2 rounded text-sm" required />
              <input type="file" accept="image/*" capture="environment" onChange={handleFile} className="text-sm" />
              {uploading && <p className="text-xs text-gray-400">Subiendo imagen...</p>}
              {form.ImageURL && <img src={form.ImageURL} alt="preview" className="w-full h-auto rounded" />}
              <button type="submit" className="bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">Guardar</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

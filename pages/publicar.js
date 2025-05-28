// pages/publicar.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Publicar() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    phone: ''
  });
  const router = useRouter();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/publicar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push('/usados');
    else alert('Error al guardar.');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-xl font-bold mb-4">Publicar Instrumento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          placeholder="Título"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2"
          placeholder="Categoría"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2"
          placeholder="Precio"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2"
          placeholder="Teléfono de contacto"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">
          Publicar
        </button>
      </form>
    </div>
  );
}

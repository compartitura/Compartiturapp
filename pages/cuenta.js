// pages/cuenta.js
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'usuarios.json');
  const contenido = fs.readFileSync(filePath, 'utf8');
  const usuarios = JSON.parse(contenido);

  return { props: { usuarios } };
}

export default function Cuenta({ usuarios }) {
  const { data: session } = useSession();
  const user = session ? usuarios.find(u => u.email === session.user.email) : null;
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ ...user });

  const actualizar = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const actualizarCheck = (e) => setForm({ ...form, [e.target.name]: e.target.checked });

  const guardar = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/editar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) setEditando(false);
    else alert('Error al guardar');
  };

  if (!user) return <p className="mt-24 text-center">No has iniciado sesión</p>;

  return (
    <main className="max-w-xl mx-auto mt-24 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Mi cuenta</h1>

      {!editando ? (
        <div className="space-y-2">
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Ciudad:</strong> {user.ciudad}</p>
          <p><strong>País:</strong> {user.pais}</p>
          <p><strong>Teléfono:</strong> {user.telefono}</p>
          <p><strong>Instrumento:</strong> {user.instrumento}</p>
          <p><strong>Nivel:</strong> {user.nivel}</p>
          <p><strong>Visibilidad:</strong> {user.visible ? 'Sí' : 'No'}</p>
          <p><strong>Suscripción:</strong> {user.premium ? `${user.premium.tipo} - ${user.premium.tiempo}` : 'No'}</p>
          <button onClick={() => setEditando(true)} className="bg-black text-white px-4 py-2 rounded">Editar</button>
        </div>
      ) : (
        <form onSubmit={guardar} className="space-y-3">
          <input type="text" name="nombre" value={form.nombre} onChange={actualizar} className="w-full border px-3 py-2 rounded" />
          <input type="text" name="ciudad" value={form.ciudad} onChange={actualizar} className="w-full border px-3 py-2 rounded" />
          <input type="text" name="pais" value={form.pais} onChange={actualizar} className="w-full border px-3 py-2 rounded" />
          <input type="text" name="telefono" value={form.telefono} onChange={actualizar} className="w-full border px-3 py-2 rounded" />
          <input type="text" name="instrumento" value={form.instrumento || ''} onChange={actualizar} className="w-full border px-3 py-2 rounded" />
          <input type="text" name="nivel" value={form.nivel || ''} onChange={actualizar} className="w-full border px-3 py-2 rounded" />

          <label className="block text-sm">
            <input type="checkbox" name="visible" checked={form.visible} onChange={actualizarCheck} className="mr-2" />
            Mostrarme en las búsquedas públicas
          </label>

          <label className="block text-sm">
            <input type="checkbox" name="premiumActiva" checked={!!form.premium} onChange={e => setForm({ ...form, premium: e.target.checked ? { tipo: '', tiempo: '' } : null })} className="mr-2" />
            Suscripción premium
          </label>

          {form.premium && (
            <div className="space-y-2">
              <select name="tipo" value={form.premium.tipo} onChange={e => setForm({ ...form, premium: { ...form.premium, tipo: e.target.value } })} className="w-full border px-3 py-2 rounded">
                <option value="">Tipo</option>
                <option value="Músico">Músico - 2,50€/mes o 14,80€/año</option>
                <option value="Director">Director - 4,00€/mes o 24,80€/año</option>
              </select>
              <select name="tiempo" value={form.premium.tiempo} onChange={e => setForm({ ...form, premium: { ...form.premium, tiempo: e.target.value } })} className="w-full border px-3 py-2 rounded">
                <option value="">Duración</option>
                <option value="Mensual">Mensual</option>
                <option value="Anual">Anual</option>
              </select>
            </div>
          )}

          <div className="flex gap-4">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">Guardar</button>
            <button type="button" onClick={() => setEditando(false)} className="bg-gray-200 px-4 py-2 rounded">Cancelar</button>
          </div>
        </form>
      )}
    </main>
  );
}

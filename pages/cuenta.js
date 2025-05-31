// pages/cuenta.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Cuenta() {
  const [perfil, setPerfil] = useState({
    nombre: 'Juan Pérez',
    email: 'juan@correo.com',
    modo: 'musico',
    suscripcion: 'anual',
    activa: true,
    avatar: null
  });

  const [favoritos, setFavoritos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [publicaciones, setPublicaciones] = useState([]);

  const precios = {
    musico: { mensual: 2.5, anual: 14.8 },
    director: { mensual: 4, anual: 24.8 },
  };

  useEffect(() => {
    const favs = [];
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('favorite-')) {
        const info = JSON.parse(localStorage.getItem(k));
        if (info?.favorite && localStorage.getItem(`product-${k.replace('favorite-', '')}`)) {
          const product = JSON.parse(localStorage.getItem(`product-${k.replace('favorite-', '')}`));
          favs.push(product);
        }
      }
    });
    setFavoritos(favs);

    const misPublicaciones = [
      { id: 1, titulo: 'Violín antiguo 4/4', fecha: '2024-12-01' },
      { id: 2, titulo: 'Micrófono AKG usado', fecha: '2025-01-20' },
    ];
    setPublicaciones(misPublicaciones);
  }, []);

  const cambiarValor = (campo, valor) => {
    setPerfil(prev => ({ ...prev, [campo]: valor }));
  };

  const manejarAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPerfil(prev => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const cancelarSuscripcion = () => {
    if (confirm('¿Seguro que querés cancelar tu suscripción?')) {
      setPerfil(prev => ({ ...prev, activa: false }));
    }
  };

  const guardarPerfil = () => {
    setEditando(false);
    alert('Datos actualizados:\n' + JSON.stringify(perfil, null, 2));
  };

  const calcularPrecio = () => {
    const base = precios[perfil.modo]?.[perfil.suscripcion];
    const total = base + base * 0.21;
    return total.toFixed(2);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-6 mt-28">
      <h2 className="text-2xl font-bold">👤 Mi cuenta</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* DATOS */}
        <div>
          <h3 className="font-semibold mb-2">📄 Información personal</h3>
          {editando ? (
            <div className="space-y-2">
              <input
                value={perfil.nombre}
                onChange={e => cambiarValor('nombre', e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                value={perfil.email}
                onChange={e => cambiarValor('email', e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <div>
                <label className="block text-sm mb-1">Foto de perfil</label>
                <input type="file" accept="image/*" onChange={manejarAvatar} className="text-sm" />
                {perfil.avatar && <img src={perfil.avatar} alt="avatar" className="w-24 h-24 rounded-full mt-2 object-cover" />}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={guardarPerfil}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditando(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Nombre:</strong> {perfil.nombre}</p>
              <p><strong>Email:</strong> {perfil.email}</p>
              {perfil.avatar && <img src={perfil.avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover" />}
              <button
                onClick={() => setEditando(true)}
                className="mt-2 text-sm underline text-blue-600 hover:text-blue-800"
              >
                Editar datos
              </button>
            </div>
          )}
        </div>

        {/* SUSCRIPCIÓN */}
        <div>
          <h3 className="font-semibold mb-2">💳 Suscripción</h3>
          {perfil.activa ? (
            <>
              <p><strong>Tipo:</strong> {perfil.modo}</p>
              <p><strong>Frecuencia:</strong> {perfil.suscripcion}</p>
              <p><strong>Precio actual:</strong> {calcularPrecio()} €</p>

              <div className="flex flex-col gap-2 mt-2">
                <label className="flex gap-2 items-center">
                  Tipo:
                  <select value={perfil.modo} onChange={e => cambiarValor('modo', e.target.value)} className="border px-2 py-1 rounded">
                    <option value="musico">Músico</option>
                    <option value="director">Director</option>
                  </select>
                </label>

                <label className="flex gap-2 items-center">
                  Frecuencia:
                  <select value={perfil.suscripcion} onChange={e => cambiarValor('suscripcion', e.target.value)} className="border px-2 py-1 rounded">
                    <option value="mensual">Mensual</option>
                    <option value="anual">Anual</option>
                  </select>
                </label>

                <button onClick={cancelarSuscripcion} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Cancelar suscripción
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">No tenés una suscripción activa.</p>
          )}
        </div>
      </div>

      {/* FAVORITOS */}
      <div>
        <h3 className="text-lg font-semibold mb-2">❤️ Mis favoritos</h3>
        {favoritos.length === 0 ? (
          <p className="text-sm text-gray-500">No agregaste ningún producto todavía.</p>
        ) : (
          <div className="space-y-2">
            {favoritos.map(p => (
              <Link
                key={p.ArticleNumber}
                href={`/products/${p.ArticleNumber}`}
                className="block border px-4 py-2 rounded hover:bg-gray-100"
              >
                <strong>{p.Brand} {p.Model}</strong> – {p.Description?.slice(0, 40)}…
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* PUBLICACIONES */}
      <div>
        <h3 className="text-lg font-semibold mb-2">📦 Mis publicaciones</h3>
        {publicaciones.length === 0 ? (
          <p className="text-sm text-gray-500">No publicaste productos todavía.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1">
            {publicaciones.map(pub => (
              <li key={pub.id}>{pub.titulo} <span className="text-xs text-gray-400">({pub.fecha})</span></li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

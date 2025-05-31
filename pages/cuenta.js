// pages/cuenta.js
import { useEffect, useState } from 'react';

export default function CuentaPage() {
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [quiereSuscribirse, setQuiereSuscribirse] = useState(false);

  const precios = {
    musico: { mensual: 2.5, anual: 14.8 },
    director: { mensual: 4, anual: 24.8 },
  };

  useEffect(() => {
    const datos = localStorage.getItem('usuario-logueado');
    if (datos) setPerfil(JSON.parse(datos));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfil(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setPerfil(prev => ({ ...prev, [name]: value }));
    }
  };

  const guardarCambios = () => {
    localStorage.setItem('usuario-logueado', JSON.stringify(perfil));
    alert('Cambios guardados');
    setEditando(false);
  };

  const calcularPrecio = () => {
    if (!perfil?.modo || !perfil?.suscripcion) return null;
    const base = precios[perfil.modo][perfil.suscripcion];
    const iva = base * 0.21;
    return (base + iva).toFixed(2);
  };

  const activarSuscripcion = () => {
    const fecha = new Date();
    const renovacion = new Date();
    renovacion.setMonth(renovacion.getMonth() + (perfil.suscripcion === 'mensual' ? 1 : 12));
    const actualizado = { ...perfil, activa: true, fechaRenovacion: renovacion.toISOString().split('T')[0] };
    localStorage.setItem('usuario-logueado', JSON.stringify(actualizado));
    setPerfil(actualizado);
    alert('Suscripción activada. ¡Gracias!');
  };

  const cancelarSuscripcion = () => {
    const actualizado = { ...perfil, activa: false, fechaRenovacion: null };
    localStorage.setItem('usuario-logueado', JSON.stringify(actualizado));
    setPerfil(actualizado);
    alert('Suscripción cancelada.');
  };

  if (!perfil) return <p className="mt-28 text-center">Cargando datos...</p>;

  return (
    <main className="mt-28 max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">Mi cuenta</h2>

      {perfil.avatar && (
        <div className="text-center">
          <img src={perfil.avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto object-cover border" />
        </div>
      )}

      {editando ? (
        <>
          <input name="nombre" value={perfil.nombre} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="email" value={perfil.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="telefono" value={perfil.telefono} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="ciudad" value={perfil.ciudad} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="pais" value={perfil.pais} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="instrumentos" value={perfil.instrumentos} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <select name="nivel" value={perfil.nivel} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="aficionado">Aficionado</option>
            <option value="intermedio">Intermedio</option>
            <option value="profesional">Profesional</option>
            <option value="titulado">Titulado</option>
          </select>

          <div>
            <label className="block text-sm mb-1">Cambiar imagen de perfil</label>
            <input type="file" accept="image/*" name="avatar" onChange={handleChange} className="w-full" />
          </div>

          <button onClick={guardarCambios} className="w-full bg-green-600 text-white py-2 rounded">Guardar</button>
        </>
      ) : (
        <>
          <p><strong>Nombre:</strong> {perfil.nombre}</p>
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Teléfono:</strong> {perfil.telefono}</p>
          <p><strong>Ciudad:</strong> {perfil.ciudad}</p>
          <p><strong>País:</strong> {perfil.pais}</p>
          <p><strong>Instrumentos:</strong> {perfil.instrumentos}</p>
          <p><strong>Nivel:</strong> {perfil.nivel}</p>

          <button onClick={() => setEditando(true)} className="w-full bg-blue-600 text-white py-2 rounded">Editar</button>
        </>
      )}

      {perfil.activa ? (
        <div className="border-t pt-4 space-y-2">
          <h3 className="text-lg font-semibold mb-2">Tu suscripción</h3>
          <p><strong>Modalidad:</strong> {perfil.modo}</p>
          <p><strong>Plan:</strong> {perfil.suscripcion}</p>
          <p><strong>Renovación:</strong> {perfil.fechaRenovacion}</p>

          <button onClick={() => setPerfil(prev => ({ ...prev, activa: false }))} className="w-full bg-yellow-500 text-black py-2 rounded">Modificar</button>
          <button onClick={cancelarSuscripcion} className="w-full bg-red-600 text-white py-2 rounded">Cancelar suscripción</button>
        </div>
      ) : (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Suscripción</h3>

          <label className="flex items-center gap-2">
            <input type="radio" name="modo" value="musico" checked={perfil.modo === 'musico'} onChange={handleChange} />
            Músico
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="modo" value="director" checked={perfil.modo === 'director'} onChange={handleChange} />
            Director
          </label>

          <label className="flex items-center gap-2 mt-2">
            <input type="radio" name="suscripcion" value="mensual" checked={perfil.suscripcion === 'mensual'} onChange={handleChange} />
            Mensual
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="suscripcion" value="anual" checked={perfil.suscripcion === 'anual'} onChange={handleChange} />
            Anual
          </label>

          {perfil.modo && perfil.suscripcion && (
            <p className="text-sm text-gray-600 mt-2">
              Precio con IVA: <strong>{calcularPrecio()} €</strong>
            </p>
          )}

          <button onClick={activarSuscripcion} className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Suscribirme
          </button>
        </div>
      )}
    </main>
  );
}

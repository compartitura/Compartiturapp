// components/PanelUsuario.jsx
import { useState } from 'react';

export default function PanelUsuario() {
  const [perfil, setPerfil] = useState({
    nombre: 'Juan Pérez',
    email: 'juan@correo.com',
    modo: 'musico',          // musico | director
    suscripcion: 'anual',    // mensual | anual
    activa: true
  });

  const precios = {
    musico: { mensual: 2.5, anual: 14.8 },
    director: { mensual: 4, anual: 24.8 },
  };

  const calcularPrecio = () => {
    const base = precios[perfil.modo][perfil.suscripcion];
    const total = base + base * 0.21;
    return total.toFixed(2);
  };

  const cambiarPlan = (campo, valor) => {
    setPerfil(prev => ({ ...prev, [campo]: valor }));
  };

  const cancelarSuscripcion = () => {
    const confirm = window.confirm('¿Seguro que querés cancelar la suscripción?');
    if (confirm) {
      setPerfil(prev => ({ ...prev, activa: false }));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4 mt-8">
      <h2 className="text-xl font-bold mb-2">Panel del Usuario</h2>

      <p><strong>Nombre:</strong> {perfil.nombre}</p>
      <p><strong>Email:</strong> {perfil.email}</p>

      <hr />

      <h3 className="font-semibold">Suscripción</h3>

      {perfil.activa ? (
        <>
          <p>Plan: <strong>{perfil.modo}</strong></p>
          <p>Frecuencia: <strong>{perfil.suscripcion}</strong></p>
          <p>Precio actual: <strong>{calcularPrecio()} €</strong></p>

          <div className="flex flex-col gap-2 mt-4">
            <label className="flex gap-2 items-center">
              Tipo:
              <select value={perfil.modo} onChange={e => cambiarPlan('modo', e.target.value)} className="border px-2 py-1 rounded">
                <option value="musico">Músico</option>
                <option value="director">Director</option>
              </select>
            </label>

            <label className="flex gap-2 items-center">
              Frecuencia:
              <select value={perfil.suscripcion} onChange={e => cambiarPlan('suscripcion', e.target.value)} className="border px-2 py-1 rounded">
                <option value="mensual">Mensual</option>
                <option value="anual">Anual</option>
              </select>
            </label>

            <button onClick={cancelarSuscripcion} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2">
              Cancelar suscripción
            </button>
          </div>
        </>
      ) : (
        <div className="text-sm text-gray-500">
          No tenés una suscripción activa.
        </div>
      )}
    </div>
  );
}

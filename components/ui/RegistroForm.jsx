// components/RegistroForm.jsx
import { useState } from 'react';

export default function RegistroForm() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo: '',
    instrumentos: '',
    nivel: '',
    ciudad: '',
    pais: '',
    modo: '',
    suscripcion: '',
  });

  const [quiereSuscribirse, setQuiereSuscribirse] = useState(false);
  const [showPago, setShowPago] = useState(false);

  const precios = {
    musico: { mensual: 2.5, anual: 14.8 },
    director: { mensual: 4, anual: 24.8 },
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const calcularPrecio = () => {
    const base = precios[form.modo]?.[form.suscripcion];
    if (!base) return null;
    const total = base + base * 0.21;
    return total.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quiereSuscribirse && form.modo && form.suscripcion) {
      setShowPago(true);
    } else {
      alert("Registro enviado:\n" + JSON.stringify(form, null, 2));
    }
  };

  const confirmarPago = () => {
    setShowPago(false);
    alert("Registro + pago simulado:\n" + JSON.stringify(form, null, 2));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4">
        <h2 className="text-xl font-bold mb-4">Registro</h2>

        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo" required className="w-full border px-3 py-2 rounded" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full border px-3 py-2 rounded" />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono (WhatsApp)" className="w-full border px-3 py-2 rounded" />

        <select name="tipo" value={form.tipo} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="">¿Qué sos?</option>
          <option value="estudiante">🎓 Estudiante</option>
          <option value="musico">🎶 Músico</option>
          <option value="profesor">🧑‍🏫 Profesor</option>
          <option value="director">👥 Director</option>
          <option value="tecnico">🛠 Técnico</option>
          <option value="productor">🎧 Productor</option>
        </select>

        <input name="instrumentos" value={form.instrumentos} onChange={handleChange} placeholder="Instrumentos o especialidades" className="w-full border px-3 py-2 rounded" />

        <select name="nivel" value={form.nivel} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="">Nivel musical</option>
          <option value="aficionado">Aficionado</option>
          <option value="intermedio">Intermedio</option>
          <option value="profesional">Profesional</option>
          <option value="titulado">Titulado</option>
        </select>

        <div className="flex gap-2">
          <input name="ciudad" value={form.ciudad} onChange={handleChange} placeholder="Ciudad" className="w-1/2 border px-3 py-2 rounded" />
          <input name="pais" value={form.pais} onChange={handleChange} placeholder="País" className="w-1/2 border px-3 py-2 rounded" />
        </div>

        <hr className="my-4" />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={quiereSuscribirse} onChange={() => setQuiereSuscribirse(prev => !prev)} />
          Quiero suscribirme ahora (opcional)
        </label>

        {quiereSuscribirse && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="modo" value="musico" checked={form.modo === 'musico'} onChange={handleChange} />
                Músico
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="modo" value="director" checked={form.modo === 'director'} onChange={handleChange} />
                Director
              </label>
            </div>

            <div className="flex gap-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="suscripcion" value="mensual" checked={form.suscripcion === 'mensual'} onChange={handleChange} />
                Mensual
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="suscripcion" value="anual" checked={form.suscripcion === 'anual'} onChange={handleChange} />
                Anual
              </label>
            </div>

            {form.modo && form.suscripcion && (
              <p className="text-sm text-gray-600">
                Precio con IVA: <strong>{calcularPrecio()} €</strong>
              </p>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500">
          Al continuar aceptás los <a href="/terminos" className="underline">términos y condiciones</a>.
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Registrarse
        </button>
      </form>

      {showPago && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4">Confirmar pago</h3>
            <p className="mb-4">
              Vas a pagar <strong>{calcularPrecio()} €</strong> por la suscripción <br />
              <span className="capitalize">{form.modo}</span> / {form.suscripcion}
            </p>
            <button onClick={confirmarPago} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">
              Confirmar
            </button>
            <button onClick={() => setShowPago(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

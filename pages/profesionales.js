// pages/profesionales.js
import { useState } from 'react';

export async function getStaticProps() {
  const fs = await import('fs/promises');
  const path = await import('path');

  const filePath = path.join(process.cwd(), 'data', 'usuarios.json');
  const contenido = await fs.readFile(filePath, 'utf8');
  const usuarios = JSON.parse(contenido);

  const visibles = usuarios.filter(u => u.visible);
  const instrumentos = [...new Set(visibles.map(u => u.instrumento).filter(i => i && typeof i === 'string'))];
  const paises = [...new Set(visibles.map(u => u.pais).filter(p => p && typeof p === 'string'))];
  const perfiles = [...new Set(visibles.flatMap(u => Array.isArray(u.perfil) ? u.perfil : []))];

  return { props: { usuarios: visibles, instrumentos, paises, perfiles } };
}

export default function ProfesionalesPage({ usuarios = [], instrumentos = [], paises = [], perfiles = [] }) {
  const [texto, setTexto] = useState("");
  const [filtroInstrumento, setFiltroInstrumento] = useState("");
  const [filtroPais, setFiltroPais] = useState("");
  const [filtroPerfil, setFiltroPerfil] = useState("");
  const [expandido, setExpandido] = useState(null);

  const filtrados = usuarios.filter(u => {
    const coincideTexto =
      texto === "" ||
      (u.nombre && u.nombre.toLowerCase().includes(texto.toLowerCase())) ||
      (u.instrumento && u.instrumento.toLowerCase().includes(texto.toLowerCase())) ||
      (u.ciudad && u.ciudad.toLowerCase().includes(texto.toLowerCase())) ||
      (u.pais && u.pais.toLowerCase().includes(texto.toLowerCase()));

    const coincideInstrumento = !filtroInstrumento || u.instrumento === filtroInstrumento;
    const coincidePais = !filtroPais || u.pais === filtroPais;
    const coincidePerfil = !filtroPerfil || (u.perfil || []).includes(filtroPerfil);

    return coincideTexto && coincideInstrumento && coincidePais && coincidePerfil;
  });

  return (
    <main className="max-w-4xl mx-auto mt-24 p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar profesionales</h1>

      <input
        type="text"
        placeholder="Buscar por nombre, instrumento, ciudad..."
        className="w-full mb-4 px-4 py-2 border rounded"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select className="border px-3 py-2 rounded" value={filtroInstrumento} onChange={(e) => setFiltroInstrumento(e.target.value)}>
          <option value="">Todos los instrumentos</option>
          {instrumentos.map((i, idx) => <option key={idx} value={i}>{i}</option>)}
        </select>

        <select className="border px-3 py-2 rounded" value={filtroPais} onChange={(e) => setFiltroPais(e.target.value)}>
          <option value="">Todos los países</option>
          {paises.map((p, idx) => <option key={idx} value={p}>{p}</option>)}
        </select>

        <select className="border px-3 py-2 rounded" value={filtroPerfil} onChange={(e) => setFiltroPerfil(e.target.value)}>
          <option value="">Todos los perfiles</option>
          {perfiles.map((p, idx) => <option key={idx} value={p}>{p}</option>)}
        </select>
      </div>

      <ul className="space-y-4">
        {filtrados.map((u, idx) => (
          <li key={u.email} className="p-4 bg-white shadow rounded cursor-pointer" onClick={() => setExpandido(expandido === idx ? null : idx)}>
            <p><strong>{u.nombre}</strong></p>
            <p className="text-sm text-gray-600">{u.instrumento}</p>
            <p className="text-sm text-gray-500">{u.ciudad}, {u.pais}</p>

            {expandido === idx && (
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                {u.perfil?.length > 0 && <p><strong>Perfil:</strong> {u.perfil.join(', ')}</p>}
                {u.nivel && <p><strong>Nivel de interpretación:</strong> {u.nivel}</p>}
                {u.telefono && (
                  <a
                    href={`https://wa.me/${u.telefono.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Contactar por WhatsApp
                  </a>
                )}
              </div>
            )}
          </li>
        ))}

        {filtrados.length === 0 && (
          <p className="text-center text-gray-500">No se encontraron profesionales.</p>
        )}
      </ul>
    </main>
  );
}

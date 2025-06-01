// pages/admin/usuarios.js
import fs from 'fs';
import path from 'path';
import { useState } from 'react';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'usuarios.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const usuarios = JSON.parse(content);

  return { props: { usuarios } };
}

export default function UsuariosPage({ usuarios }) {
  const [abierto, setAbierto] = useState(null);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Usuarios registrados</h1>
      <ul className="grid gap-4">
        {usuarios.map((u, i) => (
          <li
            key={i}
            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
            onClick={() => setAbierto(i)}
          >
            <div className="flex items-center gap-4 p-4">
              <img
                src={u.avatar || '/default-avatar.png'}
                alt={u.nombre}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg">{u.nombre}</div>
                <div className="text-sm text-gray-600">
                  {u.ciudad}, {u.pais} — {u.instrumento}
                </div>
              </div>
            </div>

            {abierto === i && (
              <div
                className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
                onClick={() => setAbierto(null)}
              >
                <div
                  className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setAbierto(null)}
                    className="absolute top-2 right-3 text-gray-500 text-2xl leading-none hover:text-black"
                  >
                    &times;
                  </button>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={u.avatar || '/default-avatar.png'}
                      alt={u.nombre}
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div>
                      <h2 className="text-xl font-bold">{u.nombre}</h2>
                      <p className="text-sm text-gray-600">{u.ciudad}, {u.pais}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div><strong>Email:</strong> {u.email}</div>
                    <div><strong>Teléfono:</strong> {u.telefono}</div>
                    <div><strong>Perfil:</strong> {Array.isArray(u.perfil) ? u.perfil.join(', ') : u.perfil}</div>
                    {u.instrumento && <div><strong>Instrumento:</strong> {u.instrumento}</div>}
                    {u.nivel && <div><strong>Nivel:</strong> {u.nivel}</div>}
                  </div>

                  {u.telefono && (
                    <a
                      href={`https://wa.me/${u.telefono.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Contactar por WhatsApp
                    </a>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

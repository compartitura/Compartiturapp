// pages/admin/usuarios.js
import fs from 'fs';
import path from 'path';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'usuarios.json');
  const contenido = fs.readFileSync(filePath, 'utf8');
  const usuarios = JSON.parse(contenido);

  return { props: { usuarios } };
}

export default function UsuariosPage({ usuarios }) {
  return (
    <main className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Usuarios registrados</h1>
      <ul className="space-y-2">
        {usuarios.map(u => (
          <li key={u.id} className="border p-3 rounded">
            <p><strong>Nombre:</strong> {u.nombre}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Perfil:</strong> {Array.isArray(u.perfil) ? u.perfil.join(', ') : u.perfil}</p>
            <p><strong>Instrumento:</strong> {u.instrumento}</p>
            <p><strong>Nivel:</strong> {u.nivel}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

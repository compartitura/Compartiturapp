// pages/api/editar.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const nuevo = req.body;
  const filePath = path.join(process.cwd(), 'data', 'usuarios.json');

  let usuarios = [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    usuarios = JSON.parse(data);
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo leer la base de datos' });
  }

  const index = usuarios.findIndex(u => u.email === nuevo.email);
  if (index === -1) return res.status(404).json({ error: 'Usuario no encontrado' });

  usuarios[index] = { ...usuarios[index], ...nuevo };
  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));

  res.status(200).json({ message: 'Usuario actualizado correctamente' });
}

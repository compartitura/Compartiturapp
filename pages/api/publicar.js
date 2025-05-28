// pages/api/publicar.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const filePath = path.join(process.cwd(), 'public/data/used-products.json');
  const nuevo = req.body;

  try {
    const data = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];

    nuevo.id = 'u' + Date.now(); // genera ID único simple
    data.push(nuevo);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error al guardar:', err);
    return res.status(500).json({ error: 'Error al guardar' });
  }
}

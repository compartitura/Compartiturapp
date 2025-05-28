// pages/api/add-used-product.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { Brand, Model, Description, ImageURL, Price, Phone, Location } = req.body;

  if (!Brand || !Model || !Description || !Price || !ImageURL || !Phone || !Location) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const filePath = path.join(process.cwd(), 'public/data/used-products.json');
  let products = [];

  try {
    const file = fs.readFileSync(filePath, 'utf8');
    products = JSON.parse(file);
  } catch (err) {
    // si el archivo no existe, empieza con array vacío
    products = [];
  }

  const newProduct = {
    id: 'u' + Date.now(),
    Brand,
    Model,
    Description,
    ImageURL,
    Price,
    Phone,
    Location
  };

  products.unshift(newProduct);

  try {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
    return res.status(200).json({ success: true, product: newProduct });
  } catch (err) {
    return res.status(500).json({ error: 'Error al guardar el producto' });
  }
}

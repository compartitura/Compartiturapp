// pages/registro.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [telefono, setTelefono] = useState("");
  const [perfil, setPerfil] = useState([]);
  const [otroPerfil, setOtroPerfil] = useState("");
  const [instrumento, setInstrumento] = useState("");
  const [nivel, setNivel] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [origen, setOrigen] = useState("/");
  const [visible, setVisible] = useState(true);
  const [quierePremium, setQuierePremium] = useState(false);
  const [premiumTipo, setPremiumTipo] = useState("");
  const [premiumTiempo, setPremiumTiempo] = useState("");

  useEffect(() => {
    if (router.query.origen) {
      setOrigen(router.query.origen);
    }
  }, [router.query.origen]);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handlePerfilChange = (e) => {
    const value = e.target.value;
    setPerfil(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const perfilFinal = perfil.includes("Otro") ? [...perfil.filter(p => p !== "Otro"), otroPerfil] : perfil;

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre, email, password, ciudad, pais, telefono,
          perfil: perfilFinal, instrumento, nivel, avatar,
          visible,
          premium: quierePremium && premiumTipo && premiumTiempo ? { tipo: premiumTipo, tiempo: premiumTiempo } : null
        })
      });

      if (!res.ok) throw new Error("Error al registrar el usuario");

      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      router.push(origen);
    } catch (err) {
      alert("Hubo un error en el registro");
      console.error(err);
    }
  };

  const perfilesRelacionadosConInstrumento = ["Músico", "Director", "Profesor", "Estudiante"];
  const mostrarInstrumento = perfil.some(p => perfilesRelacionadosConInstrumento.includes(p));
  const mostrarNivel = perfil.some(p => ["Músico", "Estudiante", "Profesor"].includes(p));

  return (
    <main className="mt-28 max-w-sm mx-auto bg-white p-6 rounded shadow space-y-4">
      <h1 className="text-xl font-bold">Registro</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Nombre completo" className="w-full border px-3 py-2 rounded" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="email" placeholder="Correo electrónico" className="w-full border px-3 py-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" className="w-full border px-3 py-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Ciudad" className="w-full border px-3 py-2 rounded" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
        <input type="text" placeholder="País" className="w-full border px-3 py-2 rounded" value={pais} onChange={(e) => setPais(e.target.value)} />
        <input type="text" placeholder="Teléfono de contacto" className="w-full border px-3 py-2 rounded" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

        <fieldset className="border p-2 rounded">
          <legend className="text-sm font-semibold mb-1">Perfil profesional (marca los que apliquen)</legend>
          {["Músico", "Director", "Arreglista", "Compositor", "Profesor", "Estudiante", "Luthier", "Técnico de sonido", "Organizador de eventos", "Otro"].map(op => (
            <label key={op} className="block text-sm">
              <input
                type="checkbox"
                value={op}
                checked={perfil.includes(op)}
                onChange={handlePerfilChange}
                className="mr-2"
              />
              {op}
            </label>
          ))}
        </fieldset>

        {perfil.includes("Otro") && (
          <input type="text" placeholder="Especifica tu perfil" className="w-full border px-3 py-2 rounded" value={otroPerfil} onChange={(e) => setOtroPerfil(e.target.value)} />
        )}

        {mostrarInstrumento && (
          <input
            type="text"
            placeholder="Instrumento(s) principal(es). Ej: saxofón, trompeta..."
            className="w-full border px-3 py-2 rounded"
            value={instrumento}
            onChange={(e) => setInstrumento(e.target.value)}
          />
        )}

        {mostrarNivel && (
          <select className="w-full border px-3 py-2 rounded" value={nivel} onChange={(e) => setNivel(e.target.value)}>
            <option value="">Nivel de interpretación</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Profesional">Profesional</option>
          </select>
        )}

        <label className="block text-sm">
          <input type="checkbox" checked={!visible} onChange={e => setVisible(!e.target.checked)} className="mr-2" />
          No quiero aparecer en la búsqueda pública de profesionales
        </label>

        <label className="block text-sm">
          <input type="checkbox" checked={quierePremium} onChange={e => setQuierePremium(e.target.checked)} className="mr-2" />
          Me gustaría poder acceder al servidor de partituras de ensayo y grupos premium de la comunidad
        </label>

        {quierePremium && (
          <fieldset className="border p-2 rounded">
            <legend className="text-sm font-semibold mb-1">Tipo de suscripción premium</legend>
            <select className="w-full mb-2 px-3 py-2 border rounded" value={premiumTipo} onChange={e => setPremiumTipo(e.target.value)}>
              <option value="">Tipo de suscripción</option>
              <option value="Músico">Músico - 2,50€/mes o 14,80€/año</option>
              <option value="Director">Director - 4,00€/mes o 24,80€/año</option>
            </select>
            <select className="w-full px-3 py-2 border rounded" value={premiumTiempo} onChange={e => setPremiumTiempo(e.target.value)}>
              <option value="">Duración</option>
              <option value="Mensual">Mensual</option>
              <option value="Anual">Anual</option>
            </select>
          </fieldset>
        )}

        <input type="file" accept="image/*" className="w-full" onChange={handleAvatar} />
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Crear cuenta</button>
      </form>
    </main>
  );
}

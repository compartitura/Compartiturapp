// pages/login.js
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const { error } = router.query;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/cuenta" });
  };

  return (
    <main className="max-w-md mx-auto mt-24 p-6">
      <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        {error && (
          <p className="text-red-500 text-sm">{decodeURIComponent(error)}</p>
        )}

        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Entrar
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        ¿No tienes cuenta? <a href="/registro" className="text-blue-600 underline">Regístrate aquí</a>
      </p>
    </main>
  );
}

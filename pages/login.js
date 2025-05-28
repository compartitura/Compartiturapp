import { getProviders, signIn } from 'next-auth/react';

export default function Login({ providers }) {
  if (!providers || Object.keys(providers).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-gray-500">No hay proveedores de autenticación disponibles.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-8">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            onClick={() => signIn(provider.id)}
          >
            Entrar con {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const providers = await getProviders();
    return {
      props: { providers: providers || {} },
    };
  } catch (error) {
    console.error("Error al cargar proveedores de auth:", error);
    return {
      props: { providers: {} },
    };
  }
}

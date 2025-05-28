// pages/auth/signin.js
import { getProviders, signIn } from 'next-auth/react';

export default function SignIn({ providers }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
      {Object.values(providers).map(provider => (
        <div key={provider.name} className="mb-4">
          <button
            onClick={() => signIn(provider.id)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Acceder con {provider.name}
          </button>
        </div>
      ))}
    </main>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

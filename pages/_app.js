// pages/_app.js
import '../styles/globals.css';
import Layout from '../components/ui/Layout';
import { useEffect } from 'react';
import { autoLimpiarDatosLocalStorage } from '../utils/autoCleanup';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
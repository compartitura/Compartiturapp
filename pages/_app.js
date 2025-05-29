// pages/_app.js
import '../styles/globals.css';
import Layout from '../components/ui/Layout';
import { useEffect } from 'react';
import { autoLimpiarDatosLocalStorage } from '../utils/autoCleanup';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    autoLimpiarDatosLocalStorage();

    let deferredPrompt;
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;

      setTimeout(() => {
        if (window.confirm('¿Querés agregar esta app a tu pantalla de inicio?')) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
          });
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

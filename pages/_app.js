// pages/_app.js
import '../styles/globals.css';
import Layout from '../components/ui/Layout';
import { useEffect } from 'react';
import { autoLimpiarDatosLocalStorage } from '../utils/autoCleanup';

export default function App({ Component, pageProps }) {
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
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}


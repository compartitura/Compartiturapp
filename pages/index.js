import { useState } from 'react';

const grupos = [

  {
    nombre: 'Directores',
    tipo: 'direccion',
    suscripcion: 'director',
    descripcion: 'Grupo para directores musicales de cualquier nivel y especialidad.',
    imagen: 'https://www.compartitura.org/medias/images/file-000000006eb461f78bb239edf0db393c-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-140053b9-1f47-4562-86a3-f1948aff683d.png?fx=c_120_120',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Directores de Orquesta de cuerda',
    tipo: 'direccion',
    suscripcion: 'director',
    descripcion: 'Enfocado en la dirección de orquestas de cuerdas.',
    imagen: 'https://www.compartitura.org/medias/images/file-000000008a1461f7a731397b86ca1606-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-13d8df5a-49ce-4039-9b39-6c77b0229b84.png?fx=c_120_120',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Música cofrade, Semana Santa',
    tipo: 'estilo',
    suscripcion: 'musico',
    descripcion: 'Dedicado a la música procesional y religiosa tradicional.',
    imagen: '/grupos/cofrade.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Jazz, dixieland, charanga, quinteto',
    tipo: 'estilo',
    suscripcion: 'musico',
    descripcion: 'Para amantes e intérpretes de estos géneros vivos y dinámicos.',
    imagen: '/grupos/jazz-dixieland-charanga.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Bandas sonoras',
    tipo: 'estilo',
    suscripcion: 'musico',
    descripcion: 'Obras completas B.S.O.',
    imagen: '/grupos/cofrade.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Grupos corales',
    tipo: 'voz',
    suscripcion: 'musico',
    descripcion: 'Encuentro para coros y aficionados al canto coral.',
    imagen: '/grupos/coral.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Musicólogos e Historiadores',
    tipo: 'academico',
    suscripcion: 'registro',
    descripcion: 'Comunidad para quienes investigan la historia y teoría de la música.',
    imagen: '/grupos/musicologos.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Melómanos y Aficionados Cultos',
    tipo: 'aficionados',
    suscripcion: 'registro',
    descripcion: 'Para quienes disfrutan de la música desde una perspectiva apasionada y conocedora.',
    imagen: '/grupos/melomanos.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Arreglistas, Editores y Copistas',
    tipo: 'edicion',
    suscripcion: 'registro',
    descripcion: 'Grupo dedicado a la creación, edición y copia de partituras.',
    imagen: '/grupos/arreglistas.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Estudiantes de Dirección y Composición',
    tipo: 'educacion',
    suscripcion: 'registro',
    descripcion: 'Para estudiantes que se están formando como compositores o directores.',
    imagen: '/grupos/estudiantes.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Profesores/as y Mentores',
    tipo: 'educacion',
    suscripcion: 'registro',
    descripcion: 'Para educadores musicales que desean compartir recursos y experiencias.',
    imagen: '/grupos/profesores.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Ofertas de empleo',
    tipo: 'empleo',
    suscripcion: 'registro',
    descripcion: 'Convocatorias y oportunidades laborales para músicos.',
    imagen: '/grupos/empleo.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Compra Venta de Instrumentos',
    tipo: 'mercado',
    suscripcion: 'registro',
    descripcion: 'Espacio seguro para comprar y vender instrumentos musicales.',
    imagen: '/grupos/compra-venta-instrumentos.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Compra Venta de Partituras',
    tipo: 'mercado',
    suscripcion: 'registro',
    descripcion: 'Grupo para vender o conseguir partituras y arreglos de autoría propia.',
    imagen: '/grupos/compra-venta-partituras.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Productores y Organizadores',
    tipo: 'produccion',
    suscripcion: 'registro',
    descripcion: 'Intercambio de ideas entre quienes gestionan y producen eventos musicales.',
    imagen: '/grupos/productores.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Cantantes',
    tipo: 'voz',
    suscripcion: 'registro',
    descripcion: 'Espacio para intérpretes vocales, solistas o corales.',
    imagen: '/grupos/cantantes.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Acordeonistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Para intérpretes del acordeón de todos los estilos.',
    imagen: '/grupos/acordeonistas.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Bombardinistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Espacio para músicos que tocan el bombardino.',
    imagen: '/grupos/bombardino.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Clarinetistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Punto de encuentro para clarinetistas de todos los niveles.',
    imagen: '/grupos/clarinete.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Contrabajistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Red de contrabajistas de distintos géneros.',
    imagen: '/grupos/contrabajo.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Contrabajistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Red de contrabajistas de distintos géneros.',
    imagen: '/grupos/contrabajo.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Cornetistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Para quienes tocan la corneta en cualquier contexto.',
    imagen: '/grupos/corneta.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Dulzainistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Grupo dedicado a la dulzaina y su repertorio.',
    imagen: '/grupos/dulzaina.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Fagotistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Comunidad para intérpretes de fagot.',
    imagen: '/grupos/fagot.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Flautistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Para flautistas de todos los niveles y estilos.',
    imagen: '/grupos/flauta.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Flautistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Para flautistas de todos los niveles y estilos.',
    imagen: '/grupos/flauta.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Fliscornistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Enlace entre músicos que tocan el fliscorno.',
    imagen: '/grupos/fliscornistas.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Gaiteros',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Espacio para intérpretes de gaitas tradicionales.',
    imagen: '/grupos/gaita.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Guitarristas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Para guitarristas clásicos, acústicos y eléctricos.',
    imagen: '/grupos/guitarristas.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Instrumentistas Solistas y de Ensamble',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Red de apoyo e intercambio entre músicos solistas o de pequeños grupos.',
    imagen: '/grupos/solistas.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Oboistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Comunidad de músicos que tocan el oboe.',
    imagen: '/grupos/oboe.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Organistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Grupo para amantes del órgano clásico o moderno.',
    imagen: '/grupos/organo.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Percusionistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Para quienes tocan instrumentos de percusión.',
    imagen: '/grupos/percusion.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Pianistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Red de pianistas de distintos géneros y niveles.',
    imagen: '/grupos/piano.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Pianistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Red de pianistas de distintos géneros y niveles.',
    imagen: '/grupos/piano.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Saxofonistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Para músicos que tocan cualquier tipo de saxofón.',
    imagen: '/grupos/saxo.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Teclistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Grupo de intérpretes de teclado en todos sus formatos.',
    imagen: '/grupos/teclado.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Trombonistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Espacio de apoyo y recursos para trombonistas.',
    imagen: '/grupos/trombon.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Trompetistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Para trompetistas clásicos y modernos.',
    imagen: '/grupos/trompeta.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Trompistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Grupo dedicado a los intérpretes de trompa.',
    imagen: '/grupos/trompistas.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Tubistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Comunidad de músicos que tocan la tuba.',
    imagen: '/grupos/tuba.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Violinistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Espacio para violinistas de todos los estilos.',
    imagen: '/grupos/violin.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Violistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Grupo para músicos que tocan la viola.',
    imagen: '/grupos/viola.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  },
  {
    nombre: 'Violonchelistas',
    tipo: 'instrumento',
    suscripcion: 'registro',
    descripcion: 'Comunidad de intérpretes de violonchelo.',
    imagen: '/grupos/chelo.png',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: '#',
    }
  }
];

export default function GruposComunidad() {
  const [activo, setActivo] = useState(null);
  const [filtro, setFiltro] = useState('registro');

  const filtrados = grupos.filter(g =>
    filtro === 'registro' ? true : g.suscripcion === filtro
  );

  return (
    <main className="pt-28 px-4 max-w-5xl mx-auto space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Grupos de la comunidad</h2>

        <div className="flex gap-2 mb-6">
          <button className={`px-3 py-1 rounded ${filtro==='registro'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('registro')}>Solo registro</button>
          <button className={`px-3 py-1 rounded ${filtro==='musico'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('musico')}>Modo Músico 🎖</button>
          <button className={`px-3 py-1 rounded ${filtro==='director'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('director')}>Modo Director 🎖</button>
        </div>

        <div className="flex flex-col gap-4">
          {filtrados.map((g, i) => (
            <div
              key={i}
              onClick={() => setActivo(g)}
              className="border p-3 rounded cursor-pointer hover:shadow flex items-center gap-4 relative"
            >
              <img src={g.imagen} alt={g.nombre} className="w-12 h-12 rounded-full object-contain" />
              <div>
                <p className="text-sm font-medium leading-tight">{g.nombre}</p>
                <p className="text-xs text-gray-500">{g.descripcion}</p>
              </div>
              {(g.suscripcion === 'director' || g.suscripcion === 'musico') && (
                <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 rounded">🎖 Premium</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {activo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative text-center">
            <button
              onClick={() => setActivo(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >✕</button>
            <img src={activo.imagen} alt={activo.nombre} className="w-24 h-24 mx-auto mb-4 rounded-full object-contain" />
            <h3 className="text-lg font-bold mb-2">{activo.nombre}</h3>
            <p className="text-sm text-gray-600 mb-4">{activo.descripcion}</p>
            <div className="space-y-2">
              <a href={activo.enlaces?.whatsapp || '#'} className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Acceso al grupo</a>
              <div className="relative">
                <a href={activo.enlaces?.partituras || '#'} className="block bg-gray-800 text-white py-2 px-4 rounded hover:bg-black">Partituras, métodos y otros archivos</a>
                <span className="absolute top-1 right-2 text-xs bg-yellow-400 text-black px-2 rounded">Premium</span>
              </div>
              <a href={activo.enlaces?.tienda || '#'} className="block bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300">Tienda de instrumentos</a>
              <a href={activo.enlaces?.profesionales || '#'} className="block bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300">Buscar profesionales</a>
              <a href={activo.enlaces?.empleo || '#'} className="block bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300">Ofertas de empleo</a>
              <a href={activo.enlaces?.premium || '#'} className="block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Activar premium</a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
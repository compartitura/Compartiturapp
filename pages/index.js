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
    imagen: 'https://www.compartitura.org/medias/images/file-0000000045a861f7b6cd57eb6eaeef37-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-cd766616-153e-4d85-ad33-43224a55bbd9.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-00000000bd0461f7b5cd22c5f9120b4f-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-3be555c3-dcfa-4533-a468-f4507bed2ece.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-00000000bfec61f7aa5b70540f07a10a-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-bed0e75e-1259-48e4-987f-fd9a28403a9c.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-00000000a2a461f7a2a42f1c49ea14ee-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-88596a86-4174-4538-9759-29e4d136ee27.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-00000000038c61f7b784534b1611c72e-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-3abf82ec-40a1-429e-b7d8-5e9c44f267e5.png?fx=c_120_120',
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
    nombre: 'Interpretes Solistas y de Ensamble',
    tipo: 'voz',
    suscripcion: 'registro',
    descripcion: 'Red de apoyo e intercambio entre músicos solistas o de pequeños grupos.',
    imagen: 'https://www.compartitura.org/medias/images/file-0000000024f861f7a65e0f87f503423f-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-3c399cef-e107-4978-b53e-4316286d0845.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-00000000e04c61f797eca08f30dac664-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-e190bd1e-b521-44ca-955e-38c3df21f818.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-00000000bacc61f796e2b7e39c4ce54f-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-9ad0a02c-e7b4-4795-8b9a-fd62e9eabb31.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-00000000c08861f7a3c1ca90317385ef-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-5b0fcb94-0fb7-4717-a6fe-5027953f63d0.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-0000000081fc61f7ae86861430255045-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-8152145e-e902-4167-94d4-48d49af8f6b5.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-00000000fecc61f78681106ea5fb64dc-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-49789d06-ceea-49ad-bd8e-97c2eb2f259b.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-0000000006d061f7a1cd44a94cff4bce-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-fa26ad54-eec0-4251-b7d8-ac6f9fcb762d.png?fx=c_120_120',
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
    nombre: 'Técnicos, luthiers y afinadores',
    tipo: 'Reparacion',
    suscripcion: 'registro',
    descripcion: 'Destinado a técnicos de sonido, constructores y afinadores de instrumentos.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000934461f7998a0858b752fae5-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-314b101f-6e22-49e2-858c-8d59ce1d71f6.png?fx=c_120_120',
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
    imagen: 'https://www.compartitura.org/medias/images/file-0000000019ac61f7afcf7c45a3f21a14-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-c16f37cd-68f0-467b-81e5-8dbb9fb6fb5d.png?fx=c_120_120',
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
  const [filtro, setFiltro] = useState('todos');

  const filtrados = grupos.filter(g =>
    filtro === 'todos' ? true : g.suscripcion === filtro
  );

  return (
    <main className="pt-[130px] px-4 max-w-5xl mx-auto space-y-12">
      <section>
        <h1 className="text-1xl font-semibold mb-2">Grupos de la comunidad de Compartitura</h1>

        <div className="flex gap-2 mb-6">
          <button className={`px-3 py-1 rounded ${filtro==='todos'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('todos')}>Todos</button>
          <button className={`px-3 py-1 rounded ${filtro==='registro'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('registro')}>Registrados</button>
          <button className={`px-3 py-1 rounded ${filtro==='musico'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('musico')}>Músicos 🎖 </button>
          <button className={`px-3 py-1 rounded ${filtro==='director'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('director')}>Directores 🎖 </button>
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
                <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 rounded"> 🎖 </span>
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
                <a href={activo.enlaces?.partituras || '#'} className="block bg-gray-800 text-white py-2 px-4 rounded hover:bg-black">Partituras y métodos</a>
                <span className="absolute top-1 right-2 text-xs bg-yellow-400 text-black px-2 rounded"> 🎖 </span>
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
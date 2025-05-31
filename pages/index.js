import { useState } from 'react';

const grupos = [

  {
    nombre: 'Directores',
    tipo: 'direccion',
    suscripcion: 'director',
    descripcion: 'Grupo para directores musicales de cualquier nivel y especialidad.',
    imagen: 'https://www.compartitura.org/medias/images/file-000000006eb461f78bb239edf0db393c-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-140053b9-1f47-4562-86a3-f1948aff683d.png?fx=c_120_120',
    enlaces: {
      whatsapp: 'https://chat.whatsapp.com/Lgpod68aDdfFxMaop6kHjw',
      partituras: 'https://compartitura.synology.me:5001/d/f/nwgURWWvnoQsvHDtKKYrssnnieKYJph2',
      tienda: 'http://localhost:3000/categories/Accessories/Music%20Batons%20and%20Accessories',
      profesionales: '#',
      empleo: '#',
      premium: 'https://form.jotform.com/COMPARTITURA/formulario-de-acceso-al-servidor',
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
      tienda: 'http://localhost:3000/categories/Accessories/Music%20Batons%20and%20Accessories',
      profesionales: '#',
      empleo: '#',
      premium: 'https://form.jotform.com/COMPARTITURA/formulario-de-acceso-al-servidor',
    }
  },
  {
    nombre: 'Música cofrade, Semana Santa',
    tipo: 'estilo',
        suscripcion: ['musico', 'director'],
    descripcion: 'Dedicado a la música procesional y religiosa tradicional.',
    imagen: 'https://www.compartitura.org/medias/images/file-0000000045a861f7b6cd57eb6eaeef37-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-cd766616-153e-4d85-ad33-43224a55bbd9.png?fx=c_120_120',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: 'https://form.jotform.com/COMPARTITURA/formulario-de-acceso-al-servidor',
    }
  },
  {
    nombre: 'Jazz, dixieland, charanga, quinteto',
    tipo: 'estilo',
        suscripcion: ['musico', 'director'],
    descripcion: 'Para amantes e intérpretes de estos géneros vivos y dinámicos.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000bd0461f7b5cd22c5f9120b4f-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-3be555c3-dcfa-4533-a468-f4507bed2ece.png?fx=c_120_120',
    enlaces: {
      whatsapp: '#',
      partituras: '#',
      tienda: '#',
      profesionales: '#',
      empleo: '#',
      premium: 'https://form.jotform.com/COMPARTITURA/formulario-de-acceso-al-servidor',
    }
  },
  {
    nombre: 'Bandas sonoras',
    tipo: 'estilo',
        suscripcion: ['musico', 'director'],
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
    suscripcion: ['musico', 'director'],
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
    nombre: 'Interpretes Solistas y de Ensamble',
    tipo: 'voz',
    suscripcion: ['registro', 'musico', 'director'],
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
    suscripcion: ['registro', 'musico', 'director'],
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
    suscripcion: ['registro', 'musico', 'director'],
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
    suscripcion: ['registro', 'musico', 'director'],
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
    suscripcion: ['registro', 'musico', 'director'],
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
    suscripcion: ['registro', 'musico', 'director'],
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
    suscripcion: ['registro', 'musico', 'director'],
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Destinado a técnicos de sonido, constructores y afinadores de instrumentos.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000934461f7998a0858b752fae5-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-314b101f-6e22-49e2-858c-8d59ce1d71f6.png?fx=c_120_120',
    enlaces: {
      whatsapp: 'https://chat.whatsapp.com/BK6HNaJ7D6H6IuXqS5P1TG',
      partituras: '#',
      tienda: 'http://localhost:3000/categories/Accessories/Multitools',
      profesionales: '#',
      empleo: '#',
      premium: 'https://form.jotform.com/COMPARTITURA/formulario-de-acceso-al-servidor',
    }
  },
  {
    nombre: 'Cantantes',
    tipo: 'voz',
    suscripcion: ['registro', 'musico', 'director'],
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
    nombre: 'Ofertas de empleo',
    tipo: 'empleo',
    suscripcion: ['registro', 'musico', 'director'],
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Espacio seguro para comprar y vender instrumentos musicales.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000954461f7ada9e41854d01b0f-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-4b479456-d30d-424b-b6b7-d2225f5cf768.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Grupo para vender o conseguir partituras y arreglos de autoría propia.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000782861f7afdacb72ddec711b-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-a72f790e-1d9a-4c73-ad4b-aafbba9f81c7.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Para intérpretes del acordeón de todos los estilos.',
    imagen: 'https://www.compartitura.org/medias/images/file-0000000008a461f7aab0a22d96ec2b10-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-661bcbde-e3f7-4754-bbea-59a4a5ae8381.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Espacio para músicos que tocan el bombardino.',
    imagen: 'https://www.compartitura.org/medias/images/file-0000000008d061f7855bbb2a85c47c39-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-c9b2195f-0ecc-413d-b37c-36f29f9387bc.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Punto de encuentro para clarinetistas de todos los niveles.',
    imagen: 'https://www.compartitura.org/medias/images/file-000000005d4461f79b8865aaa23649ce-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-eede03fe-ba65-4610-8340-72e9b674c5a9.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Red de contrabajistas de distintos géneros.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000bb5061f7a02e96fd553777bd-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-882df1ab-5f51-44e7-bdf8-49670315ee0b.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Para quienes tocan la corneta en cualquier contexto.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000551061f78ac5d1aad94d677c-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-edd55d49-1ea2-4d92-a623-388ac8f0cfc9.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Grupo dedicado a la dulzaina y su repertorio.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000f9d061f7a27fa00362e47c1c-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-d7f2fdfb-2a59-4d83-842d-8d28c148723f.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Comunidad para intérpretes de fagot.',
    imagen: 'https://www.compartitura.org/medias/images/file-0000000088d461f7a82f1ae979ccfd9f-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-e7d7109d-ede6-4b20-ab44-3c85a0d9b3f6-1-.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Para flautistas de todos los niveles y estilos.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000417861f796f4338f36fef82c-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-08b1e6be-51fe-4cee-b739-42b0c866f62a.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Enlace entre músicos que tocan el fliscorno.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000664461f79f3ab614eed30e33-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-2191f519-be34-4c65-be67-363869278644.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Espacio para intérpretes de gaitas tradicionales.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000f00c61f7bf52a44e62c39f0f-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-d8ee2210-c7d6-4ac1-9c0b-9e73b3650823.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Para guitarristas clásicos, acústicos y eléctricos.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000e72861f7a894057dc724f828-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-7c66da2c-41f7-4ede-9356-a211067caed5.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Comunidad de músicos que tocan el oboe.',
    imagen: 'https://www.compartitura.org/medias/images/file-0000000054ec61f7b96502c5c38ba0cd-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-eb377d93-66b3-4640-a52d-b86e2fab0d87.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Grupo para amantes del órgano clásico o moderno.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000732061f7babad3cd54bebaa6-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-b83dcdc4-50a2-44fc-b2a4-d4e08fc49505.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Para quienes tocan instrumentos de percusión.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000f0f461f788a8ea25e3552e46-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-be4096f7-d112-45db-ab90-e023a1bc7772.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Red de pianistas de distintos géneros y niveles.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000adbc61f7ba3650ac1a770ecb-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-050aa2ed-7012-4623-8c40-d75607e759c4.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Para músicos que tocan cualquier tipo de saxofón.',
    imagen: 'https://www.compartitura.org/medias/images/file-0000000031cc61f7ba55b4323d7f8561-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-8fd230a2-f4a6-4303-8e8e-a5c9731aaeaf.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Grupo de intérpretes de teclado en todos sus formatos.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000253461f7a6e2609ef9119648-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-a6d31429-2afc-46f9-8e0f-3f8c39b5f0d0.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Espacio de apoyo y recursos para trombonistas.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000e8e061f7b69e124655988ddf-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-e038af78-05fc-43dc-9985-4535e2f8d41d.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Para trompetistas clásicos y modernos.',
    imagen: 'https://www.compartitura.org/medias/images/file-0000000029dc61f7bdf63a1c3d50de5b-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-68ecc33c-20db-4625-9a2e-9f5690249712.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Grupo dedicado a los intérpretes de trompa.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000100461f7b3e829d4cd29d43d-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-f39d53b5-07ed-45b8-bbd2-ef52f308db1b.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Comunidad de músicos que tocan la tuba.',
    imagen: 'https://www.compartitura.org/medias/images/file-000000003c0061f78a4402c9a0eac5c0-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-5f6a7e8f-889a-4820-83f8-163117d109d4.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Espacio para violinistas de todos los estilos.',
    imagen: 'https://www.compartitura.org/medias/images/file-0000000046cc61f791be06cb609ded0f-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-19231407-8b7c-49fd-a2e3-64f5c3229017.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Grupo para músicos que tocan la viola.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000010061f7b4a69244431c079f-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-f96f74d9-686e-4fbb-a079-f39f9bf7590b.png?fx=c_120_120',
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
    suscripcion: ['registro', 'musico', 'director'],
    descripcion: 'Comunidad de intérpretes de violonchelo.',
    imagen: 'https://www.compartitura.org/medias/images/file-00000000abdc61f79a460afe9ebdc936-conversation-id-67f8217f-8cb0-8012-9be8-6a7105cfb041-message-id-5bfb4967-f8c4-43ed-846d-0ad8e0880023.png?fx=c_120_120',
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
  filtro === 'todos'
    ? true
    : Array.isArray(g.suscripcion)
      ? g.suscripcion.includes(filtro)
      : g.suscripcion === filtro
);

  return (
    <main className="pt-[130px] px-4 max-w-5xl mx-auto space-y-12">
      <section>
        <h1 className="text-1xl font-semibold mb-2">Grupos de la comunidad de Compartitura</h1>

        <div className="flex gap-2 mb-6">
          <button className={`px-3 py-1 rounded ${filtro==='todos'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('todos')}>☰</button>
          <button className={`px-3 py-1 rounded ${filtro==='registro'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('registro')}>Registrados 👤</button>
          <button className={`px-3 py-1 rounded ${filtro==='musico'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('musico')}>Músicos ⭐</button>
          <button className={`px-3 py-1 rounded ${filtro==='director'?'bg-black text-white':'bg-gray-200'}`} onClick={() => setFiltro('director')}>Directores ⭐⭐</button>
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
{(() => {
  if (Array.isArray(g.suscripcion)) {
    const s = g.suscripcion;
    if (s.includes('musico') && s.includes('director') && s.includes('registro')) {
      return <span className="absolute top-2 right-2 text-xs bg-green-400 text-black px-2 rounded">👤</span>;
    }
    if (s.includes('musico') && s.includes('director')) {
      return <span className="absolute top-2 right-2 text-xs bg-blue-400 text-black px-2 rounded">⭐</span>;
    }
  } else if (g.suscripcion === 'director') {
    return <span className="absolute top-2 right-2 text-xs bg-red-400 text-black px-2 rounded">⭐⭐</span>;
  }
  return null;
})()}

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
                <span className="absolute top-1 right-2 text-xs bg-blue-400 text-white px-2 rounded">Premium</span>
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
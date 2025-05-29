import { useState } from 'react';

const grupos = [
  {
    nombre: 'Tubistas en Compartitura',
    descripcion: 'Espacio para compartir técnicas, partituras y experiencias entre tubistas.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-3c00-61f7-8a44-02c9a0eac5c0/raw?se=2025-05-30T00%3A03%3A13Z&sp=r&sv=2024-08-04&sr=b&scid=4662b59c-ca5e-5098-999a-68522082d6ed&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T19%3A21%3A55Z&ske=2025-05-30T19%3A21%3A55Z&sks=b&skv=2024-08-04&sig=nUfRYG8A19I3L7gyjvkwMVFXRqcfGOWEE/El6I7pwWI%3D',
    enlacePartituras: '/partituras/tuba',
    enlaceWhatsApp: 'https://wa.me/34600000001',
  },
  {
    nombre: 'Acordeonistas en Compartitura',
    descripcion: 'Comparte partituras y conecta con acordeonistas de todos los estilos.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-08a4-61f7-aab0-a22d96ec2b10/raw?se=2025-05-30T00%3A03%3A10Z&sp=r&sv=2024-08-04&sr=b&scid=b48e58c7-07d8-585f-8f5f-e298fca4fc19&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T19%3A21%3A49Z&ske=2025-05-30T19%3A21%3A49Z&sks=b&skv=2024-08-04&sig=yUeik3gqaYaH8aS5sMeoJRpDEysQOzMM%2B23x/hjHkYU%3D',
    enlacePartituras: '/partituras/acordeon',
    enlaceWhatsApp: 'https://wa.me/34600000002',
  },
  {
    nombre: 'Saxofonistas en Compartitura',
    descripcion: 'Comunidad de saxofonistas con interés en jazz, clásico y moderno.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-31cc-61f7-ba55-b4323d7f8561/raw?se=2025-05-30T00%3A03%3A26Z&sp=r&sv=2024-08-04&sr=b&scid=a8536b20-5496-5339-af9b-57157b28d2ab&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T19%3A21%3A59Z&ske=2025-05-30T19%3A21%3A59Z&sks=b&skv=2024-08-04&sig=Vxmfk6u%2BAO2vyRUOkk7Cq11zayaq5DDgiywTsoP4KpU%3D',
    enlacePartituras: '/partituras/saxo',
    enlaceWhatsApp: 'https://wa.me/34600000003',
  },
  {
    nombre: 'Percusionistas en Compartitura',
    descripcion: 'Red de percusionistas para compartir material y oportunidades.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-f0f4-61f7-88a8-ea25e3552e46/raw?se=2025-05-30T00%3A03%3A19Z&sp=r&sv=2024-08-04&sr=b&scid=e3df2dab-2ec9-5fcf-81f3-2533f4a0c3d9&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T08%3A15%3A23Z&ske=2025-05-30T08%3A15%3A23Z&sks=b&skv=2024-08-04&sig=GrSk4LCViRXsDIYD5bWmL7241HRF6yebmrQ3Ie2t4fY%3D',
    enlacePartituras: '/partituras/percusiones',
    enlaceWhatsApp: 'https://wa.me/34600000004',
  },
  {
    nombre: 'Trompetistas en Compartitura',
    descripcion: 'Grupo activo para trompetistas con foco en aprendizaje y difusión.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-e448-61f7-b7df-8c00b35c1dca/raw?se=2025-05-30T00%3A03%3A25Z&sp=r&sv=2024-08-04&sr=b&scid=7c46b0f2-32d1-5c89-8ab0-1c8eceeae4ed&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T08%3A15%3A31Z&ske=2025-05-30T08%3A15%3A31Z&sks=b&skv=2024-08-04&sig=L%2B4yIomqIwzQFkGOMdfj0pnU9%2BKdc7ISTjKeiZcD9n4%3D',
    enlacePartituras: '/partituras/trompeta',
    enlaceWhatsApp: 'https://wa.me/34600000005',
  },
  {
    nombre: 'Clarinetistas en Compartitura',
    descripcion: 'Para clarinetistas clásicos y modernos. Comparte repertorio y ejercicios.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-a5e0-61f7-972a-1ba989c25d51/raw?se=2025-05-30T00%3A03%3A25Z&sp=r&sv=2024-08-04&sr=b&scid=81d4c2ca-fd93-542c-a0e3-32459525d893&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T07%3A02%3A03Z&ske=2025-05-30T07%3A02%3A03Z&sks=b&skv=2024-08-04&sig=sH7I9i51PHd03tm8MuhiMJq74q2D8e2O7EqUE3LBBtg%3D',
    enlacePartituras: '/partituras/clarinete',
    enlaceWhatsApp: 'https://wa.me/34600000006',
  },
  {
    nombre: 'Trompistas en Compartitura',
    descripcion: 'Compartí recursos para trompa, encuentros y actividades.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-1004-61f7-b3e8-29d4cd29d43d/raw?se=2025-05-30T00%3A03%3A19Z&sp=r&sv=2024-08-04&sr=b&scid=9b5f90bb-2a54-5551-a8ad-6d0e9686e77b&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T06%3A12%3A54Z&ske=2025-05-30T06%3A12%3A54Z&sks=b&skv=2024-08-04&sig=jmDmJ7GwbvweoK/oEEPxzOqjZANsbFKpouRidebgu6A%3D',
    enlacePartituras: '/partituras/trompa',
    enlaceWhatsApp: 'https://wa.me/34600000007',
  },
  {
    nombre: 'Flautistas en Compartitura',
    descripcion: 'Reúne a flautistas para aprender, tocar juntos y compartir partituras.',
    imagen: '/grupos/flauta.png',
    enlacePartituras: '/partituras/flauta',
    enlaceWhatsApp: 'https://wa.me/34600000008',
  },
  {
    nombre: 'Trombonistas en Compartitura',
    descripcion: 'Comunidad para trombonistas en formación y profesionales.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-e8e0-61f7-b69e-124655988ddf/raw?se=2025-05-30T00%3A03%3A25Z&sp=r&sv=2024-08-04&sr=b&scid=a6c41596-620c-5542-9014-34751f28e0da&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T06%3A12%3A48Z&ske=2025-05-30T06%3A12%3A48Z&sks=b&skv=2024-08-04&sig=%2BRz5xxrGE6Bq2P5ADHFoE6gjQqBamWTFEOz8b3BEWoI%3D',
    enlacePartituras: '/partituras/trombon',
    enlaceWhatsApp: 'https://wa.me/34600000009',
  },
  {
    nombre: 'Directores de Orquesta',
    descripcion: 'Grupo especializado en dirección orquestal, con foco en partituras y técnica.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-8a14-61f7-a731-397b86ca1606/raw?se=2025-05-30T00%3A03%3A29Z&sp=r&sv=2024-08-04&sr=b&scid=390f15f6-1564-508f-bc85-42aa46aed2a3&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T05%3A43%3A55Z&ske=2025-05-30T05%3A43%3A55Z&sks=b&skv=2024-08-04&sig=w0iFi1%2Bdk6w1%2BPXaIyzrP4DQERmNA85bz/Ln0CpzVUY%3D',
    enlacePartituras: '/partituras/direccion',
    enlaceWhatsApp: 'https://wa.me/34600000010',
  },
  {
    nombre: 'Pianistas en Compartitura',
    descripcion: 'Zona para pianistas de todos los estilos y niveles. Clásico, jazz y moderno.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-adbc-61f7-ba36-50ac1a770ecb/raw?se=2025-05-30T00%3A03%3A13Z&sp=r&sv=2024-08-04&sr=b&scid=83f36892-c848-5749-b84e-0271c139b3e2&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T19%3A21%3A37Z&ske=2025-05-30T19%3A21%3A37Z&sks=b&skv=2024-08-04&sig=/copg1HlZVr2V7hiMNA2Y6CFki2/uXN2OWsOK2y6dk0%3D',
    enlacePartituras: '/partituras/piano',
    enlaceWhatsApp: 'https://wa.me/34600000011',
  },
  {
    nombre: 'Profesores/as y Mentores',
    descripcion: 'Comparte materiales, experiencias docentes y oportunidades educativas.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-fecc-61f7-8681-106ea5fb64dc/raw?se=2025-05-30T00%3A02%3A31Z&sp=r&sv=2024-08-04&sr=b&scid=60a3e880-f551-5822-aa10-5dfac8d88c1b&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T19%3A21%3A48Z&ske=2025-05-30T19%3A21%3A48Z&sks=b&skv=2024-08-04&sig=X2HgQkUjKi71%2BplfIzPbqQhw2BJ8FuyW1LGiRjx4uvY%3D',
    enlacePartituras: '/partituras/profesores',
    enlaceWhatsApp: 'https://wa.me/34600000012',
  },
  {
    nombre: 'Organistas en Compartitura',
    descripcion: 'Grupo para organistas litúrgicos y de concierto, repertorio y técnica.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-7320-61f7-baba-d3cd54bebaa6/raw?se=2025-05-30T00%3A03%3A06Z&sp=r&sv=2024-08-04&sr=b&scid=728c1f18-6df0-5c23-89de-6b62d232607f&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T07%3A02%3A03Z&ske=2025-05-30T07%3A02%3A03Z&sks=b&skv=2024-08-04&sig=VwniHzP8RLfDiuGvseC3IcRjFRmkW%2BegPjZyu3kWldE%3D',
    enlacePartituras: '/partituras/organo',
    enlaceWhatsApp: 'https://wa.me/34600000013',
  },
  {
    nombre: 'Cantantes en Compartitura',
    descripcion: 'Grupo abierto a cantantes líricos, corales y modernos.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-038c-61f7-b784-534b1611c72e/raw?se=2025-05-30T00%3A03%3A19Z&sp=r&sv=2024-08-04&sr=b&scid=bcd2222f-fe4f-5820-bead-10402c5c0fcf&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T02%3A32%3A56Z&ske=2025-05-30T02%3A32%3A56Z&sks=b&skv=2024-08-04&sig=mEU8DfzUqgiuN1ShRzeH6WCF73wLzs6Sh7/lv4TaH0k%3D',
    enlacePartituras: '/partituras/canto',
    enlaceWhatsApp: 'https://wa.me/34600000014',
  },
  {
    nombre: 'Violinistas en Compartitura',
    descripcion: 'Comparte partituras, ensambles y oportunidades para violinistas.',
    imagen: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-46cc-61f7-91be-06cb609ded0f/raw?se=2025-05-30T00%3A03%3A25Z&sp=r&sv=2024-08-04&sr=b&scid=fbbe614a-52cb-5025-bce6-358905a3653a&skoid=eb780365-537d-4279-a878-cae64e33aa9c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T06%3A12%3A47Z&ske=2025-05-30T06%3A12%3A47Z&sks=b&skv=2024-08-04&sig=FMcvfdCD%2BcbYrDKeMgGm/kU6Ud7MLNh6tiPI6djcml4%3D',
    enlacePartituras: '/partituras/violin',
    enlaceWhatsApp: 'https://wa.me/34600000015',
  },
];

export default function GruposComunidad() {
  const [activo, setActivo] = useState(null);

  return (
    <main className="pt-28 px-4 max-w-5xl mx-auto space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Grupos de la comunidad</h2>
        <div className="flex flex-col gap-4">
          {grupos.map((g, i) => (
            <div
              key={i}
              onClick={() => setActivo(g)}
              className="border p-3 rounded cursor-pointer hover:shadow flex items-center gap-4"
            >
              <img src={g.imagen} alt={g.nombre} className="w-12 h-12 rounded-full object-contain" />
              <div>
                <p className="text-sm font-medium leading-tight">{g.nombre}</p>
                <p className="text-xs text-gray-500">{g.descripcion}</p>
              </div>
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
              <a
                href={activo.enlacePartituras}
                className="block bg-gray-800 text-white py-2 px-4 rounded hover:bg-black"
              >Ver partituras</a>
              <a
                href={activo.enlaceWhatsApp}
                className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                target="_blank"
              >Unirse al grupo</a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

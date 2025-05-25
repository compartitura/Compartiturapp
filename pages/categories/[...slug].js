// pages/categories/[...slug].js
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FilterSidebar from '../../components/ui/FilterSidebar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { translateCategory } from '../../utils/translations';

export async function getServerSideProps({ params, query }) {
  const all = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'products.json'), 'utf-8')
  );
  const slugArr = params.slug || [];
  const prefix = slugArr.join(' > ').toLowerCase();
  const inCategory = all.filter(p =>
    (p.CategoryTree || '').toLowerCase().startsWith(prefix)
  );

  const subs = Array.from(
    new Set(
      inCategory
        .map(p => {
          const levels = (p.CategoryTree || '').split('>').map(s => s.trim());
          return levels[slugArr.length];
        })
        .filter(Boolean)
    )
  ).sort();

  const FAVORITE_SUBCATEGORIES = [
    'Saxofones','Trompetas','Clarinetes','Fliscornos','Trompas','Trombones','Trompas tenor','Barítonos','Trompa alto/barítono','Bombardinos','Tubas','Oboes','Fagots','Flautas traveseras','Flautas de pico'
  ];

  const sortedSubs = [
    ...FAVORITE_SUBCATEGORIES.filter(s => subs.includes(s)),
    ...subs.filter(s => !FAVORITE_SUBCATEGORIES.includes(s))
  ];

  const subItems = sortedSubs.map(sub => {
    const prod = inCategory.find(p => {
      const levels = (p.CategoryTree || '').split('>').map(s => s.trim());
      return levels[slugArr.length] === sub;
    });
    return {
      name: sub,
      slug: encodeURIComponent(sub),
      imageURL: prod?.ImageURL || '/logo-compartitura3.png'
    };
  });

  let filterDefs = [], filterQuery = {}, slice = [], page = 1, totalPages = 1;
  if (subItems.length === 0) {
    const brands = Array.from(new Set(inCategory.map(p => p.Brand))).sort();
    if (query.brand) {
      filterQuery.brand = Array.isArray(query.brand)
        ? query.brand
        : [query.brand];
    }
    let filtered = inCategory;
    if (filterQuery.brand) {
      filtered = filtered.filter(p =>
        filterQuery.brand.includes(p.Brand)
      );
    }
    page = parseInt(query.page || '1', 10);
    const perPage = 20;
    totalPages = Math.ceil(filtered.length / perPage);
    slice = filtered.slice((page - 1) * perPage, page * perPage);
    filterDefs = [{ name: 'Marcas', key: 'brand', options: brands }];
  }

  return { props: { slug: slugArr, subItems, filterDefs, filterQuery, slice, page, totalPages } };
}

export default function Categoria({ slug, subItems, filterDefs, filterQuery, slice, page, totalPages }) {
  const router = useRouter();
  const cambiarPagina = n => router.push({ pathname: router.asPath.split('?')[0], query: { ...router.query, page: n } });

  return (
    <div className="bg-white w-full mx-auto p-6 pt-28">
      <nav className="text-sm mb-4">
        <Link href="/" legacyBehavior>
          <a className={slug.length === 0 ? 'font-semibold text-primary' : 'hover:underline'}>{translateCategory('Inicio')}</a>
        </Link>
        {slug.map((parte, i) => {
          const rutaSlug = slug.slice(0, i + 1).map(encodeURIComponent).join('/');
          return (
            <span key={i}>
              {' › '}
              <Link href={`/categories/${rutaSlug}?page=1`} legacyBehavior>
                <a className={i === slug.length - 1 ? 'font-semibold text-primary' : 'hover:underline'}>
                  {translateCategory(parte)}
                </a>
              </Link>
            </span>
          );
        })}
      </nav>

 {subItems.length > 0 ? (
  <div className="flex flex-col gap-4">
    {subItems.map(item => (
      <Link key={item.name} href={`/categories/${[...slug, item.slug].join('/')}?page=1`} legacyBehavior>
        <a className="flex items-center gap-4 bg-white p-4 rounded-lg shadow hover:-translate-y-1 transition-transform">
          <img
            src={item.imageURL || '/logo-compartitura3.png'}
            alt={item.name}
            className="w-[70px] h-[70px] object-contain bg-white rounded"
            onError={e => e.currentTarget.src = '/logo-compartitura3.png'}
          />
          <span className="text-base font-semibold text-gray-800">{translateCategory(item.name)}</span>
        </a>
      </Link>
    ))}
  </div>
) : (

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-1/4">
            <FilterSidebar filterDefs={filterDefs} filterQuery={filterQuery} />
          </aside>
          <div className="flex-grow space-y-6">
            <div className="flex flex-col gap-6">
              {slice.map(product => <Card key={product.ArticleNumber} product={product} />)}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Button onClick={() => cambiarPagina(page - 1)} variant="outline" disabled={page <= 1}>← Anterior</Button>
              <span className="text-sm">Página {page} de {totalPages}</span>
              <Button onClick={() => cambiarPagina(page + 1)} variant="outline" disabled={page >= totalPages}>Siguiente →</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { products } from '../../lib/products'
import ProductCard from '../../components/ProductCard'

export default function CatalogPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Catálogo de espejos</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      <p className="mt-8 text-sm text-slate-600">
        ¿Necesitas otra medida/forma? Escríbenos por WhatsApp y lo fabricamos a tu gusto.
      </p>
    </section>
  )
}
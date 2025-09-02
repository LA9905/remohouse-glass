import { products } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

export default function LedPage() {
  const items = products.filter(p => p.tags?.includes('led'))
  return (
    <main className="container-page py-8 space-y-4">
      <h1 className="section-title">Irregulares</h1>
      <ProductGrid items={items} />
    </main>
  )
}
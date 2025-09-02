'use client'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'
import type { Product } from '@/lib/types'

export default function MaderaPage() {
  const list = products.filter(p => p.tags?.includes('madera'))
  return (
    <section className="space-y-6">
      <h1 className="section-title">Espejos Marco Madera</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p: Product) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
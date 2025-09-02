'use client'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/types'

export default function ProductGrid({ items }: { items: Product[] }) {
  if (!items?.length) {
    return <p className="text-slate-600">No hay productos en esta categoría por ahora.</p>
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
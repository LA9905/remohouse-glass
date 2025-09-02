'use client'
import { useMemo, useState } from 'react'
import { products as PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/types'

type SortKey = 'relevance' | 'priceAsc' | 'priceDesc' | 'alpha'

export default function CatalogPage() {
  const [sort, setSort] = useState<SortKey>('relevance')
  const [query, setQuery] = useState('')

  const filtered: Product[] = useMemo(() => {
    let list: Product[] = PRODUCTS.filter((p: Product) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    )

    switch (sort) {
      case 'priceAsc':
        list = [...list].sort((a: Product, b: Product) => a.sizes[0].price - b.sizes[0].price)
        break
      case 'priceDesc':
        list = [...list].sort((a: Product, b: Product) => b.sizes[0].price - a.sizes[0].price)
        break
      case 'alpha':
        list = [...list].sort((a: Product, b: Product) => a.name.localeCompare(b.name))
        break
      case 'relevance':
      default:
        break
    }
    return list
  }, [sort, query])

  return (
    <main className="container-page py-8 space-y-6">
      <h1 className="section-title">Catálogo de espejos</h1>

      {/* Filtros/orden */}
      <div className="flex flex-col gap-3 rounded-xl border bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <a href="#todos" className="chip">Todos</a>
          <a href="#led" className="chip">LED</a>
          <a href="#bano" className="chip">Baño</a>
          <a href="#ventana" className="chip">Ventana</a>
          <a href="#madera" className="chip">Marco madera</a>
        </div>
        <div className="flex gap-3">
          <input
            placeholder="Buscar…"
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="input" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="relevance">Ordenar por: Características</option>
            <option value="priceAsc">Precio: menor a mayor</option>
            <option value="priceDesc">Precio: mayor a menor</option>
            <option value="alpha">Nombre A–Z</option>
          </select>
        </div>
      </div>

      {/* Secciones por categoría */}
      <section id="todos" className="space-y-4">
        <h2 className="font-semibold">Todos</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p: Product) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section id="led" className="space-y-4">
        <h2 className="font-semibold">Espejos LED</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.filter((p: Product) => p.tags?.includes('led')).map((p: Product) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="bano" className="space-y-4">
        <h2 className="font-semibold">Espejos de Baño</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.filter((p: Product) => p.tags?.includes('bano')).map((p: Product) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="ventana" className="space-y-4">
        <h2 className="font-semibold">Espejos Ventana</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.filter((p: Product) => p.tags?.includes('ventana')).map((p: Product) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="madera" className="space-y-4">
        <h2 className="font-semibold">Marco de madera</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.filter((p: Product) => p.tags?.includes('madera')).map((p: Product) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  )
}
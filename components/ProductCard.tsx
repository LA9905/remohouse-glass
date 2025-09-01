'use client'
import type { Product } from '../lib/types'
import { useCart } from '../context/CartContext'
import Image from 'next/image'
import { useState } from 'react'

function pickImage(product: Product) {
  // Si el producto trae image explícita, úsala:
  if (product.image) return product.image

  // Fallbacks por forma (ajusta los números según te gusten)
  switch (product.shape) {
    case 'Arco':        return '/espejos/espejo1.jpg'
    case 'Redondo':     return '/espejos/espejo2.jpg'
    case 'Rectangular': return '/espejos/espejo3.jpg'
    case 'Irregular':   return '/espejos/espejo4.jpg'
    default:            return '/espejos/espejo5.jpg'
  }
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState<string | null>(null)

  const handleAdd = (sizeLabel: string, price: number) => {
    addItem({
      productId: product.id,
      name: `${product.name} ${sizeLabel}`,
      sizeLabel,
      unitPrice: price,
      quantity: 1
    })
    setAdded(sizeLabel)
    setTimeout(() => setAdded(null), 1200)
  }

  const src = pickImage(product)

  return (
    <div className="rounded-2xl shadow-sm border overflow-hidden bg-white hover:shadow-md transition">
      {/* Imagen */}
      <div className="relative h-52">
        <Image
          src={src}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          priority={false}
        />
        {added && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-primary-600 text-white text-xs px-2 py-1 shadow">
            Agregado: {added} ✅
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-slate-600 text-sm mt-1">{product.description}</p>

        <div className="mt-3 space-y-2">
          {product.sizes.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-3">
              <span className="text-sm">{s.label}</span>
              <div className="flex items-center gap-3">
                <span className="font-semibold">${s.price.toLocaleString('es-CL')}</span>
                <button
                  className="px-3 py-1.5 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700"
                  onClick={() => handleAdd(s.label, s.price)}
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <a
            className="inline-block px-4 py-2 rounded-md border hover:bg-slate-50"
            href={`https://wa.me/${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+56912345678')}?text=${encodeURIComponent(
              `Hola, me interesa el espejo "${product.name}". ¿Podemos coordinar?`,
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
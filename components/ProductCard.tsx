'use client'
import Image from 'next/image'
import type { Product } from '@/lib/types'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="rounded-2xl shadow-sm border overflow-hidden bg-white hover:shadow-md transition">
      <div className="relative h-44">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-slate-600 text-sm mt-1">{product.description}</p>

        <div className="mt-3 space-y-2">
          {product.sizes.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-3">
              <span className="text-sm">{s.label}</span>
              <div className="flex items-center gap-3">
                <span className="font-semibold">
                  ${s.price.toLocaleString('es-CL')}
                </span>
                <button
                  className="px-3 py-1.5 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700"
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      name: `${product.name} ${s.label}`,
                      sizeLabel: s.label,
                      unitPrice: s.price,
                      quantity: 1,
                    })
                  }
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
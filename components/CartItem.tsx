'use client'
import { useCart } from '../context/CartContext'

export default function CartItem({ item }: { item: ReturnType<typeof useCart>['items'][number] }) {
  const { removeItem } = useCart()
  return (
    <div className="flex items-center justify-between border-b py-3">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-slate-600">{item.sizeLabel} · {item.quantity} u.</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">${(item.unitPrice * item.quantity).toLocaleString('es-CL')}</span>
        <button
          onClick={() => removeItem(item.productId, item.sizeLabel)}
          className="px-2 py-1 rounded hover:bg-slate-100"
        >
          Quitar
        </button>
      </div>
    </div>
  )
}
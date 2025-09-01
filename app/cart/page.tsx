'use client'
import { useCart } from '../../context/CartContext'
import Link from 'next/link'
import CartItem from '../../components/CartItem'

export default function CartPage() {
  const { items, subtotal, clear } = useCart()
  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Carrito</h2>
      {items.length === 0 ? (
        <p>Tu carrito está vacío. <Link href="/catalog" className="text-primary-700 underline">Ir al catálogo</Link></p>
      ) : (
        <div className="space-y-3">
          {items.map(i => <CartItem key={`${i.productId}-${i.sizeLabel}`} item={i} />)}
          <div className="flex items-center justify-between pt-4">
            <button onClick={clear} className="px-4 py-2 rounded-md border hover:bg-slate-50">Vaciar</button>
            <div className="text-right">
              <p className="text-slate-600 text-sm">Subtotal</p>
              <p className="text-2xl font-bold">${subtotal.toLocaleString('es-CL')}</p>
              <Link href="/checkout" className="mt-3 inline-block px-5 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700">Continuar al pago</Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
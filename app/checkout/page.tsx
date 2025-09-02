'use client'
import { useCart } from '../../context/CartContext'
import { useEffect, useState } from 'react'

interface Buyer {
  fullName: string
  email: string
  phone?: string
  address?: string
  notes?: string
}

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [buyer, setBuyer] = useState<Buyer>({ fullName: '', email: '' })
  const [loading, setLoading] = useState(false)

  // cargar buyer guardado (si vuelven desde /webpay/return, etc.)
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = sessionStorage.getItem('buyer')
      if (saved) setBuyer(JSON.parse(saved))
    } catch {}
  }, [])

  // persistir buyer en sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      sessionStorage.setItem('buyer', JSON.stringify(buyer))
    } catch {}
  }, [buyer])

  const disabled = items.length === 0 || !buyer.fullName || !buyer.email

    const pay = async () => {
      if (disabled) return
      try {
        setLoading(true)

        const origin = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
        const returnUrl = `${origin}/webpay/return`
        const buyOrder = `RH-${Date.now()}`
        const sessionId = `SID-${Math.random().toString(36).slice(2, 10)}`

        // Enviar solo el carrito mínimo necesario; el servidor calcula el monto
        const createRes = await fetch('/api/webpay/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            buyOrder,
            sessionId,
            returnUrl,
            cart: {
              items: items.map(i => ({
                productId: i.productId,
                sizeLabel: i.sizeLabel,
                quantity: i.quantity,
              })),
            },
          }),
        })
        const createData = await createRes.json()
        if (!createRes.ok) throw new Error(createData?.error || 'Error creando transacción')

        // Redirigir a Webpay (POST con token_ws)
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = createData.url
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = 'token_ws'
        input.value = createData.token
        form.appendChild(input)
        document.body.appendChild(form)
        form.submit()
      } catch (e) {
        alert('No pudimos iniciar el pago. Inténtalo nuevamente.')
      } finally {
        setLoading(false)
    }
  }


  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm">Nombre y apellido</span>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={buyer.fullName}
              onChange={(e) => setBuyer((prev) => ({ ...prev, fullName: e.target.value }))}
            />
          </label>
          <label className="block">
            <span className="text-sm">Correo</span>
            <input
              type="email"
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={buyer.email}
              onChange={(e) => setBuyer((prev) => ({ ...prev, email: e.target.value }))}
            />
          </label>
          <label className="block">
            <span className="text-sm">Teléfono (opcional)</span>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={buyer.phone || ''}
              onChange={(e) => setBuyer((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </label>
          <label className="block">
            <span className="text-sm">Dirección (opcional)</span>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={buyer.address || ''}
              onChange={(e) => setBuyer((prev) => ({ ...prev, address: e.target.value }))}
            />
          </label>
          <label className="block">
            <span className="text-sm">Notas (opcional)</span>
            <textarea
              className="mt-1 w-full rounded-md border px-3 py-2"
              rows={3}
              value={buyer.notes || ''}
              onChange={(e) => setBuyer((prev) => ({ ...prev, notes: e.target.value }))}
            />
          </label>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <h3 className="font-semibold mb-2">Resumen</h3>
          <ul className="divide-y">
            {items.map((i) => (
              <li
                key={`${i.productId}-${i.sizeLabel}`}
                className="flex items-center justify-between py-2 text-sm"
              >
                <span>
                  {i.name} · {i.quantity} u.
                </span>
                <span className="font-medium">
                  ${(i.unitPrice * i.quantity).toLocaleString('es-CL')}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-3">
            <span className="text-slate-600">Subtotal</span>
            <span className="text-lg font-bold">${subtotal.toLocaleString('es-CL')}</span>
          </div>
          <button
            disabled={disabled || loading}
            onClick={pay}
            className="mt-4 w-full px-4 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Redirigiendo a Webpay…' : 'Pagar con Webpay'}
          </button>
          <p className="text-xs text-slate-500 mt-2">
            El cobro se realiza en el ambiente seguro de Webpay.
          </p>
        </div>
      </div>
    </section>
  )
}
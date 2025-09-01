'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCart } from '../../../context/CartContext' // ← OJO: tres niveles (../../../)

export default function WebpayReturnPage() {
  const sp = useSearchParams()
  const router = useRouter()
  const token = sp.get('token_ws')
  const { items, subtotal, clear } = useCart()
  const [msg, setMsg] = useState('Confirmando pago...')

  useEffect(() => {
    const go = async () => {
      if (!token) {
        setMsg('Falta token de Webpay.')
        return
      }
      try {
        const buyerJSON = typeof window !== 'undefined'
          ? sessionStorage.getItem('buyer') || '{}'
          : '{}'

        const res = await fetch('/api/webpay/commit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token_ws: token,
            buyer: JSON.parse(buyerJSON),
            cart: { items, subtotal }
          })
        })
        const data = await res.json()

        if (data.status === 'AUTHORIZED') {
          clear()
          router.replace('/success')
        } else if (data.status === 'FAILED' || data.status === 'ABORTED') {
          router.replace('/failure')
        } else {
          router.replace('/pending')
        }
      } catch {
        setMsg('Hubo un problema confirmando el pago.')
      }
    }
    go()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <section className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-semibold">{msg}</h2>
      <p className="mt-2 text-slate-600">No cierres esta ventana.</p>
    </section>
  )
}
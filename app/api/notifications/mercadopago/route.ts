import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { sendOrderEmails } from '../../../../lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const type = body?.type || body?.action
    const id = body?.data?.id
    if (type !== 'payment' || !id) return NextResponse.json({ ok: true })

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })
    const payment = new Payment(client)
    const info = await payment.get({ id })

    if (info.status === 'approved') {
      const buyer: any = (info.metadata as any)?.buyer || {}
      const items: any[] = (info.additional_info as any)?.items || []
      const total = info.transaction_amount
      const orderId = info.id

      const list = Array.isArray(items)
        ? items.map((it: any) => `<li>${it.title} · ${it.quantity} u. — $${(it.unit_price * it.quantity).toLocaleString('es-CL')}</li>`).join('')
        : ''

      const htmlCustomer = `
        <h2>¡Gracias por tu compra en REMOHOUSE.GLASS!</h2>
        <p>Hemos recibido tu pago correctamente.</p>
        <p><strong>Pedido:</strong> ${orderId}</p>
        <ul>${list}</ul>
        <p><strong>Total:</strong> $${total?.toLocaleString('es-CL')}</p>
        <p>Datos: ${buyer.fullName || ''} · ${buyer.email || ''} ${buyer.phone ? ' · ' + buyer.phone : ''}</p>
        <p>Te contactaremos para coordinar despacho o retiro.</p>
      `

      const htmlOwner = `
        <h2>Nuevo pago aprobado</h2>
        <p>Pedido: ${orderId}</p>
        <p>Monto: $${total?.toLocaleString('es-CL')}</p>
        <p>Comprador: ${buyer.fullName || ''} (${buyer.email || ''})</p>
        <ul>${list}</ul>
      `

      await sendOrderEmails({
        customerEmail: buyer.email,
        ownerEmail: process.env.EMAIL_TO_OWNER!,
        subject: 'Confirmación de pago',
        htmlCustomer,
        htmlOwner,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error', error)
    return NextResponse.json({ ok: false }, { status: 200 }) // 200 para evitar reintentos infinitos
  }
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
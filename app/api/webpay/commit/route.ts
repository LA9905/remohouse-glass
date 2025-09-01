import { NextRequest, NextResponse } from 'next/server'
import { Options, IntegrationApiKeys, IntegrationCommerceCodes, Environment, WebpayPlus } from 'transbank-sdk'
import { sendOrderEmails } from '../../../../lib/email'

function tbkOptions() {
  const env = process.env.TBK_ENV === 'LIVE' ? Environment.Production : Environment.Integration
  const commerceCode = process.env.TBK_COMMERCE_CODE || IntegrationCommerceCodes.WEBPAY_PLUS
  const apiKey = process.env.TBK_API_KEY || IntegrationApiKeys.WEBPAY
  return new Options(commerceCode, apiKey, env)
}

export async function POST(req: NextRequest) {
  try {
    const { token_ws, buyer, cart } = await req.json()
    if (!token_ws) return NextResponse.json({ error: 'token_ws faltante' }, { status: 400 })

    const tx = new WebpayPlus.Transaction(tbkOptions())
    const result = await tx.commit(token_ws)

    // result.status: 'AUTHORIZED' | 'FAILED' | 'ABORTED' | ...
    if (result.status === 'AUTHORIZED') {
      // Armar HTML básico
      const list = (cart?.items || [])
        .map((i: any) => `<li>${i.name} · ${i.quantity} u. — $${(i.unitPrice * i.quantity).toLocaleString('es-CL')}</li>`)
        .join('')
      const total = cart?.subtotal ?? result.amount

      const htmlCustomer = `
        <h2>¡Gracias por tu compra en REMOHOUSE.GLASS!</h2>
        <p>Pago aprobado por Webpay.</p>
        <p><strong>Orden:</strong> ${result.buy_order}</p>
        <ul>${list}</ul>
        <p><strong>Total:</strong> $${Number(total).toLocaleString('es-CL')}</p>
        <p>Datos: ${buyer?.fullName || ''} · ${buyer?.email || ''} ${buyer?.phone ? ' · ' + buyer.phone : ''}</p>
      `
      const htmlOwner = `
        <h2>Nuevo pago aprobado</h2>
        <p>Orden: ${result.buy_order}</p>
        <p>Monto: $${Number(total).toLocaleString('es-CL')}</p>
        <p>Comprador: ${buyer?.fullName || ''} (${buyer?.email || ''})</p>
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

    return NextResponse.json({ status: result.status, buyOrder: result.buy_order, amount: result.amount })
  } catch (e: any) {
    console.error('WEBPAY COMMIT ERROR', e?.response?.data || e?.message || e)
    return NextResponse.json({ error: 'No se pudo confirmar la transacción' }, { status: 500 })
  }
}
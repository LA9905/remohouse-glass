import { NextRequest, NextResponse } from 'next/server'
import {
  Options,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Environment,
  WebpayPlus,
} from 'transbank-sdk'
import { sendOrderEmails } from '../../../../lib/email'

function tbkOptions() {
  const isPlaceholder = (v?: string) =>
    !v || /TU_COMMERCE_CODE|TU_API_KEY/i.test(v)

  const env =
    process.env.TBK_ENV === 'LIVE'
      ? Environment.Production
      : Environment.Integration

  const commerceCode = isPlaceholder(process.env.TBK_COMMERCE_CODE)
    ? IntegrationCommerceCodes.WEBPAY_PLUS
    : (process.env.TBK_COMMERCE_CODE as string)

  const apiKey = isPlaceholder(process.env.TBK_API_KEY)
    ? IntegrationApiKeys.WEBPAY
    : (process.env.TBK_API_KEY as string)

  return new Options(commerceCode, apiKey, env)
}

export async function POST(req: NextRequest) {
  try {
    const { token_ws, buyer, cart } = await req.json()
    if (!token_ws)
      return NextResponse.json({ error: 'token_ws faltante' }, { status: 400 })

    const tx = new WebpayPlus.Transaction(tbkOptions())
    const result = await tx.commit(token_ws)

    // Usa SIEMPRE el monto y datos del resultado de Webpay
    const total = Number(result.amount) || 0

    if (result.status === 'AUTHORIZED') {
      const list = (cart?.items || [])
        .map(
          (i: any) =>
            `<li>${i.name} · ${i.quantity} u. — $${(
              i.unitPrice * i.quantity
            ).toLocaleString('es-CL')}</li>`
        )
        .join('')

      const htmlCustomer = `
        <h2>¡Gracias por tu compra en REMOHOUSE.GLASS!</h2>
        <p>Pago aprobado por Webpay.</p>
        <p><strong>Orden:</strong> ${result.buy_order}</p>
        <p><strong>Fecha:</strong> ${result.transaction_date || ''}</p>
        <p><strong>Código autorización:</strong> ${result.authorization_code || ''}</p>
        <ul>${list}</ul>
        <p><strong>Total:</strong> $${total.toLocaleString('es-CL')}</p>
        <p>Datos: ${buyer?.fullName || ''} · ${buyer?.email || ''} ${
        buyer?.phone ? ' · ' + buyer.phone : ''
      }</p>
      `
      const htmlOwner = `
        <h2>Nuevo pago aprobado</h2>
        <p>Orden: ${result.buy_order}</p>
        <p>Monto: $${total.toLocaleString('es-CL')}</p>
        <p>Fecha: ${result.transaction_date || ''}</p>
        <p>Autorización: ${result.authorization_code || ''}</p>
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

    return NextResponse.json({
      status: result.status,
      buyOrder: result.buy_order,
      amount: result.amount,
    })
  } catch (e: any) {
    console.error('WEBPAY COMMIT ERROR', e?.response?.data || e?.message || e)
    return NextResponse.json(
      { error: 'No se pudo confirmar la transacción' },
      { status: 500 }
    )
  }
}
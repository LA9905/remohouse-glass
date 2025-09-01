import { NextRequest, NextResponse } from 'next/server'
import { Options, IntegrationApiKeys, IntegrationCommerceCodes, Environment, WebpayPlus } from 'transbank-sdk'

export const dynamic = 'force-dynamic'

function tbkOptions() {
  const env = process.env.TBK_ENV === 'LIVE' ? Environment.Production : Environment.Integration
  const commerceCode = process.env.TBK_COMMERCE_CODE || IntegrationCommerceCodes.WEBPAY_PLUS
  const apiKey = process.env.TBK_API_KEY || IntegrationApiKeys.WEBPAY
  return new Options(commerceCode, apiKey, env)
}

export async function POST(req: NextRequest) {
  try {
    const { amount, buyOrder, sessionId, returnUrl } = await req.json()
    if (!amount || !buyOrder || !sessionId || !returnUrl) {
      return NextResponse.json({ error: 'Parámetros incompletos' }, { status: 400 })
    }
    const tx = new WebpayPlus.Transaction(tbkOptions())
    const { token, url } = await tx.create(buyOrder, sessionId, amount, returnUrl)
    return NextResponse.json({ token, url })
  } catch (e: any) {
    console.error('WEBPAY CREATE ERROR', e?.response?.data || e?.message || e)
    return NextResponse.json({ error: 'No se pudo crear la transacción' }, { status: 500 })
  }
}
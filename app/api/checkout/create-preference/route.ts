import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

export const dynamic = 'force-dynamic' // evita cualquier caché

export async function POST(req: NextRequest) {
  try {
    const { items, buyer, origin } = await req.json()

    if (!process.env.MP_ACCESS_TOKEN) {
      console.error('MP_ACCESS_TOKEN missing')
      return NextResponse.json({ error: 'Falta MP_ACCESS_TOKEN en el servidor' }, { status: 500 })
    }

    if (!items?.length) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
    }
    if (!buyer?.email || !buyer?.fullName) {
      return NextResponse.json({ error: 'Datos de comprador incompletos' }, { status: 400 })
    }
    if (!origin) {
      return NextResponse.json({ error: 'Falta origin' }, { status: 400 })
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
    const preference = new Preference(client)

    const success = `${origin}/success`
    const failure = `${origin}/failure`
    const pending = `${origin}/pending`
    const notificationUrl = process.env.MP_WEBHOOK_URL || `${origin}/api/notifications/mercadopago`

    const body = {
      items: items.map((i: any) => ({
        title: i.name,
        quantity: Number(i.quantity) || 1,
        unit_price: Number(i.unitPrice) || 0,
        currency_id: 'CLP',
      })),
      payer: { email: buyer.email, name: buyer.fullName },
      back_urls: { success, failure, pending },
      auto_return: 'approved' as const,
      notification_url: notificationUrl,
      statement_descriptor: 'REMOHOUSE.GLASS',
      metadata: { buyer, origin },
    }

    const resp = await preference.create({ body })

    // init_point en prod / sandbox_init_point en pruebas
    const url = resp.init_point || (resp as any).sandbox_init_point
    if (!url) {
      console.error('MP preference created without init_point', resp)
      return NextResponse.json({ error: 'Preferencia creada sin URL de inicio' }, { status: 500 })
    }

    return NextResponse.json({ id: resp.id, init_point: url })
  } catch (e: any) {
    // Log detallado en el servidor
    console.error('MP create preference error:', e?.message || e, e?.cause || '')
    return NextResponse.json(
      { error: e?.message || 'No se pudo crear la preferencia' },
      { status: 500 }
    )
  }
}
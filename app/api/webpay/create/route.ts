import { NextRequest, NextResponse } from 'next/server'
import {
  Options,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Environment,
  WebpayPlus,
} from 'transbank-sdk'
import { products } from '@/lib/products'

export const dynamic = 'force-dynamic'

function tbkOptions() {
  // Si dejas TBK_COMMERCE_CODE/TBK_API_KEY vacíos o con placeholders, usamos integración
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

type CartItemInput = {
  productId: string
  sizeLabel: string
  quantity: number
}
type CartInput = { items: CartItemInput[] }

export async function POST(req: NextRequest) {
  try {
    const { buyOrder, sessionId, returnUrl, cart } = (await req.json()) as {
      buyOrder?: string
      sessionId?: string
      returnUrl?: string
      cart?: CartInput
    }

    // Validaciones básicas
    if (!buyOrder || !sessionId || !returnUrl) {
      return NextResponse.json(
        { error: 'Parámetros incompletos' },
        { status: 400 }
      )
    }
    if (!cart?.items?.length) {
      return NextResponse.json(
        { error: 'Carrito vacío o inválido' },
        { status: 400 }
      )
    }

    // Recalcular monto en el servidor
    const priceMap = new Map(products.map((p) => [p.id, p]))
    let amount = 0

    for (const it of cart.items) {
      // Validaciones de item
      if (
        !it ||
        typeof it.productId !== 'string' ||
        typeof it.sizeLabel !== 'string' ||
        typeof it.quantity !== 'number' ||
        it.quantity < 1 ||
        it.quantity > 50
      ) {
        return NextResponse.json(
          { error: 'Ítem de carrito inválido' },
          { status: 400 }
        )
      }

      const prod = priceMap.get(it.productId)
      if (!prod) {
        return NextResponse.json(
          { error: `Producto inexistente: ${it.productId}` },
          { status: 400 }
        )
      }
      const size = prod.sizes.find((s) => s.label === it.sizeLabel)
      if (!size) {
        return NextResponse.json(
          { error: `Tamaño inválido para ${prod.name}` },
          { status: 400 }
        )
      }
      amount += size.price * it.quantity
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Monto calculado inválido' },
        { status: 400 }
      )
    }

    // Crear transacción Webpay con el monto verificado
    const tx = new WebpayPlus.Transaction(tbkOptions())
    const { token, url } = await tx.create(buyOrder, sessionId, amount, returnUrl)

    return NextResponse.json({ token, url })
  } catch (e: any) {
    console.error('WEBPAY CREATE ERROR', e?.response?.data || e?.message || e)
    return NextResponse.json(
      { error: 'No se pudo crear la transacción' },
      { status: 500 }
    )
  }
}
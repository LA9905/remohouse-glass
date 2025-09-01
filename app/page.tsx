import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <section className="py-8 md:py-12">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border">
        <div className="absolute inset-0">
          <Image
            src="/espejos/espejo15.png"
            alt="Espejos REMOHOUSE.GLASS"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative container-page py-20 md:py-28 text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Espejos a medida, seguros y con estilo.
          </h1>
          <p className="mt-4 text-lg max-w-2xl">
            Fabricamos espejos personalizados según tamaño, forma y terminación. Compra online o coordina por WhatsApp.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/catalog" className="px-5 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700">
              Ver catálogo
            </Link>
            <a
              className="px-5 py-3 rounded-md bg-white/90 text-slate-900 hover:bg-white"
              href={`https://wa.me/${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+56912345678')}?text=${encodeURIComponent('Hola, quiero un espejo a medida 😊')}`}
              target="_blank"
              rel="noreferrer"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* SELLOS */}
      <div className="container-page grid md:grid-cols-3 gap-4 mt-10">
        <div className="rounded-xl border p-4 bg-white">
          <p className="font-semibold">Medidas a elección</p>
          <p className="text-sm text-slate-600">Redondos, rectangulares, arco o diseño irregular.</p>
        </div>
        <div className="rounded-xl border p-4 bg-white">
          <p className="font-semibold">Instalación opcional</p>
          <p className="text-sm text-slate-600">Servicio en RM (consulta otras regiones).</p>
        </div>
        <div className="rounded-xl border p-4 bg-white">
          <p className="font-semibold">Pago seguro</p>
          <p className="text-sm text-slate-600">Webpay (Transbank). Comprobante por correo.</p>
        </div>
      </div>

      {/* GALERÍA MINI */}
      <div className="container-page mt-12">
        <h2 className="text-2xl font-semibold mb-4">Trabajos recientes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-xl border">
              <Image
                src={`/espejos/espejo${(i % 14) + 1}.jpg`}
                alt={`Espejo ${i + 1}`}
                fill
                className="object-cover hover:scale-[1.03] transition-transform"
              />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/galeria" className="text-primary-700 hover:underline">Ver la galería completa</Link>
        </div>
      </div>
    </section>
  )
}
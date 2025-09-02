import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const wa = `https://wa.me/${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+56912345678')}`

  return (
    <main className="container-page space-y-10 py-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border min-h-[360px] sm:min-h-[420px] md:min-h-[520px]">
      <div className="absolute inset-0">
        <Image src="/espejos/espejo15.png" alt="Espejos REMOHOUSE.GLASS" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/35" />
      </div>
        <div className="relative px-6 py-16 sm:px-10 md:py-24 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
            Espejos a medida, seguros y con estilo.
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Fabricamos espejos personalizados según tamaño, forma y terminación. Compra online o coordina por WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-primary">Ver catálogo</Link>
            <a href={`${wa}?text=${encodeURIComponent('Hola, quiero un espejo a medida 😊')}`} className="btn-white" target="_blank" rel="noreferrer">
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TRABAJOS RECIENTES */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="section-title">Trabajos recientes</h2>
          <Link href="/galeria" className="text-sm font-medium text-primary-700 hover:underline">Ver la galería completa</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1,2,3,4,5,6,7,8].map(n => (
            <div key={n} className="overflow-hidden rounded-2xl border bg-white">
              <Image
                src={`/espejos/espejo${n}.jpg`}
                alt={`Trabajo ${n}`}
                width={800}
                height={1000}
                className="h-64 w-full object-cover transition hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
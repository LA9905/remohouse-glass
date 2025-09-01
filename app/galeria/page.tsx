import Image from 'next/image'

export default function GaleriaPage() {
  const total = 14
  const items = Array.from({ length: total }).map((_, i) => `/espejos/espejo${i + 1}.jpg`)

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Galería de espejos</h2>

      {/* Grid responsivo estilo catálogo */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((src, idx) => (
          <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-2xl border bg-white">
            <Image
              src={src}
              alt={`Espejo ${idx + 1}`}
              fill
              className="object-cover hover:scale-[1.03] transition-transform"
              sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            />
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-600">
        ¿Viste un modelo que te guste? Escríbenos por WhatsApp y lo fabricamos a la medida.
      </p>
    </section>
  )
}
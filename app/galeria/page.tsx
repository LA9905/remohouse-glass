import Image from 'next/image'

export default function GaleriaPage() {
  // 14 imágenes dentro de /public/espejos
  const imgs = Array.from({ length: 14 }, (_, i) => `/espejos/espejo${i + 1}.jpg`)

  return (
    <main className="container-page py-8">
      <h1 className="section-title mb-6">Galería de espejos</h1>

      {/* Masonry con columns */}
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 [column-fill:_balance]">
        {imgs.map((src, idx) => (
          <div key={idx} className="mb-4 break-inside-avoid rounded-2xl border bg-white overflow-hidden">
            <Image
              src={src}
              alt={`Galería ${idx + 1}`}
              width={1000}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </main>
  )
}
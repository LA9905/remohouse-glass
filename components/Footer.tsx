import Image from 'next/image'
import Link from 'next/link'

const INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/remohouse.glass'

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="container-page py-10 grid gap-8 md:grid-cols-3">
        {/* Columna 1: Marca */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image src="/logoREMOHOUSEGLASS.jpg" alt="REMOHOUSE.GLASS" width={32} height={32} />
            <span className="font-semibold">REMOHOUSE.GLASS</span>
          </div>
          <p className="text-sm text-slate-600">
            Espejos a medida: redondos, rectangulares, arco e irregulares.
            Fabricación y terminaciones premium.
          </p>
        </div>

        {/* Columna 2: Enlaces */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold mb-2">Sitio</p>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary-700">Inicio</Link></li>
              <li><Link href="/catalog" className="hover:text-primary-700">Catálogo</Link></li>
              <li><Link href="/galeria" className="hover:text-primary-700">Galería</Link></li>
              <li><Link href="/cart" className="hover:text-primary-700">Carrito</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Atención</p>
            <ul className="space-y-2">
              <li><a className="hover:text-primary-700" href={`https://wa.me/${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+56912345678')}`} target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a className="hover:text-primary-700" href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a></li>
              <li><span className="text-slate-600">ventas@remohouseglass.cl</span></li>
            </ul>
          </div>
        </div>

        {/* Columna 3: Sello / seguridad */}
        <div className="rounded-2xl border p-4 bg-white">
          <p className="font-semibold mb-1">Pago seguro</p>
          <p className="text-sm text-slate-600">
            Webpay (Transbank). Recibirás comprobante por correo.
          </p>
          <div className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} REMOHOUSE.GLASS. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}
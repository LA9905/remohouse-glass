import './globals.css'
import type { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { CartProvider } from '../context/CartContext'

export const metadata = {
  title: 'REMOHOUSE.GLASS – Espejos a medida',
  description: 'Espejos a medida y a tu estilo. Compra online o por WhatsApp.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Navbar />
          <main className="container-page py-10">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  )
}
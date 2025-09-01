'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useMemo, useState } from 'react'

const INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/remohouse.glass'

export default function Navbar() {
  const { items } = useCart()
  const count = useMemo(() => items.reduce((a, i) => a + i.quantity, 0), [items])
  const [open, setOpen] = useState(false)

  const NavLinks = (
    <>
      <Link href="/" className="nav-link">Inicio</Link>
      <Link href="/catalog" className="nav-link">Catálogo</Link>
      <Link href="/galeria" className="nav-link">Galería</Link>

      <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="nav-link inline-flex items-center gap-2">
        {/* Instagram icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6a2.8 2.8 0 0 0 0-5.6zM18 6.7a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"/>
        </svg>
        <span>@remohouse.glass</span>
      </a>

      <Link href="/cart" className="relative inline-flex items-center gap-2 rounded-xl bg-white/60 backdrop-blur px-3 py-1.5 border hover:bg-white">
        {/* cart icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M7 18a2 2 0 1 0 0 4a2 2 0 0 0 0-4m10 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4M7.2 14h9.9a2 2 0 0 0 1.9-1.4l2-6A1 1 0 0 0 20 5H6.4l-.5-2A1 1 0 0 0 5 2H2a1 1 0 0 0 0 2h2.3l2.3 9.4A2 2 0 0 0 7.2 14"/>
        </svg>
        <span>Carrito</span>
        {count > 0 && (
          <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-xs text-white">
            {count}
          </span>
        )}
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container-page h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logoREMOHOUSEGLASS.jpg"
            alt="REMOHOUSE.GLASS"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-semibold tracking-wide">REMOHOUSE.GLASS</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NavLinks}
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg border px-3 py-2"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container-page py-3 flex flex-col gap-3 text-sm">
            {NavLinks}
          </div>
        </div>
      )}
    </header>
  )
}
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { useMemo, useState, useRef, useEffect } from 'react'

const INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/remohouse.glass'

export default function Navbar() {
  const { items } = useCart()
  const count = useMemo(() => items.reduce((a, i) => a + i.quantity, 0), [items])

  const [openMobile, setOpenMobile] = useState(false)
  const [openProducts, setOpenProducts] = useState(false)
  const productsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!productsRef.current) return
      if (!productsRef.current.contains(e.target as Node)) setOpenProducts(false)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  const ProductMenu = (
    <div
      className="absolute left-0 top-full mt-2 w-64 rounded-xl border bg-white p-2 shadow-lg ring-1 ring-black/5"
      role="menu"
    >
      <Link href="/catalog#todos" className="dd-item">Espejos</Link>
      <Link href="/catalog#led" className="dd-item">Irregulares</Link>
      <Link href="/catalog#bano" className="dd-item">Espejos de Baño</Link>
      <Link href="/catalog#ventana" className="dd-item">Espejos Arco</Link>
      <Link href="/catalog#madera" className="dd-item">Espejos Ovalado</Link>
      <Link href="/catalog" className="dd-item">Ver todo</Link>
    </div>
  )

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container-page h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logoREMOHOUSEGLASS.jpg" alt="REMOHOUSE.GLASS" width={28} height={28} priority />
          <span className="text-lg font-semibold tracking-wide">REMOHOUSE.GLASS</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="nav-link">Inicio</Link>

          <div className="relative" ref={productsRef}>
            <button
              className="nav-link inline-flex items-center gap-1"
              onClick={(e) => { e.stopPropagation(); setOpenProducts(v => !v) }}
            >
              Productos
              <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
            </button>
            {openProducts && ProductMenu}
          </div>

          <Link href="/catalog" className="nav-link">Catálogo</Link>
          <Link href="/galeria" className="nav-link">Galería</Link>

          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="nav-link inline-flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10a5 5 0 0 0 0-10zM18 6.7a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"/></svg>
            @remohouse.glass
          </a>

          <Link href="/cart" className="btn-cart">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 18a2 2 0 1 0 0 4a2 2 0 0 0 0-4m10 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4M7.2 14h9.9a2 2 0 0 0 1.9-1.4l2-6A1 1 0 0 0 20 5H6.4l-.5-2A1 1 0 0 0 5 2H2a1 1 0 0 0 0 2h2.3l2.3 9.4A2 2 0 0 0 7.2 14"/></svg>
            <span>Carrito</span>
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden rounded-lg border px-3 py-2" onClick={() => setOpenMobile(v => !v)} aria-label="Abrir menú">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
        </button>
      </div>

      {/* Mobile menu */}
      {openMobile && (
        <div className="md:hidden border-t bg-white">
          <div className="container-page py-3 flex flex-col gap-3 text-sm">
            <Link href="/" className="nav-link">Inicio</Link>
            <details className="rounded-lg border">
              <summary className="cursor-pointer px-3 py-2">Productos</summary>
              <div className="p-2 flex flex-col">
                <Link href="/catalog#todos" className="dd-item">Espejos</Link>
                <Link href="/catalog#led" className="dd-item">Espejos LED</Link>
                <Link href="/catalog#bano" className="dd-item">Espejos de Baño</Link>
                <Link href="/catalog#ventana" className="dd-item">Espejos Ventana</Link>
                <Link href="/catalog#madera" className="dd-item">Espejos Marco Madera</Link>
                <Link href="/catalog" className="dd-item">Ver todo</Link>
              </div>
            </details>
            <Link href="/catalog" className="nav-link">Catálogo</Link>
            <Link href="/galeria" className="nav-link">Galería</Link>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="nav-link">@remohouse.glass</a>
            <Link href="/cart" className="btn-cart"><span>Carrito</span>{count > 0 && <span className="badge">{count}</span>}</Link>
          </div>
        </div>
      )}
    </header>
  )
}
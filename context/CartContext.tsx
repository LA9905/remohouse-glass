'use client'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface CartItem {
  productId: string
  name: string
  sizeLabel: string
  unitPrice: number
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, sizeLabel: string) => void
  clear: () => void
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart')
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.productId === item.productId && i.sizeLabel === item.sizeLabel)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity }
        return next
      }
      return [...prev, item]
    })
  }

  const removeItem = (productId: string, sizeLabel: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.sizeLabel === sizeLabel)))
  }

  const clear = () => setItems([])

  const subtotal = useMemo(() => items.reduce((a, i) => a + i.unitPrice * i.quantity, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}
export type MirrorShape = 'Redondo' | 'Rectangular' | 'Arco' | 'Irregular'

export interface Product {
  id: string
  name: string
  shape: MirrorShape
  description: string
  image?: string
  sizes: { label: string; widthCm: number; heightCm: number; price: number }[]
}
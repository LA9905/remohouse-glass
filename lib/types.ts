export type ProductSize = { label: string; price: number }

export type Product = {
  id: string
  name: string
  description: string
  shape: 'Arco' | 'Redondo' | 'Rectangular' | 'Irregular'
  sizes: ProductSize[]
  /** ruta dentro de /public, por ej: "/espejos/espejo3.jpg" */
  image: string
  /** etiquetas para filtrar en vistas: 'led' | 'bano' | 'ventana' | 'madera' */
  tags?: string[]
}
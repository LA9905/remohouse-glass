import type { Product } from './types'

export const products: Product[] = [
  {
    id: 'arco-clasico',
    name: 'Arco Clásico',
    description: 'Borde pulido, opción de luz LED posterior.',
    shape: 'Irregular',
    image: '/espejos/espejo1.jpg',
    tags: ['led'],
    sizes: [
      { label: '60 × 90 cm', price: 79990 },
      { label: '80 × 120 cm', price: 119990 },
      { label: '100 × 150 cm', price: 179990 },
    ],
  },
  {
    id: 'redondo-premium',
    name: 'Redondo Premium',
    description: 'Vidrio alta pureza, biselado y anti-empañante opcional.',
    shape: 'Redondo',
    image: '/espejos/espejo2.jpg',
    tags: ['bano', 'led'],
    sizes: [
      { label: '60 cm Ø', price: 69990 },
      { label: '80 cm Ø', price: 99990 },
      { label: '100 cm Ø', price: 149990 },
    ],
  },
  {
    id: 'rectangular-studio',
    name: 'Rectangular Studio',
    description: 'Marco delgado aluminio negro/dorado. Listo para colgar.',
    shape: 'Rectangular',
    image: '/espejos/espejo3.jpg',
    tags: ['madera'],
    sizes: [
      { label: '50 × 70 cm', price: 59990 },
      { label: '70 × 100 cm', price: 99990 },
      { label: '90 × 140 cm', price: 159990 },
    ],
  },
  {
    id: 'ventana-xl',
    name: 'Ventana XL',
    description: 'Estilo “ventana” con divisiones metálicas.',
    shape: 'Rectangular',
    image: '/espejos/espejo4.jpg',
    tags: ['ventana'],
    sizes: [
      { label: '80 × 180 cm', price: 199990 },
      { label: '100 × 200 cm', price: 259990 },
    ],
  },
  {
    id: 'ovalado-led',
    name: 'Ovalado LED',
    description: 'Ideal para baño. Luz frontal difusa.',
    shape: 'Irregular',
    image: '/espejos/espejo5.jpg',
    tags: ['bano', 'led'],
    sizes: [
      { label: '60 × 90 cm', price: 89990 },
      { label: '75 × 110 cm', price: 119990 },
    ],
  },
  // agrega más usando /espejos/espejo6.jpg ... /espejos/espejo15.jpg
]
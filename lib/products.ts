import { Product } from './types'

export const products: Product[] = [
  {
    id: 'mirror-arc-001',
    name: 'Arco Clásico',
    shape: 'Arco',
    description: 'Borde pulido, opción de luz LED posterior.',
    image: '', // podrás poner /mirrors/arco.jpg si subes imágenes
    sizes: [
      { label: '60 × 90 cm',  widthCm: 60,  heightCm: 90,  price: 79990 },
      { label: '80 × 120 cm', widthCm: 80,  heightCm: 120, price: 119990 },
      { label: '100 × 150 cm',widthCm: 100, heightCm: 150, price: 179990 },
    ],
  },
  {
    id: 'mirror-round-001',
    name: 'Redondo Premium',
    shape: 'Redondo',
    description: 'Vidrio alta pureza, biselado y anti-empañante opcional.',
    image: '',
    sizes: [
      { label: '60 cm Ø',  widthCm: 60,  heightCm: 60,  price: 69990 },
      { label: '80 cm Ø',  widthCm: 80,  heightCm: 80,  price: 99990 },
      { label: '100 cm Ø', widthCm: 100, heightCm: 100, price: 149990 },
    ],
  },
  {
    id: 'mirror-rect-001',
    name: 'Rectangular Studio',
    shape: 'Rectangular',
    description: 'Marco delgado aluminio negro/dorado. Listo para colgar.',
    image: '',
    sizes: [
      { label: '50 × 70 cm',  widthCm: 50, heightCm: 70,  price: 59990 },
      { label: '70 × 100 cm', widthCm: 70, heightCm: 100, price: 99990 },
      { label: '90 × 140 cm', widthCm: 90, heightCm: 140, price: 159990 },
    ],
  },
  {
    id: 'mirror-free-001',
    name: 'Irregular Orgánico',
    shape: 'Irregular',
    description: 'Diseño a la medida con plantilla incluida.',
    image: '',
    sizes: [
      { label: 'Pequeño ~60 cm', widthCm: 60,  heightCm: 60,  price: 89990 },
      { label: 'Mediano ~90 cm', widthCm: 90,  heightCm: 90,  price: 139990 },
      { label: 'Grande ~120 cm', widthCm: 120, heightCm: 120, price: 199990 },
    ],
  },
]
import { Product } from './types';

export const CATEGORIES = ['All', 'Produce', 'Dairy', 'Bakery', 'Meat', 'Pantry', 'Beverages'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Organic Tomato',
    price: 540,
    category: 'Produce',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80',
    stock: 50,
    unit: 'kg',
    description: 'Fresh organic tomatoes'
  },
  {
    id: 'p2',
    name: 'Vegan Egg Replacer',
    price: 540,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80',
    stock: 30,
    unit: 'box',
    description: 'Plant-based egg alternative'
  },
  {
    id: 'p3',
    name: 'Strawberry Vanilla',
    price: 540,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500&q=80',
    stock: 15,
    unit: 'pack',
    description: 'Fresh organic strawberries'
  },
  {
    id: 'p4',
    name: 'Papaya',
    price: 1150,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1617112848923-cc2234394a8a?w=500&q=80',
    stock: 20,
    unit: 'each',
    description: 'Sweet ripe papaya'
  },
  {
    id: 'p5',
    name: 'Organic Green Peas',
    price: 850,
    category: 'Produce',
    image: 'https://images.unsplash.com/photo-1590005028404-f6afa0d1d643?w=500&q=80',
    stock: 40,
    unit: 'lb',
    description: 'Fresh green peas'
  },
  {
    id: 'p6',
    name: 'Artisanal Tomato Sauce',
    price: 1300,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1605333396347-920fde7191df?w=500&q=80',
    stock: 100,
    unit: 'can',
    description: 'Rich tomato sauce'
  },
  {
    id: 'p7',
    name: 'Single Origin Tea Blend',
    price: 1550,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&q=80',
    stock: 25,
    unit: 'box',
    description: 'Premium tea bags'
  }
];

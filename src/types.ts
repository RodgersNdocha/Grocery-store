export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  description?: string;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

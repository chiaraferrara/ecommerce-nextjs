export type Cart = Array<{
  id: number;
  quantity: number;
}>;
export type Paid = boolean;

export interface Product {
  qty: number;
  userId: number;
  title: string;
  description: string;
  id: number;
  price: number;
  image: string;
  thumbnail: string;
}

export interface TContext {
  cart: Cart;
  paid: boolean;
  products: Product[];
  addToCart: (idProduct: Product["id"]) => void;
  removeFromCart: (idProduct: Product["id"]) => void;
  pay: () => void;
  loading: boolean;
  error: string;
}
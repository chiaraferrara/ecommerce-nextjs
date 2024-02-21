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

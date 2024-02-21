import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react"; // Import the missing Cart type
import { Cart, Product } from "./declarations/declarations";
import { createContext } from "react";

export const myContext = createContext({});

export default function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState<Cart>([]);
  const [paid, setPaid] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const addToCart = (idProduct: Product["id"]) => {
    //optional chaining
    const found = cart?.find((item: any) => item.id === idProduct);
    if (found) {
      const updatedCart = cart?.map((item: any) => {
        if (item.id === idProduct) {
          return { ...item, qty: item.qty + 1 };
        }
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { id: idProduct, quantity: 1 }]);
    }
  };

  const removeFromCart = (idProduct: Product["id"]) => {
    //reduce ritorna un valore, il tipo è dato dal nostro accumulatore, un array in questo caso.
    const updatedCart = cart?.reduce((acc, item) => {
      if (item.id !== idProduct) {
        acc.push(item);
        return acc;
      } else {
        if (item.quantity > 1) {
          acc.push({ id: item.id, quantity: item.quantity - 1 });
          return acc;
        } else if (item.quantity === 1) {
          return acc;
        }
        return acc;
      }
    }, [] as Cart);
    //per ogni ciclo di reduce, acc è l'array vuoto, item è il primo elemento di cart
    setCart(updatedCart);
  };
  const pay = () => {
    setCart([]);
    setPaid(true);
  };

  <myContext.Provider
    value={{
      cart,
      setCart,
      paid,
      setPaid,
      products,
      setProducts,
      addToCart,
      removeFromCart,
    }}
  >
    return <Component {...pageProps} />;
  </myContext.Provider>;
}

import { ReactNode, createContext, useEffect, useState } from "react";
import { Cart, Product, TContext } from "./declarations/declarations";
import Home from ".";

export const myContext = createContext<TContext>({
    cart: [],
    paid: false,
    products: [],
    addToCart: () => {},
    removeFromCart: () => {},
    pay: () => {},
    loading: false,
    error : ""
  });

  interface Props{
    children: ReactNode
  }

export default function ContextProvider( {children} : Props){

  const [cart, setCart] = useState<TContext["cart"]>([]);
  const [paid, setPaid] = useState<TContext["paid"]>(false);
  const [products, setProducts] = useState<TContext["products"]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [ error, setError] = useState<any>("");


  const fetchProductsFromAPI = async () => {
    setLoading(true);
    try{
    const response = await fetch("https://mockend.up.railway.app/api/products");
    const data = await response.json();
    setProducts(data);
    setLoading(false)
  }catch(e){
      console.log(e);
      setLoading(false);
      setError(e);
    }
  }

  const addToCart : TContext["addToCart"]= (idProduct: Product["id"]) => {
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

  const removeFromCart : TContext["removeFromCart"]= (idProduct: Product["id"]) => {
    //reduce ritorna un valore, il tipo è dato dal nostro accumulatore, un array in questo caso.
    const updatedCart = cart?.reduce((acc : Cart , item : any) => {
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


  const pay : TContext["pay"] = () => {
    setCart([]);
    setPaid(true);
  };


  useEffect(() => {
    fetchProductsFromAPI();
  }, []);

  return(
  <myContext.Provider value={{
    cart,
    paid,
    products: products,
    addToCart,
    removeFromCart,
    pay,
    loading,
    error
  }}>
    {children}
  </myContext.Provider>
  )


    
}
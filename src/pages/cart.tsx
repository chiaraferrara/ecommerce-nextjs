import { useContext } from "react";
import { myContext } from "./_app";

export default function Cart() {
    const {cart} : any = useContext(myContext);
    const {removeFromCart} : any = useContext(myContext);

  return (
    <div>
      <h1>Cart</h1>
      {cart.map((item : any) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove from cart</button>
        </div>
      ))}
      
    </div>
  );
}
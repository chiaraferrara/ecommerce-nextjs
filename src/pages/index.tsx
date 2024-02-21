import React, { useContext } from "react";
import { myContext } from "./ContextProvider";

export default function Home() {
    const { products } = useContext(myContext);
  return (
   <>
    <h1>Home</h1>
    <div> 
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <img src={product.image} alt={product.title} />
        </div>
      ))} 
      </div>  
      </>
  );
}

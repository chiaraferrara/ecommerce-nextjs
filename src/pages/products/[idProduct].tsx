import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Product() {

    const router = useRouter();
    const { idProduct } = router.query;

    useEffect(() => {
        if(idProduct) {
        }
    }, [idProduct]);
  return (
    
    <></>
  );
}
import { useEffect } from "react"

export default function Success() {

    useEffect(() => {console.log("success")}, []);
    return (
    <>
    <h1>Success</h1>
    
    </>
    )
}
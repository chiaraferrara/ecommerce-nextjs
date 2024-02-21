import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react"; 
import ContextProvider from "./ContextProvider";



export default function App({ Component, pageProps }: AppProps) {
return (
  <ContextProvider>
    <Component {...pageProps} />;
  </ContextProvider>)
}

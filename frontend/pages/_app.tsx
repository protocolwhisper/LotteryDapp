import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";


function NextWeb3App({ Component, pageProps }: AppProps) {
  

useEffect(() => {
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}, []);
  return (
    
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
      
    </Web3ReactProvider>
  );
}

export default NextWeb3App;

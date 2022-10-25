import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import TokenBalance from "../components/TokenBalance";
import NavBar from "../components/Menu";
import { useEffect, useState } from 'react';
import SubNav from "../components/SubNav";

const LOTTERY_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_LOTTERY_TOKEN;


  






function Home() {
  const { account, library } = useWeb3React();

  const [amount, setAmount] = useState('');
 

  const isConnected = typeof account === "string" && !!library;

  const requestTokens = async () => {
  
    let response = await fetch("/api/requestTokens", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({address: account})
    })
    
  }

  const purchaseTokens = async () => {

  }


  return (
    <div>
      <Head>
        <title>EnLotto</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
      <NavBar/>
      
      </header>
      
      <main>
      <SubNav/>
        
       
        

        {isConnected && (
          <div className="text-white  container" >
            
            <div className="row mb-3 mt-5 px-5">
            
            
            <section className="col-sm card bg-light border-success" >
              <h5 className="text-dark p-3 mb-1"> 
              <div className="mb-1">Request tokens: </div><br/>
              
              <button  onClick={requestTokens}>
              $LTO Faucet
              </button>
              
              </h5>
              
            </section>
            <section className="d-inline-block col border-success card bg-light ">
              <h5 className="text-black "> 
              Purchase tokens: <br/>
              <div className="grid">
              <form id='myForm' action='/api/request' method='post'>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder='Amount in eth ex: "0.05"' value={amount} onChange={event => setAmount(event.target.value)} name='amount' id='amount'/>
                  
                </div>
              
              
              <button className='btn-lg justify-text-center ' type="submit" onClick={purchaseTokens}>Process Purchase</button>
              </form>
          </div> 
              </h5>
              
            </section>
            </div>
            <div className="row mb-3">
            
            <section className=" col  ">
              <h5 className="text-dark p-3 mb-1"> 
              <div className="mb-2">Token return: </div>
              
              <button  onClick={requestTokens}>
              Burn tokens
              </button>
              
              </h5>
              
            </section>
            </div>
            
          </div>
          
        )}

        {!isConnected && (
          <section className="p-5">
            <h5> Please connect to get started with EnLotto</h5>
          </section>
        )}

        <section className="pt-5 ">
        <button><a href="/"> Return home</a></button>
        </section>
        
   
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;

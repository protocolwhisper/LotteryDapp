import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import TokenBalance from "../components/TokenBalance";
import NavBar from "../components/Menu";
import { useEffect, useState } from 'react';
import SubNav from "../components/SubNav";
import Lottery from "../contracts/Lottery.json"

const LOTTERY_TOKEN_ADDRESS = process.env.LOTTERY_TOKEN;
const privateKey: string = process.env.TOKEN_EMITTER_PRIVATE_KEY as string;

const ethers = require('ethers');
const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
const wallet = new ethers.Wallet( privateKey, provider);
const signer = wallet.connect(provider);

const lotteryAddress: string = process.env.LOTTERY_CONTRACT as string;
console.log(lotteryAddress)
const lotteryContract = new ethers.Contract(lotteryAddress, Lottery, signer);


  






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

  const singleBet = async () => {
    const tx = await lotteryContract.bet({
      method: 'bet',
      params: [{
        from: account,
        to: lotteryAddress
    }]
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
          <div className="text-white container" >
            
            <div className="row mb-3 mt-5 px-5">
            
            
            <section className="col form-control card bg-light border-success  ">
              <h5 className="text-dark p-3 mb-1"> 
              <div className="mb-1">Single bet: </div><br></br>
              
              <button  onClick={singleBet}>
              Process bet
              </button>
              
              </h5>
              
            </section>
            <section className="d-inline-block col card bg-light border-success form-control">
              <h5 className="text-black "> 
              Multiple bets: <br/>
              <div className="grid">
              <form id='myForm' action='/api/request' method='post'>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder='Amount of Bets' value={amount} onChange={event => setAmount(event.target.value)} name='amount' id='amount'/>
                  
                </div>
              
              
              <button className=' btn-lg justify-text-center ' type="submit" onClick={purchaseTokens}>Process bets</button>
              </form>
          </div> 
              </h5>
              
            </section>
            </div>
            <div className="row mb-3">
            
            <section className="col  ">
              <h5 className="text-dark p-3 mb-1"> 
              <div className="mb-2">Prize withdrawal: </div>
              
              <button  onClick={requestTokens}>
              Request tokens won
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

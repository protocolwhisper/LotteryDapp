import Link from "next/link";
import Head from "next/head";
import NavBar from "../components/Menu";
import { useState } from 'react';
import SubNav from "../components/SubNav";
import Lottery from "../contracts/Lottery.json"
import { SendTransaction } from "../components/transactions/SendTransaction";
import { SingleBet } from "../components/transactions/SingleBet";
import { SingleAllowance } from "../components/transactions/SingleAllowance";
import { MultiBets } from "../components/transactions/MultiBets";
import { MultiAllowances } from "../components/transactions/MultiAllowances";

const ethers = require('ethers');
const provider = new ethers.providers.AlchemyProvider('goerli', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
const privateKey = process.env.NEXT_PUBLIC_PRI_KEY;

const lotteryAddress: string = process.env.NEXT_PUBLIC_LOTTERY_CONTRACT as string;

const singleBet = async () => {

  const privateKey = process.env.NEXT_PUBLIC_PRI_KEY;
 
  const wallet = await new ethers.Wallet( process.env.NEXT_PUBLIC_PRI_KEY, provider);
  const signer = wallet.connect(provider);
  const lotteryContract = new ethers.Contract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT, Lottery, signer);
  const tx = await lotteryContract.bet({gasLimit: 500000})
  console.log({tx})

  const receipt = tx.wait();
  console.log({receipt})
} 

const multipleBets = async (amount: string) => {

  const privateKey = process.env.NEXT_PUBLIC_PRI_KEY;
 
  const wallet = await new ethers.Wallet( process.env.NEXT_PUBLIC_PRI_KEY, provider);
  const signer = wallet.connect(provider);
  const lotteryContract = new ethers.Contract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT, Lottery, signer);
  const tx = await lotteryContract.betMany(parseInt(amount), {gasLimit: 700000})
  console.log({tx})

  const receipt = tx.wait();
  console.log({receipt})
} 

  






function Home() {
  //const { account, library } = useWeb3React();
 
  const [amount, setAmount] = useState('');
 

  //const isConnected = typeof account === "string" && !!library;

  const requestTokens = async () => {
  
    let response = await fetch("/api/requestTokens", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      //body: JSON.stringify({address: account})
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
        <div >
          <div className="shadow-lg w-25 bg-cyan bg-gradient rounded container-sm">
            <SingleAllowance/>
            <SingleBet/>
          </div>
          
         
          
        </div>
       
        

        {/*isConnected && (
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
              <form id='myForm'  method='post' >
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder='Amount of Bets' value={amount} onChange={event => setAmount(event.target.value)} name='amount' id='amount'/>
                  
                </div>
              
              
              <button className=' btn-lg justify-text-center ' type="button" onClick={function(){multipleBets(amount)}}>Process bets</button>
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
          
        )*/}

        {/*!isConnected && (
          <section className="p-5">
            <h5> Please connect to get started with EnLotto</h5>
          </section>
        )*/}

        <section className="pt-5 ">
        <button className="m-2 btn btn-dark"><Link href="/" className="text-white fw-bold"> Return home</Link></button>
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

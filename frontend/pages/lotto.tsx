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
import dynamic from "next/dynamic";
const  GetBalance = dynamic(() => import('../hooks/GetBalance'), { ssr: false })

const ethers = require('ethers');
const provider = new ethers.providers.AlchemyProvider('goerli', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);


const lotteryAddress: string = process.env.NEXT_PUBLIC_LOTTERY_CONTRACT as string;


  



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
       
          <div className="shadow-lg w-25 bg-cyan bg-gradient rounded container-sm">
            <SingleAllowance/>
            <SingleBet/>
          </div>
          
         
          

       


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

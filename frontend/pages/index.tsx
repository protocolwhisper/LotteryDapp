import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import NavBar from "../components/Menu";
import Image from 'next/image';
import lotteryImg from "../images/lottery.png"

function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();
 

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>EnLotto</title>
        <link rel="icon" href="/lottery.png" />
      </Head>
      <header>
      <NavBar/>
      
      </header>
     
        <nav>
          <Link href="/">
            <a>EnLotto</a>
          </Link>
          

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      

      <main>
        
        <h1 className="pt-5 mt-5">
          <div className="mb-2">EnLotto</div> <br></br><div><Image 
          
        src={lotteryImg}
        alt='f'
     
        width={200}
        height={200}
        ></Image></div>
      
          
        </h1>
        <h2 className="pt-3 mt-3 mb-4">
        A Next.js web3 application <br/>
          Made by ProtocolWhisper and JoVi
        </h2>

        <section className="mb-4">
            <button className="m-2"><a href="/token">Get tokens</a></button>
            <button className="m-2"><a href="/lotto">Visit the Lottery</a></button>
        </section>

        {isConnected && (
          <section >
            <ETHBalance />

          </section>
        )}
        
   
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

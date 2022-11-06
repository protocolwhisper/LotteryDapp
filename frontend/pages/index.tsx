import Link from "next/link";
import Head from "next/head";
import NavBar from "../components/Menu";
import Image from 'next/image';
import lotteryImg from "../images/lottery.png"

function Home() {




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
          
          

        </nav>
      

      <main >
        
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
        <h4>Make sure to be connected to Goerli.</h4>

        <section className="mb-4">
            <button className="m-2 btn btn-dark fw-bold"><Link href="/token" className="text-white">Get tokens</Link></button>
            <button className="m-2 btn btn-dark fw-bold"><Link href="/lotto" className="text-white">Visit the Lottery</Link></button>
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

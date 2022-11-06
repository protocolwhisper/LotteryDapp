import { useEffect, useState } from 'react';

import Image from 'next/image';

import lotteryImg from "../images/lottery.png"
import GetBalance from '../hooks/GetBalance';

function hexToDec(hexString: string){
  return parseInt(hexString, 16);
}

function SubNav() {
    
    const [isOpen, setIsOpen] = useState(false);

    
  useEffect(() => {
    const fetchStatus = async () => {
      let response = await fetch("/api/betStatus");
      const data = await response.json();
     
    if (response.ok && response.body){
        setIsOpen(response.body.locked)
    } else{
      console.log("HTTP-Error: " + response.status);
    }
    }
    fetchStatus()
  },[])
  


  return (
    <div>
        <section className="p-5 mt-5">
        {
          isOpen && (
            <h4 >
            EnLotto is currently <b className="text-success">open</b> for bets
            </h4>
          )

        }
        {
          !isOpen && (
            <h4>
            EnLotto is currently <b className="text-danger">closed </b> for bets
            </h4>
          )

        }
        </section>
        { /*account && (
        <section><h4 className="text-dark">
        {`${ENSName || `${shortenHex(account, 4)}`}'s $LTO Balance`}: {(balance ?? 0)}
        </h4></section> )
        */}
        <section >
          <Image 
          
        src={lotteryImg}
        alt='f'
     
        width={50}
        height={50}
        ></Image>
        </section>
        <GetBalance/>
    </div> )}

export default SubNav;
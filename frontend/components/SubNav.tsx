import { useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import Image from 'next/image';
import useENSName from "../hooks/useENSName";
import { shortenHex } from "../util";
import lotteryImg from "../images/lottery.png"


function SubNav() {
    const { account } = useWeb3React();
    const [isOpen, setIsOpen] = useState(false);
    const [balance, setBalance] = useState('');
    const ENSName = useENSName(account);
  useEffect(() => {
    const fetchStatus = async () => {
      let response = await fetch("/api/betStatus");
      
    if (response.ok){
        setIsOpen(response.body.locked)
    } else{
      console.log("HTTP-Error: " + response.status);
    }
    }
    fetchStatus()
  },[])
  useEffect(() => {
    
    const fetchBalance = async () => {
      let response = await fetch("/api/balance", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({address: account})
      });
     
      
      console.log({response})
    if (response){
        console.log({response})
        
    } else{
        
      console.log("HTTP-Error: " + response.status);
    }
    }
    fetchBalance()
  },[account])


  return (
    <div>
        <section className="p-5 mt-5">
        {
          isOpen && (
            <h4 className="text-success">
            EnLotto is currently open for bets
            </h4>
          )

        }
        {
          !isOpen && (
            <h4 className="text-danger">
            EnLotto is currently closed for bets
            </h4>
          )

        }
        </section>
        { account && (
        <section><h4 className="text-dark">
        {`${ENSName || `${shortenHex(account, 4)}`}'s $LTO Balance`}: {(balance.response ?? 0)}
        </h4></section> )
        }
        <section >
          <Image 
          
        src={lotteryImg}
        alt='f'
     
        width={50}
        height={50}
        ></Image>
        </section>
    </div> )}

export default SubNav;
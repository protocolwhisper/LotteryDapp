import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
const Lottery = require('../../contracts/Lottery.json');


export function MultiBets() {
  
  const lotteryContractAddress: any= '0x9cbd6c632d135e16bf69e2a2834f96a1c924b802';

  const { config } = usePrepareContractWrite({
    addressOrName: lotteryContractAddress,
    contractInterface: Lottery,
    functionName: 'bet',
    
  })
  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div className='container-sm'>
    
        <div className=" d-inline-block align-items-center">
        <section className="   ">
              <h5 className="text-dark "> 
              <h5 className='text-warning'>2st step</h5>
              <button  className="btn btn-dark text-white " disabled={!write || isLoading} onClick={() => {if(write){write()}}}>
              {isLoading ? 'Processing Bet...' : 'Single Bet'}
              </button>
              {isSuccess && (
                   <div>
                     Successfully emmited a single bet!
                     <div>
                       <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                     </div>
                   </div>
              )}
              </h5>
              
            </section>
      
      
      </div>
   
    </div>
  )
}
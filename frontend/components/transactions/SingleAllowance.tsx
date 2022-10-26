import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
const LotteryToken = require('../../contracts/LotteryToken.json');


export function SingleAllowance() {
  
  const lotteryContractAddress: any= '0xF4F46B122a85301597b2Bef4eEdEfEdf59801303';

  const { config } = usePrepareContractWrite({
    addressOrName: lotteryContractAddress,
    contractInterface: LotteryToken,
    functionName: 'increaseAllowance',
    args:['0x9cbd6c632d135e16bf69e2a2834f96a1c924b802', 1100]
    
  })
  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div className='container-sm'>
    
        <div className="d-inline-block card border-success  mt-3  align-items-center">
        <section className="   ">
              <h5 className="text-dark p-3 "> 
              <h5 className='text-success'>1st step</h5>
              <div className="">Create allowance: </div>
              
              <button className='btn btn-dark text-white mt-2' disabled={!write || isLoading} onClick={() => {if(write){write()}}}>
              {isLoading ? 'Processing allowance...' : 'Allowance for a single bet'}
              </button>
              {isSuccess && (
                   <div>
                     Successfully emmited allowance! Please refresh your page to emit a bet.
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
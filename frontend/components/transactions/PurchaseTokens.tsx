import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useDebounce } from 'use-debounce';
import { BigNumber, BigNumberish, utils } from 'ethers';
const Lottery = require('../../contracts/Lottery.json');


export function PurchaseTokens() {
  const [amount, setAmount] = React.useState("0.05")

  const debouncedAmount = useDebounce(amount, 500);
  const lotteryContractAddress: any= '0x9cbd6c632d135e16bf69e2a2834f96a1c924b802';

  const { config } = usePrepareContractWrite({
    addressOrName: lotteryContractAddress,
    contractInterface: Lottery,
    functionName: 'purchaseTokens',
    overrides: {
        value: debouncedAmount ? utils.parseEther(debouncedAmount[0]) : undefined,
    },
    
  })
  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div className='container-sm'>
    <form className=" d-inline-block container align-items-center"
      onSubmit={(e) => {
        e.preventDefault()
        write?.()
      }}
    >
        <div className=" d-inline-block container align-items-center">
       <input
         className=" mb-2 rounded bg-light border-light text-lg"
        id="amount"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.05"
        value={amount}
      />
      <br/>
      
      <button className='btn btn-light ' disabled={!write || isLoading} onClick={() => {if(write){write()}}}>
        {isLoading ? 'Processing Purchase...' : 'Purchase Tokens'}
      </button>
      {isSuccess && (
        <div>
          Successfully purchased tokens!
          <div>
            <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      </div>
    </form>
    </div>
  )
}
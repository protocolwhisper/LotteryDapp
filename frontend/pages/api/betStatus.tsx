// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Lottery from "../../contracts/Lottery.json"
import LotteryToken from "../../contracts/LotteryToken.json"
const ethers = require('ethers');
const provider = new ethers.providers.AlchemyProvider('goerli', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
const lotteryAddress: string = process.env.NEXT_PUBLIC_LOTTERY_CONTRACT as string;

async function isBetOpen(){
    
  const lotteryContract = new ethers.Contract(lotteryAddress, Lottery, provider)
  
  const betsStatus = await lotteryContract.betsOpen();
  console.log({betsStatus})
  return betsStatus;
  

}


type Data = {
  response: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>){
        
      try{
        
        let response = await isBetOpen();
        console.log({response})
       
        console.log(3)
        res.status(200).send( response )
      }catch(e){
        res.status(400).json({ response: 'Method not allowed ' + e })
      }

    }
  
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import LotteryToken from "../../contracts/LotteryToken.json"
const ethers = require('ethers');
const provider = new ethers.providers.AlchemyProvider('goerli', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

const tokenContractAddress: string = process.env.NEXT_PUBLIC_LOTTERY_TOKEN as string;


async function getBalance(walletAddress: any){

  const tokenContract = new ethers.Contract(tokenContractAddress, LotteryToken, provider)

  const userBalance = await tokenContract.balanceOf(walletAddress);
 


  return userBalance;
}



type Data = {
  balance: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>){
    const userWallet = req.body.address;
      
    if (req.method === 'POST') {
      try{
        let av = await getBalance(userWallet)
       
        res.json({balance: av })
      }catch(e){
        res.status(400).json({ balance: 'Method not allowed ' + e })
      }
      }

    
  


  }
  

   
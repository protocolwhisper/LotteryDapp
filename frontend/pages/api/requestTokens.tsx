// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Lottery from "../../contracts/Lottery.json"
import LotteryToken from "../../contracts/LotteryToken.json"
const ethers = require('ethers');
const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
const privateKey: string = process.env.TOKEN_EMITTER_PRIVATE_KEY as string;
const tokenContractAddress: string = process.env.LOTTERY_TOKEN as string;

async function mintTokens(userWallet: string){
  const wallet = await new ethers.Wallet( privateKey, provider);
  const signer = wallet.connect(provider);
  console.log({signer})
  console.log({tokenContractAddress})
  const tokenContract = new ethers.Contract(tokenContractAddress, LotteryToken, signer)

  
  const mintTokenTx = await tokenContract.mint(userWallet, "1000", {gasLimit: 500000});
  await mintTokenTx.wait();
  

}


type Data = {
  response: string,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>){
      const userWallet = req.body.address;
      
      
    if (req.method === 'POST') {
      try{
        mintTokens(userWallet)
        res.status(200).json({ response: 'Tokens succesfully emmited for ' + req.body.address + ". You can now take part at EnLotto." })
      }catch(e){
        res.status(400).json({ response: 'Method not allowed ' + e })
      }
      }

    else{
        res.status(400).json({ response: 'Method not allowed' })
    }
  
    }
  
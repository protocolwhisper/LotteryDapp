
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import { Lottery, LotteryToken } from "../typechain-types";
import * as readline from "readline"
let contract: Lottery;
let token: LotteryToken;
let accounts: SignerWithAddress[];

const BET_PRICE = 1;
const BET_FEE = 0.2;

async function main() {
  await initContracts();
  await initAccounts();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  mainMenu(rl);
}

async function initContracts() {
  // TODO: set up contracts
  const contractFactory = await ethers.getContractFactory("Lottery")
  contract = await contractFactory.deploy("LotteryToken" , "LTO" , ethers.utils.parseEther(BET_PRICE.toFixed(18)), ethers.utils.parseEther(BET_FEE.toFixed(18))) as Lottery
  await contract.deployed()
  const tokenAddress = await contract.paymentToken() 
  // Then we get the factory so we can attach it to the address that the SC gave us 
  const tokenFactory = await ethers.getContractFactory("LotteryToken")
  token = tokenFactory.attach(tokenAddress) as LotteryToken

}

async function initAccounts() {
  accounts = await ethers.getSigners()
  // Implement metamask or wallet connect here?
}

async function mainMenu(rl: readline.Interface) {
  menuOptions(rl);
}

function menuOptions(rl: readline.Interface) {
  rl.question(
    "Select operation: \n Options: \n [0]: Exit \n [1]: Check state \n [2]: Open bets \n [3]: Top up account tokens \n [4]: Bet with account \n [5]: Close bets \n [6]: Check player prize \n [7]: Withdraw \n [8]: Burn tokens \n",
    async (answer: string) => {
      console.log(`Selected: ${answer}\n`);
      const option = Number(answer);
      switch (option) {
        case 0:
          rl.close();
          return;
        case 1:
          await checkState();
          mainMenu(rl);
          break;
        case 2:
          rl.question("Input duration (in seconds)\n", async (duration) => {
            try {
              await openBets(duration);
            } catch (error) {
              console.log("error\n");
              console.log({ error });
            }
            mainMenu(rl);
          });
          break;
        case 3:
          rl.question("What account (index) to use?\n", async (index) => {
            await displayBalance(index);
            rl.question("Buy how many tokens?\n", async (amount) => {
              try {
                await buyTokens(index, amount);
                await displayBalance(index);
                await displayTokenBalance(index);
              } catch (error) {
                console.log("error\n");
                console.log({ error });
              }
              mainMenu(rl);
            });
          });
          break;
        case 4:
          rl.question("What account (index) to use?\n", async (index) => {
            await displayTokenBalance(index);
            rl.question("Bet how many times?\n", async (amount) => {
              try {
                await bet(index, amount);
                await displayTokenBalance(index);
              } catch (error) {
                console.log("error\n");
                console.log({ error });
              }
              mainMenu(rl);
            });
          });
          break;
        case 5:
          try {
            await closeLottery();
          } catch (error) {
            console.log("error\n");
            console.log({ error });
          }
          mainMenu(rl);
          break;
        case 6:
          rl.question("What account (index) to use?\n", async (index) => {
            const prize = await contract.connect(index).prize(index)
            if (Number(prize) > 0) {
              rl.question(
                "Do you want to claim your prize? [Y/N]\n",
                async (answer) => {
                  if (answer.toLowerCase() === "y") {
                    try {
                      await claimPrize(index, prize.toString());
                    } catch (error) {
                      console.log("error\n");
                      console.log({ error });
                    }
                  }
                  mainMenu(rl);
                }
              );
            } else {
              mainMenu(rl);
            }
          });
          break;
        case 7:
          await displayTokenBalance("0");
          await displayOwnerPool();
          rl.question("Withdraw how many tokens?\n", async (amount) => {
            try {
              await withdrawTokens(amount);
            } catch (error) {
              console.log("error\n");
              console.log({ error });
            }
            mainMenu(rl);
          });
          break;
        case 8:
          rl.question("What account (index) to use?\n", async (index) => {
            await displayTokenBalance(index);
            rl.question("Burn how many tokens?\n", async (amount) => {
              try {
                await burnTokens(index );//, amount);
              } catch (error) {
                console.log("error\n");
                console.log({ error });
              }
              mainMenu(rl);
            });
          });
          break;
        default:
          throw new Error("Invalid option");
      }
    }
  );
}

async function checkState() {
  // TODO
  const state = await contract.betsOpen()
  console.log(`The lottery is ${state ? "open" : "closed"}/n`)
  if(!state) return;
  const currentBlock = await ethers.provider.getBlock("latest")
  // console.log(currentBlock.timestamp)
  const currentBlockDate = new Date(currentBlock.timestamp * 1000)
  const closingTime = await contract.betsClosingTime()
  const betsClosingTimeDate = new Date(closingTime.toNumber() * 1000)
  console.log( `The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}\n` ); 
  console.log( `lottery should close at ${betsClosingTimeDate.toLocaleDateString()} : ${betsClosingTimeDate.toLocaleTimeString()}\n` )
}

async function openBets(duration: string) {
    const currentBlock = await ethers.provider.getBlock("latest")
    const tx = await contract.openBets(currentBlock.timestamp + Number(duration) ) // This is 
    const receipt = await tx.wait()
    console.log(`The bet was oppened at this ${receipt.transactionHash} hash`)
}

async function displayBalance(index: string) {
  const balanceBN = await accounts[Number(index)].getBalance() // We can use ethers to here --- await ethers.provider.getBalance(acccounts[Number(index).address])
  const balance = ethers.utils.formatEther(balanceBN);
  console.log(`The account of address ${[Number(index)]} has ${balance} of ETH/n`)
}

async function buyTokens(index: string, amount: string) {
  // TODO
  const tx = await contract.connect(accounts[Number(index)]).purchaseTokens({
    value: ethers.utils.parseEther(amount) , 
  })

  const receipt = tx.wait()
  console.log(`Tokens bought (${(await receipt).transactionHash})/n`)
}

async function displayTokenBalance(index: string) {
  // TODO
  

}

async function bet(index: string, amount: string) {
  const allowtx = await token.connect(accounts[Number(index)]).approve(contract.address , ethers.constants.MaxUint256)
  // TODO
  const tx = await contract.connect(accounts[Number(index)]).betMany(amount)
  const receipt = await tx.wait()
  console.log(`Bets placed ${receipt.transactionHash}`)

}

async function closeLottery() {
  // TODO
  const closeTx = await contract.connect(accounts[0]).closeLottery()
  const receipt = closeTx.wait()
  console.log(`The lotterry is closed with this Tx hash ${(await receipt).transactionHash}`)
}

async function displayPrize(index: string) {
  // TODO
  const prizeTx = await contract.connect(accounts[Number(index)]).prizePool()
  console.log(`The currrent pool price is ${ethers.utils.formatEther(prizeTx)}`)

}

async function claimPrize(index: string, amount: string) {
  const prizeTx = await contract.connect(accounts[Number(index)]).prizeWithdraw(Number(amount))
  const prizeReceipt = prizeTx.wait()
  console.log(`Prize of ${Number(amount)} was claimed to the address ${accounts[Number(index)].address}.`)
  // TODO
}

async function displayOwnerPool() {
  const ownertx = await contract.connect(accounts[0]).ownerPool()
  console.log(`The owners pool have this ${ethers.utils.formatEther(ownertx)}`)
}

async function withdrawTokens(amount: string) {
  const withdrawtx = await contract.connect(accounts[0]).returnTokens(Number(amount))
  // May we estimates gas fees here 
  console.log(`You burn ERC20 ${Number(amount)}tokens and recieve this ETH ${Number(amount)}`)
}

async function burnTokens(amount: string) {
  withdrawTokens(amount)
  // We need to implement metamask to it so it can make more sense
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
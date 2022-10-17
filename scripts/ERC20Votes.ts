import {ethers} from "hardhat"
import  * as dotenv from "dotenv"
import {MyToken} from "../typechain-types"
dotenv.config()

const TOKEN_MINT = ethers.utils.parseEther("1")
async function main () {
    const [deployer , acc1 , acc2] = await ethers.getSigners()
    const myTokenContractFactory = await ethers.getContractFactory("MyToken") 
    const myTokenContract = await myTokenContractFactory.deploy() as MyToken
    await myTokenContract.deployed()
    console.log(` My token contract was deployed at address ${myTokenContract.address}`)

    const initialVotes = await myTokenContract.getVotes(acc1.address)
    console.log(`At deployment acc1 has voting power of ${initialVotes}`)
    const totalSupply = await myTokenContract.totalSupply()
    console.log(`At deployment this contract has a totalsSupply of ${totalSupply}`)

    const mintTx = await myTokenContract.mint(acc1.address , TOKEN_MINT)
    await mintTx.wait()
    const totalSupplyAfterMint = await myTokenContract.totalSupply()
    console.log(`After minting the totalsSupply is ${ethers.utils.formatEther(totalSupplyAfterMint)}`) // This only works if we hace 18 decimals otherwhise we need to
    // use units and pass the decimals that we are using 
    const acc1Balance = await myTokenContract.balanceOf(acc1.address)
    console.log(`After minting the acc1 has a balance of ${ethers.utils.formatEther(acc1Balance)}`)
    const delegateitself = await myTokenContract.connect(acc1).delegate(acc1.address)
    await delegateitself.wait()
    console.log(`Account 1 has delegate it itself to keep track`)
    const votesAfterMint = await myTokenContract.getVotes(acc1.address)
    console.log(`After delegate acc1 has voting power of ${ethers.utils.formatEther(votesAfterMint)}`)
    
    const currentBlock = await ethers.provider.getBlock("latest")
    console.log(` The currentBlock is ${currentBlock.number}`)

    //How to mine a block in the Virtual Machine 
    const mintTx1 = await myTokenContract.mint(acc1.address , 0)
    await mintTx1.wait()

    const mintTx2 = await myTokenContract.mint(acc1.address , 0)
    await mintTx2.wait()

    const mintTx3 = await myTokenContract.mint(acc1.address , 0)
    await mintTx3.wait()
    // Blocks only are mined if u make a transaction (Supposely)
    const pastVotes = await Promise.all([
        myTokenContract.getPastVotes(acc1.address , 4),
        myTokenContract.getPastVotes(acc1.address , 3),
        myTokenContract.getPastVotes(acc1.address , 2),
        myTokenContract.getPastVotes(acc1.address , 1),
        myTokenContract.getPastVotes(acc1.address , 0),
    ]) // This is how we can get data from the past

    console.log(pastVotes)
}

main().catch((error) => {
    console.error(error);
    process.exitCode =1;
})
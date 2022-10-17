import { expect } from "chai";
import { ethers } from "hardhat";
import {TokenSale} from "../typechain-types"

const TOKEN_RATIO = 5;

describe("Nft Market Place" , async () => {
let Mycontract: TokenSale
let initial_supply = 10000

    beforeEach(async () => {
        const MycontractFactory = await ethers.getContractFactory("TokenSale")
        Mycontract = await MycontractFactory.deploy(TOKEN_RATIO) as TokenSale
        await Mycontract.deployed()
    })

    it("should have zerio initial supply" , async () => {
        const totalSupply = await Mycontract.totalSupply()
        const realsupply = 
        //IMport decimals
        //Parse float to int 
        expect(totalSupply).to.equal(0)
    })

    
})


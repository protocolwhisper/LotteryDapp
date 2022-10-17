import { expect } from "chai";
import { ethers } from "hardhat";
import {GLDToken} from "../typechain-types"

describe("ERC20 basic functions" , async () => {
let Mycontract: GLDToken
let initial_supply = 10000

    beforeEach(async () => {
        const MycontractFactory = await ethers.getContractFactory("GLDToken")
        Mycontract = await MycontractFactory.deploy(initial_supply) as GLDToken
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
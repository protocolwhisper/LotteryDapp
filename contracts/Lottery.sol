//SPDX-License-Identifier: MIT

pragma solidity >0.7.0 <=0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import {LotteryToken} from "./Token.sol";

contract Lottery is Ownable {
    LotteryToken public paymentToken;
    uint256 public betsClosingTime;
    uint256 public betFee;
    uint256 public betPrice;
    bool public betsOpen; // False by default

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 fee,
        uint256 _betPrice
    ) {
        paymentToken = new LotteryToken(tokenName, tokenSymbol);
        betFee = fee;
        betPrice = _betPrice;
    }

    modifier whenBetClosed() {
        require(!betsOpen, "Lottery is open");
        _;
    }

    modifier whenBetsOpen() {
        require(
            betsOpen && block.timestamp < betsClosingTime,
            "Lottery is closed"
        );

        _;
    }

    /// @param closingTime Amount of seconds that the bets can be placed after opening
    function openBets(uint256 closingTime) public onlyOwner whenBetClosed {
        require(
            closingTime > block.timestamp,
            "Closing time must be in the future"
        );
        betsClosingTime = closingTime;
        betsOpen = true;
    }

    function purchaseTokens() public payable {
        paymentToken.mint(msg.sender, msg.value);
    }

    function bet() public whenBetsOpen {
        //Update the pools
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TradingPlatform {
    IERC20 public token;
    address public owner;
    uint256 public tokenPrice; // Price of 1 token in wei

    event TokensPurchased(address indexed buyer, uint256 amount);
    event TokensSold(address indexed seller, uint256 amount);

    constructor(address _token, uint256 _tokenPrice) {
        token = IERC20(_token);
        owner = msg.sender;
        tokenPrice = _tokenPrice;
    }

    // Function to buy tokens
    function buyTokens() external payable {
        require(msg.value > 0, "Send ETH to buy tokens");
        uint256 amountToBuy = (msg.value * 10**18) / tokenPrice;
        require(token.balanceOf(address(this)) >= amountToBuy, "Not enough tokens in contract");

        token.transfer(msg.sender, amountToBuy);
        emit TokensPurchased(msg.sender, amountToBuy);
    }

    // Function to sell tokens
    function sellTokens(uint256 _amount) external {
        require(token.balanceOf(msg.sender) >= _amount, "Not enough tokens");
        uint256 ethAmount = (_amount * tokenPrice) / 10**18;
        require(address(this).balance >= ethAmount, "Not enough ETH in contract");

        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(ethAmount);
        emit TokensSold(msg.sender, _amount);
    }

    // Function to withdraw ETH by the owner
    function withdrawETH() external {
        require(msg.sender == owner, "Only owner can withdraw ETH");
        payable(owner).transfer(address(this).balance);
    }

    // Function to withdraw tokens by the owner
    function withdrawTokens(uint256 _amount) external {
        require(msg.sender == owner, "Only owner can withdraw tokens");
        token.transfer(owner, _amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MyToken_n.sol";
import "./BondingCurve.sol";

contract TradingContract {
    MyToken_n public token;
    BondingCurve public bondingCurve;
    address public owner;

    event TokensBought(address indexed buyer, uint256 amount, uint256 price);
    event TokensSold(address indexed seller, uint256 amount, uint256 price);

    constructor(address _token, address _bondingCurve, address _owner) {
        token = MyToken_n(_token);
        bondingCurve = BondingCurve(_bondingCurve);
        owner = _owner;
    }

    function buyTokens(uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than zero");

        // Get the current token supply from MyToken_n contract
        uint256 currentSupply = token.totalSupply();
        // Calculate price using the updated linear formula
        uint256 price = bondingCurve.getBuyPrice(amount, currentSupply);
        require(msg.value >= price, "Insufficient ETH sent");

        // Mint new tokens to the buyer
        token.mint(msg.sender, amount);
        emit TokensBought(msg.sender, amount, price);
    }

    function sellTokens(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(token.balanceOf(msg.sender) >= amount, "Insufficient tokens");

        uint256 currentSupply = token.totalSupply();
        uint256 price = bondingCurve.getSellPrice(amount, currentSupply);

        // Burn tokens from the seller
        token.burn(msg.sender, amount);
        // Transfer ETH back to the seller
        payable(msg.sender).transfer(price);
        emit TokensSold(msg.sender, amount, price);
    }
}

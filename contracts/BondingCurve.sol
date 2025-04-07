// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BondingCurve {
    // Constants for our bonding curve
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 1e18; // 1 Billion Tokens
    uint256 public constant CURVE_SUPPLY = 800_000_000 * 1e18; // 800 Million in bonding curve

    // Set a base price (in wei) and a slope for linear price increase.
    uint256 public constant BASE_PRICE = 1e14; // 0.0001 ETH per token as base price
    uint256 public constant SLOPE = 1e6;       // Slope factor (adjustable)

    // Calculate buy price using a linear formula:
    // pricePerToken = BASE_PRICE + (SLOPE * currentSupply / 1e18)
    // Total cost = pricePerToken * amount
    function getBuyPrice(uint256 amount, uint256 currentSupply) public pure returns (uint256) {
        require(amount > 0, "Amount must be greater than zero");
        uint256 pricePerToken = BASE_PRICE + ((SLOPE * currentSupply) / 1e18);
        return pricePerToken * amount;
    }

    // Calculate sell price similarly:
    // Uses (currentSupply - amount) to compute a slightly lower price as supply decreases.
    function getSellPrice(uint256 amount, uint256 currentSupply) public pure returns (uint256) {
        require(amount > 0, "Amount must be greater than zero");
        require(currentSupply >= amount, "Insufficient supply for sell");
        uint256 pricePerToken = BASE_PRICE + ((SLOPE * (currentSupply - amount)) / 1e18);
        return pricePerToken * amount;
    }
}

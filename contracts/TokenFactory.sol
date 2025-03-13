// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MyToken.sol";

contract TokenFactory {
    struct TokenDetails {
        address tokenAddress;
        string name;
        string symbol;
        address creator;
    }

    TokenDetails[] public allTokens;
    mapping(address => TokenDetails) public tokensByCreator;

    event TokenCreated(address indexed tokenAddress, string name, string symbol, address creator);

    function createToken(string memory name, string memory symbol, uint256 initialSupply) external {
        MyToken newToken = new MyToken(name, symbol, initialSupply);
        TokenDetails memory details = TokenDetails(address(newToken), name, symbol, msg.sender);
        
        allTokens.push(details);
        tokensByCreator[msg.sender] = details;

        emit TokenCreated(address(newToken), name, symbol, msg.sender);
    }

    function getAllTokens() external view returns (TokenDetails[] memory) {
        return allTokens;
    }
}

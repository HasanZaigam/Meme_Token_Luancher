// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MyToken_n.sol";
import "./TradingContract.sol";
import "./BondingCurve.sol";

contract TokenFactory_n {
    struct TokenDetails {
        address tokenAddress;
        address tradingContract;
        string name;
        string symbol;
        address creator;
        address bondingCurve;
    }

    TokenDetails[] public allTokens;

    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        address tradingContract,
        address bondingCurve,
        address creator
    );

    function createToken(string memory name, string memory symbol) external {
        // Deploy new token
        MyToken_n newToken = new MyToken_n(name, symbol);
        
        // Deploy bonding curve
        BondingCurve bondingCurve = new BondingCurve();
        
        // Deploy trading contract with all required parameters
        TradingContract trading = new TradingContract(
            address(newToken),
            address(bondingCurve),
            msg.sender
        );

        // Set trading contract in token
        newToken.setTradingContract(address(trading));

        // Create token details
        TokenDetails memory details = TokenDetails({
            tokenAddress: address(newToken),
            tradingContract: address(trading),
            name: name,
            symbol: symbol,
            creator: msg.sender,
            bondingCurve: address(bondingCurve)
        });

        // Store token details
        allTokens.push(details);

        // Emit event
        emit TokenCreated(
            address(newToken),
            name,
            symbol,
            address(trading),
            address(bondingCurve),
            msg.sender
        );
    }

    function getAllTokens() external view returns (TokenDetails[] memory) {
        return allTokens;
    }
}
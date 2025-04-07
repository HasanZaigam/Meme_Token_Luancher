// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken_n is ERC20 {
    address public tradingContract; // Only Trading Contract can mint/burn

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    modifier onlyTradingContract() {
        require(msg.sender == tradingContract, "Not authorized");
        _;
    }

    function setTradingContract(address _tradingContract) external {
        require(tradingContract == address(0), "Trading contract already set");
        tradingContract = _tradingContract;
    }

    function mint(address to, uint256 amount) external onlyTradingContract {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyTradingContract {
        _burn(from, amount);
    }
}



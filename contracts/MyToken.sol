// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
   
   address public owner;

   constructor(string memory _name, string memory _symbol, uint256 _initialSupply) ERC20(_name, _symbol){
    owner = msg.sender;
    _mint(owner, _initialSupply * (10 ** decimals()));
   }
   
   function mint(address to, uint256 amount) public {
    require(msg.sender == owner, "Only owner can mint");
    _mint(to, amount);
   }
   
}
   
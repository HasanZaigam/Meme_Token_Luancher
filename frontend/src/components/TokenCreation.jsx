import React, { useState } from "react";
import { ethers } from "ethers";
import MyTokenABI from "../abis/TokenFactory.json"; // Make sure you have the ABI

const TokenCreation = ({ signer }) => {
  const [tokenName, setTokenName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");

  const handleCreateToken = async () => {
    if (!signer) {
      alert("Please connect wallet first.");
      return;
    }

    const tokenFactoryAddress = process.env.REACT_APP_TOKEN_FACTORY; // Load from .env
    const tokenFactory = new ethers.Contract(tokenFactoryAddress, MyTokenABI, signer);

    try {
      const tx = await tokenFactory.createToken(tokenName, symbol, ethers.parseEther(totalSupply));
      await tx.wait();
      alert("Token Created Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating token.");
    }
  };

  return (
    <div>
      <h2>Create a New Token</h2>
      <input type="text" placeholder="Token Name" onChange={(e) => setTokenName(e.target.value)} />
      <input type="text" placeholder="Symbol" onChange={(e) => setSymbol(e.target.value)} />
      <input type="number" placeholder="Total Supply" onChange={(e) => setTotalSupply(e.target.value)} />
      <button onClick={handleCreateToken} className="bg-green-500 text-white p-2 rounded">
        Create Token
      </button>
    </div>
  );
};

export default TokenCreation;

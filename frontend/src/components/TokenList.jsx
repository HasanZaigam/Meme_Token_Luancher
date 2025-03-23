import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TokenFactoryABI from "../abis/TokenFactory.json"; // Token Factory ABI

const TokenList = ({ provider }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!provider) return;

      const tokenFactoryAddress = process.env.REACT_APP_TOKEN_FACTORY;
      const tokenFactory = new ethers.Contract(tokenFactoryAddress, TokenFactoryABI, provider);

      try {
        const tokenCount = await tokenFactory.getTokenCount();
        let tokensArray = [];

        for (let i = 0; i < tokenCount; i++) {
          const tokenAddress = await tokenFactory.getToken(i);
          tokensArray.push(tokenAddress);
        }

        setTokens(tokensArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTokens();
  }, [provider]);

  return (
    <div>
      <h2>Available Tokens</h2>
      <ul>
        {tokens.length > 0 ? (
          tokens.map((token, index) => <li key={index}>{token}</li>)
        ) : (
          <p>No tokens available.</p>
        )}
      </ul>
    </div>
  );
};

export default TokenList;

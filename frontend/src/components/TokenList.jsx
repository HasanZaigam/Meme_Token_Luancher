// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import TokenFactoryABI from "../abis/TokenFactory.json"; // Ensure correct path

// const TokenList = ({ provider }) => {
//   const [tokens, setTokens] = useState([]);

//   const tokenFactoryAddress = import.meta.env.VITE_TOKEN_FACTORY;

//   useEffect(() => {
//     const fetchTokens = async () => {
//       if (!provider) {
//         console.error("No provider found");
//         return;
//       }

//       console.log("Using Token Factory Address:", tokenFactoryAddress);

//       try {
//         // Ensure ABI is passed correctly
//         const tokenFactory = new ethers.Contract(
//           tokenFactoryAddress,
//           TokenFactoryABI.abi, // ✅ Ensure ABI is an array
//           provider
//         );

//         // Use getAllTokens() instead of tokenCount()
//         const allTokens = await tokenFactory.getAllTokens();
//         console.log("Tokens:", allTokens);

//         setTokens(allTokens);
//       } catch (error) {
//         console.error("Error fetching tokens:", error);
//       }
//     };

//     fetchTokens();
//   }, [provider]);

//   return (
//     <div>
//       <h2>Created Tokens</h2>
//       {tokens.length === 0 ? (
//         <p>No tokens created yet.</p>
//       ) : (
//         <ul>
//           {tokens.map((token, index) => (
//             <li key={index}>
//               <strong>Name:</strong> {token.name} | 
//               <strong>Symbol:</strong> {token.symbol} | 
//               <strong>Address:</strong> {token.tokenAddress}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TokenList;


import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TokenFactoryABI from "../abis/TokenFactory.json"; // Ensure correct path

const TokenList = ({ provider }) => {
  const [tokens, setTokens] = useState([]);
  const [tokenMetadata, setTokenMetadata] = useState({});

  const tokenFactoryAddress = import.meta.env.VITE_TOKEN_FACTORY;

  useEffect(() => {
    const fetchTokens = async () => {
      if (!provider) {
        console.error("No provider found");
        return;
      }

      try {
        const tokenFactory = new ethers.Contract(tokenFactoryAddress, TokenFactoryABI.abi, provider);
        const allTokens = await tokenFactory.getAllTokens();
        setTokens(allTokens);
        loadTokenMetadata();
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, [provider]);

  // ✅ Load stored token metadata from localStorage
  const loadTokenMetadata = () => {
    const storedMetadata = JSON.parse(localStorage.getItem("tokenMetadata")) || {};
    setTokenMetadata(storedMetadata);
  };

  return (
    <div>
      <h2>Created MemeCoins</h2>
      {tokens.length === 0 ? (
        <p>No tokens created yet.</p>
      ) : (
        <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              <strong>Name:</strong> {token.name} | 
              <strong>Symbol:</strong> {token.symbol} | 
              <strong>Address:</strong> {token.tokenAddress} 
              
              {/* Display Meme Image */}
              {tokenMetadata[token.tokenAddress] && (
                <div>
                  <h3>Meme Image:</h3>
                  <img src={tokenMetadata[token.tokenAddress]} alt="Meme" width="100px" />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenList;

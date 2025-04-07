// // import React, { useState, useEffect } from "react";
// // import { ethers } from "ethers";
// // import TokenFactoryABI from "../abis/TokenFactory.json"; // Ensure correct path

// // const TokenList = ({ provider }) => {
// //   const [tokens, setTokens] = useState([]);

// //   const tokenFactoryAddress = import.meta.env.VITE_TOKEN_FACTORY;

// //   useEffect(() => {
// //     const fetchTokens = async () => {
// //       if (!provider) {
// //         console.error("No provider found");
// //         return;
// //       }

// //       console.log("Using Token Factory Address:", tokenFactoryAddress);

// //       try {
// //         // Ensure ABI is passed correctly
// //         const tokenFactory = new ethers.Contract(
// //           tokenFactoryAddress,
// //           TokenFactoryABI.abi, // ✅ Ensure ABI is an array
// //           provider
// //         );

// //         // Use getAllTokens() instead of tokenCount()
// //         const allTokens = await tokenFactory.getAllTokens();
// //         console.log("Tokens:", allTokens);

// //         setTokens(allTokens);
// //       } catch (error) {
// //         console.error("Error fetching tokens:", error);
// //       }
// //     };

// //     fetchTokens();
// //   }, [provider]);

// //   return (
// //     <div>
// //       <h2>Created Tokens</h2>
// //       {tokens.length === 0 ? (
// //         <p>No tokens created yet.</p>
// //       ) : (
// //         <ul>
// //           {tokens.map((token, index) => (
// //             <li key={index}>
// //               <strong>Name:</strong> {token.name} | 
// //               <strong>Symbol:</strong> {token.symbol} | 
// //               <strong>Address:</strong> {token.tokenAddress}
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default TokenList;


// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import TokenFactoryABI from "../abis/TokenFactory.json"; // Ensure correct path

// const TokenList = ({ provider }) => {
//   const [tokens, setTokens] = useState([]);
//   const [tokenMetadata, setTokenMetadata] = useState({});

//   const tokenFactoryAddress = import.meta.env.VITE_TOKEN_FACTORY;

//   useEffect(() => {
//     const fetchTokens = async () => {
//       if (!provider) {
//         console.error("No provider found");
//         return;
//       }

//       try {
//         const tokenFactory = new ethers.Contract(tokenFactoryAddress, TokenFactoryABI.abi, provider);
//         const allTokens = await tokenFactory.getAllTokens();
//         setTokens(allTokens);
//         loadTokenMetadata();
//       } catch (error) {
//         console.error("Error fetching tokens:", error);
//       }
//     };

//     fetchTokens();
//   }, [provider]);

//   // ✅ Load stored token metadata from localStorage
//   const loadTokenMetadata = () => {
//     const storedMetadata = JSON.parse(localStorage.getItem("tokenMetadata")) || {};
//     setTokenMetadata(storedMetadata);
//   };

//   return (
//     <div>
//       <h2>Created MemeCoins</h2>
//       {tokens.length === 0 ? (
//         <p>No tokens created yet.</p>
//       ) : (
//         <ul>
//           {tokens.map((token, index) => (
//             <li key={index}>
//               <strong>Name:</strong> {token.name} | 
//               <strong>Symbol:</strong> {token.symbol} | 
//               <strong>Address:</strong> {token.tokenAddress} 
              
//               {/* Display Meme Image */}
//               {tokenMetadata[token.tokenAddress] && (
//                 <div>
//                   <h3>Meme Image:</h3>
//                   <img src={tokenMetadata[token.tokenAddress]} alt="Meme" width="100px" />
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TokenList;


import React, { useState, useEffect } from "react";
import { getTokenFactoryContract } from "../utils/Web3Provider";
import TokenTrading from "./TokenTrading"; // Import new TokenTrading component

const TokenList = ({ provider }) => {
  const [tokens, setTokens] = useState([]);
  const [tokenMetadata, setTokenMetadata] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const tokenFactory = await getTokenFactoryContract();
      const allTokens = await tokenFactory.getAllTokens();
      setTokens(allTokens);
      loadTokenMetadata();
    } catch (error) {
      console.error("❌ Error fetching tokens:", error);
    }
    setLoading(false);
  };

  const loadTokenMetadata = () => {
    const storedMetadata = JSON.parse(localStorage.getItem("tokenMetadata")) || {};
    setTokenMetadata(storedMetadata);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📜 Available MemeCoins</h2>
      {loading ? (
        <p className="text-gray-600">Loading tokens...</p>
      ) : tokens.length === 0 ? (
        <p className="text-gray-600">No tokens available.</p>
      ) : (
        <ul className="space-y-4">
          {tokens.map((token, index) => (
            <li key={index} className="border p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p><strong>Name:</strong> {token.name}</p>
                  <p><strong>Symbol:</strong> {token.symbol}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Address:</strong> {token.tokenAddress}
                  </p>
                </div>

                {tokenMetadata[token.tokenAddress] && (
                  <img 
                    src={tokenMetadata[token.tokenAddress]} 
                    alt="Meme" 
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
              </div>

              {/* Use the new TokenTrading component */}
              <TokenTrading tokenAddress={token.tokenAddress} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenList;

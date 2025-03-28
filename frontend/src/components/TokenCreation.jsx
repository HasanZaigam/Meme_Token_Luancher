// import React, { useState } from "react";
// import { ethers } from "ethers";
// import TokenFactoryABI from "../abis/TokenFactory.json"; // ✅ Use the correct ABI

// const TokenCreation = ({ signer }) => {
//   const [tokenName, setTokenName] = useState("");
//   const [symbol, setSymbol] = useState("");
//   const [totalSupply, setTotalSupply] = useState("");

//   const tokenFactoryAddress = import.meta.env.VITE_TOKEN_FACTORY; // ✅ Ensure the correct contract address

//   const handleCreateToken = async () => {
//     if (!signer) {
//       alert("Please connect wallet first.");
//       return;
//     }

//     try {
//       console.log("Using Token Factory Address:", tokenFactoryAddress);
//       console.log("ABI Type:", typeof TokenFactoryABI);
//       console.log("ABI Content:", TokenFactoryABI);
//       console.log("Corrected ABI:", TokenFactoryABI.abi); // ✅ Debugging

//       // ✅ Create instance of TokenFactory contract
//       const tokenFactory = new ethers.Contract(tokenFactoryAddress, TokenFactoryABI.abi, signer);

//       console.log("Available Functions:", tokenFactory); // Debug available functions

//       if (!tokenFactory.createToken) {
//         throw new Error("Function createToken does not exist in this contract!");
//       }

//       const tx = await tokenFactory.createToken(tokenName, symbol, ethers.parseEther(totalSupply));
//       await tx.wait();
//       alert("Token Created Successfully!");
//     } catch (error) {
//       console.error("Error creating token:", error);
//       alert("Error creating token.");
//     }
//   };

//   return (
//     <div>
//       <h2>Create a New Token</h2>
//       <input type="text" placeholder="Token Name" onChange={(e) => setTokenName(e.target.value)} />
//       <input type="text" placeholder="Symbol" onChange={(e) => setSymbol(e.target.value)} />
//       <input type="number" placeholder="Total Supply" onChange={(e) => setTotalSupply(e.target.value)} />
//       <button onClick={handleCreateToken} className="bg-green-500 text-white p-2 rounded">
//         Create Token
//       </button>
//     </div>
//   );
// };

// export default TokenCreation;


import React, { useState } from "react";
import { ethers } from "ethers";
import TokenFactoryABI from "../abis/TokenFactory.json";
import { uploadToIPFS } from "../utils/ipfsUtils"; // Import IPFS upload function

const TokenCreation = ({ signer }) => {
  const [tokenName, setTokenName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [memeImage, setMemeImage] = useState(null);
  const [memeImageURL, setMemeImageURL] = useState("");

  const tokenFactoryAddress = import.meta.env.VITE_TOKEN_FACTORY;

  const handleCreateToken = async () => {
    if (!signer) {
      alert("Please connect wallet first.");
      return;
    }

    try {
      let imageUrl = "";
      if (memeImage) {
        imageUrl = await uploadToIPFS(memeImage);
        if (!imageUrl) {
          alert("Failed to upload meme image!");
          return;
        }
        setMemeImageURL(imageUrl);
      }

      // ✅ Create MemeCoin Token (without image URL)
      const tokenFactory = new ethers.Contract(tokenFactoryAddress, TokenFactoryABI.abi, signer);
      const tx = await tokenFactory.createToken(tokenName, symbol, ethers.parseEther(totalSupply));
      const receipt = await tx.wait();

      // ✅ Get created token address
      const tokenAddress = receipt.logs[0].address;
      console.log("New Token Address:", tokenAddress);

      // ✅ Store token metadata (token address + meme image)
      saveTokenMetadata(tokenAddress, imageUrl);

      alert("Token Created Successfully!");
    } catch (error) {
      console.error("Error creating token:", error);
      alert("Error creating token.");
    }
  };

  // ✅ Save token metadata in localStorage
  const saveTokenMetadata = (tokenAddress, memeImageUrl) => {
    const storedMetadata = JSON.parse(localStorage.getItem("tokenMetadata")) || {};
    storedMetadata[tokenAddress] = memeImageUrl;
    localStorage.setItem("tokenMetadata", JSON.stringify(storedMetadata));
  };

  return (
    <div>
      <h2>Create a New MemeCoin</h2>
      <input type="text" placeholder="Token Name" onChange={(e) => setTokenName(e.target.value)} />
      <input type="text" placeholder="Symbol" onChange={(e) => setSymbol(e.target.value)} />
      <input type="number" placeholder="Total Supply" onChange={(e) => setTotalSupply(e.target.value)} />
      
      {/* Meme Image Upload */}
      <input type="file" accept="image/*" onChange={(e) => setMemeImage(e.target.files[0])} />

      <button onClick={handleCreateToken} className="bg-green-500 text-white p-2 rounded">
        Create MemeCoin
      </button>

      {/* Preview Meme Image */}
      {memeImageURL && (
        <div>
          <h3>Meme Image Preview:</h3>
          <img src={memeImageURL} alt="Meme" width="200px" />
        </div>
      )}
    </div>
  );
};

export default TokenCreation;

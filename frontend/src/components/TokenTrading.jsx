// // import React, { useState } from "react";
// // import { ethers } from "ethers";
// // import { getTradingContract, getBondingCurveContract } from "../utils/Web3Provider";

// // const TokenTrading = ({ tokenAddress }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [buyAmount, setBuyAmount] = useState("");
// //   const [sellAmount, setSellAmount] = useState("");

// //   const setTradingContractAddress = async () => {
// //     try {
// //       const provider = new ethers.BrowserProvider(window.ethereum);
// //       const signer = await provider.getSigner();

// //       const tokenAbi = [
// //         "function setTradingContract(address _tradingContract) external"
// //       ];

// //       const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

// //       const tradingContract = await getTradingContract();
// //       const tradingAddress = await tradingContract.getAddress();

// //       const tx = await tokenContract.setTradingContract(tradingAddress);
// //       await tx.wait();

// //       alert("✅ Trading contract successfully authorized!");
// //     } catch (error) {
// //       console.error("❌ Error setting trading contract:", error);
// //       alert("❌ Failed to authorize trading contract: " + error.message);
// //     }
// //   };

// //   const buyTokens = async () => {
// //     setLoading(true);
// //     try {
// //       const provider = new ethers.BrowserProvider(window.ethereum);
// //       const signer = await provider.getSigner();

// //       const tradingContract = (await getTradingContract()).connect(signer);
// //       const bondingCurve = (await getBondingCurveContract()).connect(signer);

// //       const amount = ethers.parseUnits(buyAmount || "0", 18);

// //       const tokenAbi = ["function totalSupply() public view returns (uint256)"];
// //       const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
// //       const totalSupply = await tokenContract.totalSupply();

// //       let price = await bondingCurve.getBuyPrice(amount, totalSupply);
// //       price = ethers.toBigInt(price);

// //       if (price <= 0n) {
// //         throw new Error("Invalid price: Buy price is zero or negative.");
// //       }

// //       const tx = await tradingContract.buyTokens(amount, { value: price });
// //       await tx.wait();

// //       alert("✅ Tokens bought successfully!");
// //       setBuyAmount("");
// //     } catch (error) {
// //       console.error("❌ Error buying tokens:", error);
// //       alert("❌ Buy failed: " + error.message);
// //     }
// //     setLoading(false);
// //   };

// //   const sellTokens = async () => {
// //     setLoading(true);
// //     try {
// //       const provider = new ethers.BrowserProvider(window.ethereum);
// //       const signer = await provider.getSigner();

// //       const tradingContract = (await getTradingContract()).connect(signer);
// //       const bondingCurve = (await getBondingCurveContract()).connect(signer);

// //       const amount = ethers.parseUnits(sellAmount || "0", 18);

// //       const tokenAbi = ["function totalSupply() public view returns (uint256)"];
// //       const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
// //       const totalSupply = await tokenContract.totalSupply();

// //       let price = await bondingCurve.getSellPrice(amount, totalSupply);
// //       price = ethers.toBigInt(price);

// //       if (price <= 0n) {
// //         throw new Error("Invalid price: Sell price is zero or negative.");
// //       }

// //       const tx = await tradingContract.sellTokens(amount);
// //       await tx.wait();

// //       alert("✅ Tokens sold successfully!");
// //       setSellAmount("");
// //     } catch (error) {
// //       console.error("❌ Error selling tokens:", error);
// //       alert("❌ Sell failed: " + error.message);
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="p-4 border rounded-lg shadow">
// //       <h2 className="text-xl font-bold">Token Trading</h2>
// //       <p className="text-sm text-gray-600">Buy/sell tokens using bonding curve.</p>

// //       <div className="my-4">
// //         <button
// //           onClick={setTradingContractAddress}
// //           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
// //         >
// //           Set Trading Contract (Once)
// //         </button>
// //       </div>

// //       <div className="mt-4 flex flex-col gap-4">
// //         <div>
// //           <input
// //             type="number"
// //             min="0"
// //             value={buyAmount}
// //             onChange={(e) => setBuyAmount(e.target.value)}
// //             placeholder="Amount to Buy"
// //             className="border p-2 rounded w-full"
// //           />
// //           <button
// //             onClick={buyTokens}
// //             disabled={loading || !buyAmount}
// //             className={`mt-2 w-full px-4 py-2 text-white rounded transition ${
// //               loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
// //             }`}
// //           >
// //             {loading ? "Processing..." : "Buy Tokens"}
// //           </button>
// //         </div>

// //         <div>
// //           <input
// //             type="number"
// //             min="0"
// //             value={sellAmount}
// //             onChange={(e) => setSellAmount(e.target.value)}
// //             placeholder="Amount to Sell"
// //             className="border p-2 rounded w-full"
// //           />
// //           <button
// //             onClick={sellTokens}
// //             disabled={loading || !sellAmount}
// //             className={`mt-2 w-full px-4 py-2 text-white rounded transition ${
// //               loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
// //             }`}
// //           >
// //             {loading ? "Processing..." : "Sell Tokens"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TokenTrading;


// import React, { useState } from "react";
// import { ethers } from "ethers";
// import { getTradingContract, getBondingCurveContract } from "../utils/Web3Provider";

// const TokenTrading = ({ tokenAddress }) => {
//   const [loading, setLoading] = useState(false);
//   const [buyAmount, setBuyAmount] = useState("");
//   const [sellAmount, setSellAmount] = useState("");

//   const setTradingContractAddress = async () => {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const tokenAbi = [
//         "function setTradingContract(address _tradingContract) external"
//       ];

//       const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

//       const tradingContract = await getTradingContract();
//       const tradingAddress = await tradingContract.getAddress();

//       const tx = await tokenContract.setTradingContract(tradingAddress);
//       await tx.wait();

//       alert("✅ Trading contract successfully authorized!");
//     } catch (error) {
//       console.error("❌ Error setting trading contract:", error);
//       alert("❌ Failed to authorize trading contract: " + error.message);
//     }
//   };

//   const checkTradingContractSet = async () => {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const tokenAbi = ["function tradingContract() public view returns (address)"];
//       const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

//       const setAddress = await tokenContract.tradingContract();
//       const actualTrading = await (await getTradingContract()).getAddress();

//       console.log("📌 Current set tradingContract in token:", setAddress);
//       console.log("🏷️ Actual trading contract address you expect:", actualTrading);

//       if (setAddress.toLowerCase() === actualTrading.toLowerCase()) {
//         alert("✅ Trading contract is correctly set in token contract.");
//       } else {
//         alert("❌ Mismatch! tradingContract is not correctly set.");
//       }
//     } catch (err) {
//       console.error("Error checking trading contract:", err);
//       alert("❌ Error fetching tradingContract address.");
//     }
//   };

//   const buyTokens = async () => {
//     setLoading(true);
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const tradingContract = (await getTradingContract()).connect(signer);
//       const bondingCurve = (await getBondingCurveContract()).connect(signer);

//       const amount = ethers.parseUnits(buyAmount || "0", 18);

//       const tokenAbi = ["function totalSupply() public view returns (uint256)"];
//       const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
//       const totalSupply = await tokenContract.totalSupply();

//       let price = await bondingCurve.getBuyPrice(amount, totalSupply);
//       price = ethers.toBigInt(price);

//       if (price <= 0n) {
//         throw new Error("Invalid price: Buy price is zero or negative.");
//       }

//       const tx = await tradingContract.buyTokens(amount, { value: price });
//       await tx.wait();

//       alert("✅ Tokens bought successfully!");
//       setBuyAmount("");
//     } catch (error) {
//       console.error("❌ Error buying tokens:", error);
//       alert("❌ Buy failed: " + error.message);
//     }
//     setLoading(false);
//   };

//   const sellTokens = async () => {
//     setLoading(true);
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();

//       const tradingContract = (await getTradingContract()).connect(signer);
//       const bondingCurve = (await getBondingCurveContract()).connect(signer);

//       const amount = ethers.parseUnits(sellAmount || "0", 18);

//       const tokenAbi = ["function totalSupply() public view returns (uint256)"];
//       const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
//       const totalSupply = await tokenContract.totalSupply();

//       let price = await bondingCurve.getSellPrice(amount, totalSupply);
//       price = ethers.toBigInt(price);

//       if (price <= 0n) {
//         throw new Error("Invalid price: Sell price is zero or negative.");
//       }

//       const tx = await tradingContract.sellTokens(amount);
//       await tx.wait();

//       alert("✅ Tokens sold successfully!");
//       setSellAmount("");
//     } catch (error) {
//       console.error("❌ Error selling tokens:", error);
//       alert("❌ Sell failed: " + error.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow">
//       <h2 className="text-xl font-bold">Token Trading</h2>
//       <p className="text-sm text-gray-600">Buy/sell tokens using bonding curve.</p>

//       <div className="my-4 flex flex-col gap-2">
//         <button
//           onClick={setTradingContractAddress}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Set Trading Contract (Once)
//         </button>

//         <button
//           onClick={checkTradingContractSet}
//           className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//         >
//           Check TradingContract Address
//         </button>
//       </div>

//       <div className="mt-4 flex flex-col gap-4">
//         <div>
//           <input
//             type="number"
//             min="0"
//             value={buyAmount}
//             onChange={(e) => setBuyAmount(e.target.value)}
//             placeholder="Amount to Buy"
//             className="border p-2 rounded w-full"
//           />
//           <button
//             onClick={buyTokens}
//             disabled={loading || !buyAmount}
//             className={`mt-2 w-full px-4 py-2 text-white rounded transition ${
//               loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {loading ? "Processing..." : "Buy Tokens"}
//           </button>
//         </div>

//         <div>
//           <input
//             type="number"
//             min="0"
//             value={sellAmount}
//             onChange={(e) => setSellAmount(e.target.value)}
//             placeholder="Amount to Sell"
//             className="border p-2 rounded w-full"
//           />
//           <button
//             onClick={sellTokens}
//             disabled={loading || !sellAmount}
//             className={`mt-2 w-full px-4 py-2 text-white rounded transition ${
//               loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
//             }`}
//           >
//             {loading ? "Processing..." : "Sell Tokens"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TokenTrading;


import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  getTradingContract,
  getBondingCurveContract,
} from "../utils/Web3Provider";

const TokenTrading = ({ tokenAddress }) => {
  const [loading, setLoading] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // ✅ Check if trading contract is already set in token
  const checkTradingContractSet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tokenAbi = [
        "function tradingContract() public view returns (address)",
      ];
      const tokenContract = new ethers.Contract(
        tokenAddress,
        tokenAbi,
        signer
      );

      const tradingContract = await getTradingContract();
      const expectedAddress = await tradingContract.getAddress();
      const currentAddress = await tokenContract.tradingContract();

      console.log("📌 Current set tradingContract in token:", currentAddress);
      console.log("🏷️ Actual trading contract address you expect:", expectedAddress);

      setIsAuthorized(currentAddress.toLowerCase() === expectedAddress.toLowerCase());
    } catch (err) {
      console.error("Error checking trading contract address:", err);
    }
  };

  // ✅ Set trading contract if not already
  const setTradingContractAddress = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tokenAbi = [
        "function setTradingContract(address _tradingContract) public"
      ];
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

      const tradingContract = await getTradingContract();
      const tradingAddress = await tradingContract.getAddress();

      const tx = await tokenContract.setTradingContract(tradingAddress);
      await tx.wait();

      alert("✅ Trading contract address set successfully!");
      await checkTradingContractSet();
    } catch (error) {
      if (
        error.message.includes("already set") ||
        error.reason?.toLowerCase().includes("not authorized")
      ) {
        alert("⚠️ Trading contract already set or you're not authorized.");
      } else {
        console.error("❌ Error setting trading contract:", error);
        alert("❌ Failed to set trading contract: " + error.message);
      }
    }
  };

  const buyTokens = async () => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tradingContract = (await getTradingContract()).connect(signer);
      const bondingCurve = (await getBondingCurveContract()).connect(signer);

      const amount = ethers.parseUnits(buyAmount || "0", 18);

      const tokenAbi = ["function totalSupply() public view returns (uint256)"];
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
      const totalSupply = await tokenContract.totalSupply();

      let price = await bondingCurve.getBuyPrice(amount, totalSupply);
      price = ethers.toBigInt(price);

      if (price <= 0n) {
        throw new Error("Invalid price: Buy price is zero or negative.");
      }

      const tx = await tradingContract.buyTokens(amount, { value: price });
      await tx.wait();

      alert("✅ Tokens bought successfully!");
      setBuyAmount("");
    } catch (error) {
      console.error("❌ Error buying tokens:", error);
      alert("❌ Buy failed: " + error.message);
    }
    setLoading(false);
  };

  const sellTokens = async () => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tradingContract = (await getTradingContract()).connect(signer);
      const bondingCurve = (await getBondingCurveContract()).connect(signer);

      const amount = ethers.parseUnits(sellAmount || "0", 18);

      const tokenAbi = ["function totalSupply() public view returns (uint256)"];
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
      const totalSupply = await tokenContract.totalSupply();

      let price = await bondingCurve.getSellPrice(amount, totalSupply);
      price = ethers.toBigInt(price);

      if (price <= 0n) {
        throw new Error("Invalid price: Sell price is zero or negative.");
      }

      const tx = await tradingContract.sellTokens(amount);
      await tx.wait();

      alert("✅ Tokens sold successfully!");
      setSellAmount("");
    } catch (error) {
      console.error("❌ Error selling tokens:", error);
      alert("❌ Sell failed: " + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkTradingContractSet();
  }, [tokenAddress]);

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold">Token Trading</h2>
      <p className="text-sm text-gray-600">Buy/sell tokens using bonding curve.</p>

      {!isAuthorized && (
        <div className="my-4">
          <button
            onClick={setTradingContractAddress}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Set Trading Contract (Once)
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <input
            type="number"
            min="0"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            placeholder="Amount to Buy"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={buyTokens}
            disabled={loading || !buyAmount}
            className={`mt-2 w-full px-4 py-2 text-white rounded transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Processing..." : "Buy Tokens"}
          </button>
        </div>

        <div>
          <input
            type="number"
            min="0"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            placeholder="Amount to Sell"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={sellTokens}
            disabled={loading || !sellAmount}
            className={`mt-2 w-full px-4 py-2 text-white rounded transition ${
              loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? "Processing..." : "Sell Tokens"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenTrading;

import React, { useState } from "react";
import { connectWallet } from "../utils/Web3Provider";

const WalletConnect = ({ onWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      setWalletAddress(wallet.address);
      onWalletConnected(wallet); // Pass wallet details to parent component
    }
  };

  return (
    <div>
      {walletAddress ? (
        <p>Connected: {walletAddress.substring(0, 6)}...{walletAddress.slice(-4)}</p>
      ) : (
        <button onClick={handleConnect} className="bg-blue-500 text-white p-2 rounded">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;

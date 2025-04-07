import React, { useState } from "react";
import { getProvider, getSigner } from "../utils/Web3Provider";

const WalletConnect = ({ onWalletConnected }) => {
    const [walletAddress, setWalletAddress] = useState("");

    const handleConnect = async () => {
        try {
            if (!window.ethereum) {
                alert("Please install MetaMask!");
                return;
            }
            const signer = await getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);
            onWalletConnected({ address, signer, provider: getProvider() });
        } catch (error) {
            console.error("Error connecting wallet:", error);
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
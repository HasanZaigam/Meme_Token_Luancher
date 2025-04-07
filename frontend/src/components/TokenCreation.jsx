import React, { useState } from "react";
import { getTokenFactoryContract } from "../utils/Web3Provider";
import { uploadToIPFS } from "../utils/ipfsUtils";

const TokenCreation = ({ signer }) => {
    const [tokenName, setTokenName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [memeImage, setMemeImage] = useState(null);
    const [memeImageURL, setMemeImageURL] = useState("");
    const [creating, setCreating] = useState(false);

    const handleCreateToken = async () => {
        if (!signer) {
            alert("Please connect your wallet.");
            return;
        }

        if (!tokenName || !symbol) {
            alert("Please enter both token name and symbol.");
            return;
        }

        setCreating(true);
        try {
            // Get contract instance
            const tokenFactory = await getTokenFactoryContract();
            
            // Create token
            const tx = await tokenFactory.createToken(tokenName, symbol);
            console.log("Transaction sent:", tx.hash);
            
            const receipt = await tx.wait();
            const tokenAddress = receipt.logs[0].address;
            console.log("New Token Address:", tokenAddress);

            // Handle image upload
            let imageUrl = "";
            if (memeImage) {
                imageUrl = await uploadToIPFS(memeImage);
                if (!imageUrl) {
                    alert("Failed to upload meme image!");
                    setCreating(false);
                    return;
                }
                setMemeImageURL(imageUrl);
            }

            // Save metadata
            saveTokenMetadata(tokenAddress, imageUrl);

            // Clear form
            setTokenName("");
            setSymbol("");
            setMemeImage(null);
            
            alert("Token Created Successfully!");
        } catch (error) {
            console.error("Error creating token:", error);
            alert("Error creating token: " + error.message);
        }
        setCreating(false);
    };

    const saveTokenMetadata = (tokenAddress, memeImageUrl) => {
        const storedMetadata = JSON.parse(localStorage.getItem("tokenMetadata")) || {};
        storedMetadata[tokenAddress] = memeImageUrl;
        localStorage.setItem("tokenMetadata", JSON.stringify(storedMetadata));
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Create a MemeCoin</h2>
            <div className="space-y-4">
                <div>
                    <input 
                        type="text" 
                        placeholder="Token Name" 
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="Symbol" 
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                
                <div className="border-dashed border-2 p-4 rounded">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setMemeImage(e.target.files[0])}
                        className="w-full"
                    />
                </div>

                <button 
                    onClick={handleCreateToken} 
                    disabled={creating || !tokenName || !symbol}
                    className={`w-full p-2 rounded text-white transition-colors
                        ${creating || !tokenName || !symbol 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {creating ? "Creating..." : "Create MemeCoin"}
                </button>

                {memeImageURL && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Meme Preview:</h3>
                        <img 
                            src={memeImageURL} 
                            alt="Meme" 
                            className="max-w-xs rounded shadow mx-auto"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TokenCreation;
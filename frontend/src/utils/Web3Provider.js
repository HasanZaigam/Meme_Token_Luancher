import { ethers } from "ethers";

// Function to connect to MetaMask
export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not installed! Please install it to use this app.");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
}

import { ethers } from "ethers";
import TokenFactoryABI from "../abis/TokenFactory_n.json";
import BondingCurveABI from "../abis/BondingCurve.json";
import TradingContractABI from "../abis/TradingContract.json";

export const getProvider = () => {
    if (!window.ethereum) {
        throw new Error("Please install MetaMask!");
    }
    return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async () => {
    const provider = getProvider();
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
};

export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return null;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        return {
            address,
            signer,
            provider
        };
    } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
    }
};

export const getContract = async (address, abi) => {
    try {
        const signer = await getSigner();
        const contractABI = abi.abi || abi;
        return new ethers.Contract(address, contractABI, signer);
    } catch (error) {
        console.error("Error creating contract:", error);
        throw error;
    }
};

export const getTokenFactoryContract = async () => {
    return getContract(import.meta.env.VITE_TOKEN_FACTORY_N_ADDRESS, TokenFactoryABI);
};

export const getBondingCurveContract = async () => {
    return getContract(import.meta.env.VITE_BONDING_CURVE_ADDRESS, BondingCurveABI);
};

export const getTradingContract = async () => {
    return getContract(import.meta.env.VITE_TRADING_CONTRACT_ADDRESS, TradingContractABI);
};
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from 'dotenv';

dotenv.config();

export default buildModule("TradingPlatformModule", (m) => {
    // Check if token address exists
    if (!process.env.MY_TOKEN_ADDRESS) {
        throw new Error("MY_TOKEN_ADDRESS not found in .env file");
    }

    const tokenAddress = process.env.MY_TOKEN_ADDRESS;
    const tokenPrice = "1000000000000000"; // 0.001 ETH per token

    // Deploy TradingPlatform with the token address
    const tradingPlatform = m.contract("TradingPlatform", [tokenAddress, tokenPrice]);

    return { tradingPlatform };
});
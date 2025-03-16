import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from "dotenv";

dotenv.config();

export default buildModule("TradingPlatformModule", (m) => {
    const tokenAddress = process.env.MY_TOKEN_ADDRESS; // Load MyToken address from .env
    const tokenPrice = 1000000000000000n; // 0.001 ETH per token in Wei

    const tradingPlatform = m.contract("TradingPlatform", [tokenAddress, tokenPrice]);

    return { tradingPlatform };
});

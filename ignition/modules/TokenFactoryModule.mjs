import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TradingPlatformModule", (m) => {
    const token = m.getContract("MyToken"); // Get deployed MyToken contract
    const tokenPrice = 1000000000000000n; // 0.001 ETH per token (in Wei)

    const tradingPlatform = m.contract("TradingPlatform", [token, tokenPrice]);

    return { tradingPlatform };
});

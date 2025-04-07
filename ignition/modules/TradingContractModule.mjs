import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import * as dotenv from "dotenv";

// Load environment variables from .env file synchronously.
dotenv.config();

const tokenAddress = process.env.MY_TOKEN_N_ADDRESS;
const bondingCurveAddress = process.env.BONDING_CURVE_ADDRESS;

if (!tokenAddress || !bondingCurveAddress) {
  throw new Error("❌ Missing MY_TOKEN_N_ADDRESS or BONDING_CURVE_ADDRESS in .env file");
}

const TradingContractModule = buildModule("TradingContractModule", (m) => {
  const owner = m.getAccount(0);
  // Deploy TradingContract with parameters: token address, bonding curve address, and owner.
  const tradingContract = m.contract("TradingContract", [
    tokenAddress,
    bondingCurveAddress,
    owner,
  ]);

  return { tradingContract };
});

export default TradingContractModule;

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition"); // ✅ Ignition Import Karo
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},  // ✅ Hardhat local network bhi support karega
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,  // 🔗 Alchemy/Infura URL
      accounts: [process.env.PRIVATE_KEY], // 🔑 Metamask Private Key
    },
  },
  ignition: {
    defaultNetwork: "hardhat",  // ✅ Default network Hardhat rakho
  },
};

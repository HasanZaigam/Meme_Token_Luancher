import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TokenFactoryModule", (m) => {
    const factory = m.contract("TokenFactory"); // Deploy TokenFactory contract
    return { factory };
});

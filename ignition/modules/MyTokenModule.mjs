import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyTokenModule", (m) => {
    const token = m.contract("MyToken", ["MyToken", "MTK", 1000000n * 10n ** 18n]);
    return { token };
});

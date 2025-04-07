 import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyTokenModule = buildModule("MyTokenModule_n", (m) => {
  // Define parameters (defaults can be overridden)
  const name = m.getParameter("name", "My Token");
  const symbol = m.getParameter("symbol", "MTK");

  // Deploy the MyToken_n contract with name and symbol
  const myToken = m.contract("MyToken_n", [name, symbol]);

  return { myToken };
});

export default MyTokenModule;

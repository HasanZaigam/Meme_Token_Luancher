// import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const TokenFactoryModule = buildModule("TokenFactoryModule", (m) => {
//   const tokenFactory = m.contract("TokenFactory_n", []);

//   return { tokenFactory };
// });

// export default TokenFactoryModule;

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenFactoryModule = buildModule("TokenFactoryModule_n", (m) => {
  const tokenFactory = m.contract("TokenFactory_n", []);
  return { tokenFactory };
});

export default TokenFactoryModule;

// import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const BondingCurveModule = buildModule("BondingCurveModule", (m) => {
//   const bondingCurve = m.contract("BondingCurve", []);

//   return { bondingCurve };
// });

// export default BondingCurveModule;


import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BondingCurveModule = buildModule("BondingCurveModule", (m) => {
  // Deploy BondingCurve contract with no constructor parameters.
  const bondingCurve = m.contract("BondingCurve", []);
  return { bondingCurve };
});

export default BondingCurveModule;

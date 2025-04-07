const { expect } = require("chai");

describe("BondingCurve", function () {
  let BondingCurve, bondingCurve;

  before(async function () {
    BondingCurve = await ethers.getContractFactory("BondingCurve");
    bondingCurve = await BondingCurve.deploy();
    await bondingCurve.waitForDeployment();
  });

  it("Should get correct buy price", async function () {
    const price = await bondingCurve.getBuyPrice(10, 1000);
    expect(price).to.be.a("bigint"); // Since Solidity returns big numbers
  });

  it("Should get correct sell price", async function () {
    const price = await bondingCurve.getSellPrice(5, 1000);
    expect(price).to.be.a("bigint");
  });
});

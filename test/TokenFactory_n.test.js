const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenFactory_n", function () {
  let TokenFactory, tokenFactory, owner, addr1;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    TokenFactory = await ethers.getContractFactory("TokenFactory_n");
    tokenFactory = await TokenFactory.deploy();
    await tokenFactory.waitForDeployment();
  });

  it("Should create a new token", async function () {
    const tx = await tokenFactory.createToken("NewToken", "NTK");
    await tx.wait();

    const allTokens = await tokenFactory.getAllTokens();
    expect(allTokens.length).to.equal(1);
    expect(allTokens[0].name).to.equal("NewToken");
    expect(allTokens[0].symbol).to.equal("NTK");
  });
});

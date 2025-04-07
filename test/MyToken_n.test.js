const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken_n", function () {
  let MyToken, myToken, owner, addr1;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    MyToken = await ethers.getContractFactory("MyToken_n");
    myToken = await MyToken.deploy("TestToken", "TTK");
    await myToken.waitForDeployment();
  });

  it("Should have correct name and symbol", async function () {
    expect(await myToken.name()).to.equal("TestToken");
    expect(await myToken.symbol()).to.equal("TTK");
  });

  it("Should set TradingContract correctly", async function () {
    await myToken.setTradingContract(addr1.address);
    expect(await myToken.tradingContract()).to.equal(addr1.address);
  });

  it("Should not allow non-trading contract to mint", async function () {
    await expect(myToken.mint(addr1.address, 100)).to.be.revertedWith("Not authorized");
  });

  it("Should mint tokens by trading contract", async function () {
    await myToken.connect(addr1).mint(owner.address, 500);
    expect(await myToken.balanceOf(owner.address)).to.equal(500);
  });

  it("Should burn tokens by trading contract", async function () {
    await myToken.connect(addr1).burn(owner.address, 200);
    expect(await myToken.balanceOf(owner.address)).to.equal(300);
  });
});

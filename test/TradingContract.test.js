const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TradingContract", function () {
    let Token, token, TradingContract, tradingContract, BondingCurve, bondingCurve;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy MyToken_n contract
        Token = await ethers.getContractFactory("MyToken_n");
        token = await Token.deploy("MyToken", "MT");
        await token.waitForDeployment();

        // Deploy BondingCurve contract
        BondingCurve = await ethers.getContractFactory("BondingCurve");
        bondingCurve = await BondingCurve.deploy();
        await bondingCurve.waitForDeployment();

        // Deploy TradingContract
        TradingContract = await ethers.getContractFactory("TradingContract");
        tradingContract = await TradingContract.deploy(
            await token.getAddress(),
            await bondingCurve.getAddress(),
            owner.address
        );
        await tradingContract.waitForDeployment();

        // Set TradingContract as minter
        await token.setTradingContract(await tradingContract.getAddress());
    });

    it("Should allow buying tokens", async function () {
        const buyAmount = ethers.parseUnits("10", 18);
        const currentSupply = await token.totalSupply();
        const expectedPrice = await bondingCurve.getBuyPrice(buyAmount, currentSupply);

        await expect(
            tradingContract.connect(addr1).buyTokens(buyAmount, { value: expectedPrice })
        ).to.emit(tradingContract, "TokensBought")
        .withArgs(addr1.address, buyAmount, expectedPrice);

        const newBalance = await token.balanceOf(addr1.address);
        expect(newBalance).to.equal(buyAmount);
    });

    it("Should allow selling tokens", async function () {
        const sellAmount = ethers.parseUnits("5", 18);

        // First buy tokens using trading contract instead of direct minting
        const currentSupply = await token.totalSupply();
        const buyPrice = await bondingCurve.getBuyPrice(sellAmount, currentSupply);
        await tradingContract.connect(addr1).buyTokens(sellAmount, { value: buyPrice });

        // Now try to sell
        const sellPrice = await bondingCurve.getSellPrice(sellAmount, await token.totalSupply());
        
        await token.connect(addr1).approve(tradingContract.getAddress(), sellAmount);

        await expect(
            tradingContract.connect(addr1).sellTokens(sellAmount)
        ).to.emit(tradingContract, "TokensSold")
        .withArgs(addr1.address, sellAmount, sellPrice);

        const newBalance = await token.balanceOf(addr1.address);
        expect(newBalance).to.equal(0);
    });
});
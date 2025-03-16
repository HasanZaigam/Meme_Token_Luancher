const { expect } = require("chai");
const { ethers } = require("hardhat");
require("dotenv").config();

describe("TradingPlatform", function () {
    let TradingPlatform, tradingPlatform;
    let MyToken, myToken;
    let owner, addr1, addr2;
    const tokenPrice = ethers.parseEther("0.001"); // 0.001 ETH per token

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy MyToken
        MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy("MyToken", "MTK", ethers.parseEther("1000000"));
        await myToken.waitForDeployment();

        // Deploy TradingPlatform
        TradingPlatform = await ethers.getContractFactory("TradingPlatform");
        tradingPlatform = await TradingPlatform.deploy(myToken.target, tokenPrice);
        await tradingPlatform.waitForDeployment();

        // Transfer tokens to TradingPlatform for testing
        await myToken.transfer(tradingPlatform.target, ethers.parseEther("10000"));
    });

    it("Should allow users to buy tokens", async function () {
        await tradingPlatform.connect(addr1).buyTokens({ value: ethers.parseEther("0.01") });

        expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("10"));
    });

    it("Should allow users to sell tokens", async function () {
        await tradingPlatform.connect(addr1).buyTokens({ value: ethers.parseEther("0.01") });

        await myToken.connect(addr1).approve(tradingPlatform.target, ethers.parseEther("10"));
        await tradingPlatform.connect(addr1).sellTokens(ethers.parseEther("10"));

        expect(await myToken.balanceOf(addr1.address)).to.equal(0);
    });
});

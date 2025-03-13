const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenFactory", function () {
    let TokenFactory, factory, owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        TokenFactory = await ethers.getContractFactory("TokenFactory");
        factory = await TokenFactory.deploy();
    });

    it("should create a new token", async function () {
        const initialSupply = 1000;
        // Don't convert to Wei here since the contract will do the conversion
        const tx = await factory.createToken("MyToken", "MT", initialSupply);
        await tx.wait();

        const allTokens = await factory.getAllTokens();
        
        const TokenContract = await ethers.getContractFactory("MyToken");
        const tokenInstance = TokenContract.attach(allTokens[0].tokenAddress);
        const actualTotalSupply = await tokenInstance.totalSupply();

        console.log("\nCreated Token Details:");
        console.log("--------------------");
        console.log("Token Name:", allTokens[0]?.name || "N/A");
        console.log("Token Symbol:", allTokens[0]?.symbol || "N/A");
        console.log("Token Supply:", allTokens[0]?.supply?.toString() || "N/A");
        console.log("Token Address:", allTokens[0]?.tokenAddress || "N/A");
        console.log("Initial Supply:", initialSupply, "tokens");
        console.log("Actual Total Supply:", ethers.formatUnits(actualTotalSupply, 18), "tokens");
        console.log("Actual Total Supply (in Wei):", actualTotalSupply.toString());
        console.log("--------------------\n");

        expect(allTokens.length).to.equal(1);
        expect(allTokens[0].name).to.equal("MyToken");
        // Compare the numbers instead of strings
        expect(Number(ethers.formatUnits(actualTotalSupply, 18))).to.equal(initialSupply);
    });
});

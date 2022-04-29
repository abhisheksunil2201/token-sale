const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  it("tests token contract", async function () {
    const [admin, buyer] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Dark");
    const TokenSale = await ethers.getContractFactory("TokenSale");

    const token = await Token.deploy();
    await token.deployed();
    console.log("Token contract deployed to: ", token.address);
    const tokenSale = await TokenSale.deploy(token.address);
    await tokenSale.deployed();
    console.log("TokenSale contract deployed to: ", tokenSale.address);

    expect(await token.balanceOf(admin.address)).to.equal(100000);
    expect(await token.totalSupply()).to.equal(100000);
    expect(await tokenSale.tokenPrice()).to.equal(1000000000000000);
    expect(await tokenSale.getTokenSupply()).to.equal(100000);

    await token.transfer(tokenSale.address, 10000);

    expect(await token.balanceOf(tokenSale.address)).to.equal(10000);
    expect(await token.balanceOf(buyer.address)).to.equal(0);
    expect(await token.balanceOf(admin.address)).to.equal(90000);
    await expect(tokenSale.connect(buyer).buyToken(11000)).to.be.revertedWith(
      "Not enough tokens"
    );

    await tokenSale
      .connect(buyer)
      .buyToken(1000, { value: ethers.utils.parseEther("1") });

    expect(await token.balanceOf(buyer.address)).to.equal(1000);

    console.log("Contract balance: ", await token.balanceOf(tokenSale.address));
    console.log("Admin balance: ", await token.balanceOf(admin.address));
    console.log("Buyer balance: ", await token.balanceOf(buyer.address));
  });
});

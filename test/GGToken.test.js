import { expect } from "chai";
import hre from "hardhat";

describe("GG Smart Contract", function () {
  let ggToken;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await hre.ethers.getSigners();
    const GGToken = await hre.ethers.getContractFactory("GGToken");
    ggToken = await GGToken.deploy(1000000);
    await ggToken.waitForDeployment();
  });

  it("Should have correct name and symbol", async function () {
    expect(await ggToken.name()).to.equal("GG Smart Contract");
    expect(await ggToken.symbol()).to.equal("GG");
  });

  it("Should assign the initial supply to the owner", async function () {
    const ownerBalance = await ggToken.balanceOf(owner.address);
    expect(await ggToken.totalSupply()).to.equal(ownerBalance);
  });
});

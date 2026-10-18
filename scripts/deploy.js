import hre from "hardhat";

async function main() {
  const initialSupply = 1000000;
  console.log("Deploying GGToken...");

  const GGToken = await hre.ethers.getContractFactory("GGToken");
  const ggToken = await GGToken.deploy(initialSupply);

  await ggToken.waitForDeployment();

  console.log(`GGToken successfully deployed to: ${await ggToken.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const hre = require("hardhat");

async function main() {
  console.log("Deploying CarbonCredit contract...");

  const CarbonCredit = await hre.ethers.getContractFactory("CarbonCredit");
  const carbonCredit = await CarbonCredit.deploy();

  // In ethers v6, deployment is awaited differently
  await carbonCredit.waitForDeployment();

  console.log("CarbonCredit deployed to:", await carbonCredit.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

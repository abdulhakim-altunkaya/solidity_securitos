const hre = require("hardhat");

async function main() {

  const Securitos = await hre.ethers.getContractFactory("Securitos");
  const securitos = await Securitos.deploy(1000000);

  await securitos.deployed();

  console.log(`securitos  deployed to ${securitos.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

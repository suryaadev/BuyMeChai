const hre = require("hardhat")

async function main() {
    const chai = await hre.ethers.getContractFactory("Chai")
    const chaiContract = await chai.deploy()
    await chaiContract.deployed()
    console.log(`Contract deployed at :::: ${chaiContract.address}`)

}

main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
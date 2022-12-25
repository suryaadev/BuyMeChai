const hre = require("hardhat")

async function consoleBalance(addresses) {
  let counter = 0
  for (const address of addresses) {
    console.log(`Address ${counter} ::: balance :`, await getBalances(address))
    counter++
  }
}

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balanceBigInt)
}

async function consoleMemo(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp
    const name = memo.name
    const from = memo.bhagwan
    const message = memo.message
    console.log(`${name} send ${message} from ${from} at ${timestamp}`)
  }
}

async function main() {
  const chai = await hre.ethers.getContractFactory("Chai")
  const chaiContract = await chai.deploy()
  await chaiContract.deployed()
  console.log(`Contract deployed at :::: ${chaiContract.address}`)

  const [owner, from1, from2, from3] = await hre.ethers.getSigners()
  const addresses = [owner.address, from1.address, from2.address, from3.address]

  console.log("Before transaction balance")
  await consoleBalance(addresses)

  const amt = { value: hre.ethers.utils.parseEther("12") }

  await chaiContract.connect(from1).sendChai("rohit", "trying hard", amt)
  await chaiContract.connect(from2).sendChai("prakash", "bammam bacchi", amt)
  console.log("balance after tx ::::")
  await consoleBalance(addresses)
  
  const memos = await chaiContract.getSenders()
  consoleMemo(memos)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

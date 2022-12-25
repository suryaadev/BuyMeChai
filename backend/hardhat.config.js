require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config()

const RPC_GOERLI_URL = process.env.RPC_GOERLI_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli :{
      url : RPC_GOERLI_URL,
      accounts : [PRIVATE_KEY],
      chainId : 5
    }
  }
};

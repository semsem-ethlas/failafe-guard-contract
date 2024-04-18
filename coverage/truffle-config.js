const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const { mnemonic } = require("./conf/secret.json");

//truffle migrage --compile-none

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    light: {
      // used to stop truffle test from deploying everytime; migration scripts skip if this is the network
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    test: {
      host: "127.0.0.1",
      port: 8555,
      network_id: "*",
      disableConfirmationListener: true,
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://matic-mumbai.chainstacklabs.com`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      networkCheckTimeout: 9000000,
      skipDryRun: true,
      gasPrice: 200000000000,
    },

    ethereum: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://mainnet.infura.io/v3/d2bbc76d69b64b0d8a3069de72cbe41d`
        ),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      networkCheckTimeout: 9000000,
      skipDryRun: true,
      gasPrice: 200000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.20",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "paris",
      },
    },
  },

  mocha: {
    timeout: 1000000,
  },
  plugins: ["truffle-plugin-verify", "solidity-coverage"],
  api_keys: {
    etherscan: "ESSYV1XVW7Z33QM2DACRESJ1YN7JBS1BY4",
  },
};

#NOTICE
This repository belongs to https://eleoslabs.io web3 engineering team and is provisioned for code review and security analysis.

## Failsafe Gnosis Safe Guard Smart Contracts

This repository contains Failsafe Gnosis Safe Guard smart contracts of https://getfailsafe.com/ web3 infrastructure.

## Specs

Are found in the [Failsafe Guard document](./docs/AttestationGuard.md) file

# **Getting Started with local environment based on Truffle.**

```bash
1- make sure you have node version is 16.0.0 and above & npm installed: https://nodejs.org/en/download/
2- make sure you have truffle, follow the instructions provided here: https://trufflesuite.com/docs/truffle/getting-started/installation/
3- make sure you have Ganache, follow the instructions provided here: (https://trufflesuite.com/blog/introducing-ganache-7/)
4- install the latest revision of the contract repository
   $ git clone git@github.com:semsem-ethlas/failsafe-guard-contract
5- cd failsafe-guard-contract/coverage
6- $ npm install
7- Compile the contracts:
   $ truffle compile
8- start local blockchain:
   $ ganache --fork.url https://polygon-mainnet.g.alchemy.com/v2/agK85zPuoV9kkhO0hMk4zM1EwVm2jflx -m "$(cat conf/.secret)" -i 1 --gasLimit 800000000
9- truffle migrate
10- to run normal unit tests on the AttestationGuard contract:
   $ truffle test --network light test/AttestationGuard_test.js --compile-none
11- to run normal unit tests on the AttestationGuardFactory contract:
   $ truffle test --network light test/AttestationGuardFactory_test.js --compile-none
12- to run normal unit tests on the safeMath lib:
   $ truffle test --network light test/safeMath_test..js --compile-none

```

# **Getting Started with solidity_coverage**

using the following package:
● solidity-coverage@0.7.22
● truffle@5.11.5

```bash
$ cd failsafe-guard-contract/coverage
$ npm install
$ npx truffle run coverage --temp build --network test
$ cd coverage
$ open index.html in web browser to see all coverage report
```

## Project Structure

This is a truffle JavaScript project.

## Contracts

Solidity smart contracts are found in [contracts](./contracts).

## Tests

Tests are found in the [test](./test) folder.
[helper contract](./contracts/notForAudit_test_cases.sol)and (./notForAudit_test_cases) contains test helper contracts which not included in Audit.

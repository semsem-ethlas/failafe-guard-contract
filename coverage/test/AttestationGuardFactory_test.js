const { expectRevert, constants } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const AttestationGuardFactory = artifacts.require("AttestationGuardFactory");

contract("AttestationGuardFactory", (accounts) => {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const stranger = accounts[3];

  const { MAX_INT256, ZERO_BYTES32, ZERO_ADDRESS } = constants;

  let attestationguardfactory;

  beforeEach(async () => {
    attestationguardfactory = await AttestationGuardFactory.new({
      from: owner,
    });
  });

  describe("owner", () => {});

  describe("renounceOwnership", () => {
    it("renounceOwnership", async function () {
      await attestationguardfactory.renounceOwnership({ from: owner });
      expect(await attestationguardfactory.owner()).to.not.equal(owner);
      expect(await attestationguardfactory.owner()).to.equal(ZERO_ADDRESS);
      let owner_address = await attestationguardfactory.owner({ from: owner });
      console.log(
        "retrieved owner_address after renounceOwnership: " +
          JSON.stringify(owner_address, null, 2)
      );
      await expectRevert(
        attestationguardfactory.renounceOwnership({
          from: user2,
        }),
        `Custom error (could not decode)`
      );
    });
  });

  describe("transferOwnership", () => {
    it("transferOwnership", async function () {
      await attestationguardfactory.transferOwnership(user2, { from: owner });
      expect(await attestationguardfactory.owner()).to.not.equal(owner);
      expect(await attestationguardfactory.owner()).to.equal(user2);
      let new_owner = await attestationguardfactory.owner({ from: owner });
      console.log(
        "retrieved new_owner_address: " + JSON.stringify(new_owner, null, 2)
      );
      await expectRevert(
        attestationguardfactory.transferOwnership(user2, {
          from: stranger,
        }),
        `Custom error (could not decode)`
      );
    });
  });

  describe("createAttestationGuard", () => {
    it("createAttestationGuard", async function () {
      let new_contract = await attestationguardfactory.createAttestationGuard(
        user2,
        { from: owner }
      );
      console.log(
        "retrieved new_contract_address: " +
          JSON.stringify(new_contract, null, 2)
      );
    });
  });
});

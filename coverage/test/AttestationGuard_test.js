const { expectRevert, constants } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const AttestationGuard = artifacts.require("AttestationGuard");
const Safe1 = artifacts.require("safeL2");
const ethereumjs = require("ethereumjs-util");

let get_signature = async function (msgHash, privateKey) {
  msgHash = msgHash.substring(2);
  privateKey = privateKey.substring(2);
  const last_hash_encoded = Buffer.from(msgHash, "hex");
  console.log("msghash: " + last_hash_encoded.toString("hex"));

  const sig = ethereumjs.ecsign(
    last_hash_encoded,
    Buffer.from(privateKey, "hex")
  );
  //console.log("ecsign=");
  //console.log(JSON.stringify(sig));
  //console.log("converted=>");
  let r = `0x${sig.r.toString("hex")}`;
  let r1 = r.replace("0x", "");
  //console.log("r= " + r);
  let s = `0x${sig.s.toString("hex")}`;
  let s1 = s.replace("0x", "");
  //console.log("s= " + s);
  let v = sig.v;
  //console.log("v= " + v);
  const last_sig =
    "0x" +
    Buffer.concat([
      Buffer.from(r1, "hex"),
      Buffer.from(s1, "hex"),
      Buffer.from([v]),
    ]).toString("hex");

  console.log("signature: " + last_sig);

  return last_sig;
};

contract("AttestationGuard", (accounts) => {
  const owner = accounts[0];
  console.log("owner: " + owner.privateKey);
  const user1 = accounts[1];
  const user2 = accounts[2];
  const stranger = accounts[3];
  const { MAX_INT256, ZERO_BYTES32, ZERO_ADDRESS } = constants;
  const to = stranger;
  const value = "0";
  const data =
    "0xa9059cbb000000000000000000000000bca9e8e5322c594353e2f3dbbc9dc1dd19389369000000000000000000000000000000000000000000000000000009184e72a000";
  const operation = 0;
  const interfaceId = "0x945b8148";
  const safeTxGas = 0;
  const baseGas = 0;
  const gasPrice = 0;
  const gasToken = ZERO_ADDRESS;
  const refundReceiver = ZERO_ADDRESS;
  const data1 =
    "0x285af1c64205e72e92baa10ba12ba59b03ebd788cfb8e77a1bd2096093b16a2b597babe8246388893cd69d3fe9578f187f44878c78e657db7aee5e2db351a8e01f5478fdec36339b4e37e2bec38f32f4b18c06c5cdd7e12a52784c09b40a601dfe7ab6982cf2f9e7fe42a3117e91244d4f5621d09cddc21eff92b69b57c79eebc31f7ea73f48d1272c5304de4b02281b6e4ece423b1d1a8bb4fbfdd15ea2168765fb7f4da3693f20e9b5f8e164dab7dfd0dee54aaec9d8d2c5fb99f21154e26723e420";
  const data2 =
    "0x1c4509ccf426448a22247349225589ad0570117607db35455b8da02047c32921c7fd9d2374d70e4a1e9f0a465352c3394244c980441aba26b8909e100bae35970081ddff";
  const data3 =
    "0xe2bec38f32f4b18c06c5cdd7e12a52784c09b40a601dfe7ab6982cf2f9e7fe42a3117e91244d4f5621d09cddc21eff92b69b57c79eebc31f7ea73f48d1272c5304";
  const address = user1;

  let attestationguard;
  let safe;

  // Be sure to update these constructor values
  let _attestationAuthority = user1;

  beforeEach(async () => {
    attestationguard = await AttestationGuard.new(_attestationAuthority, {
      from: owner,
    });
    safe = await Safe1.new({
      from: owner,
    });
  });

  describe("attestationAuthority", () => {
    it("setAttestationAutority2", async function () {
      await expectRevert(
        AttestationGuard.new(ZERO_ADDRESS, {
          from: owner,
        }),
        `must use a valid attestation addr`
      );
    });
  });

  describe("attestationPolicyThumbprint", () => {});

  describe("attestedHashes", () => {});

  describe("owner", () => {});

  describe("renounceOwnership", () => {
    it("renounceOwnership", async function () {
      await attestationguard.renounceOwnership({ from: owner });
      expect(await attestationguard.owner()).to.not.equal(owner);
      expect(await attestationguard.owner()).to.equal(ZERO_ADDRESS);
      let owner_address = await attestationguard.owner({ from: owner });
      console.log(
        "retrieved owner_address after renounceOwnership: " +
          JSON.stringify(owner_address, null, 2)
      );
      await expectRevert(
        attestationguard.renounceOwnership({
          from: user2,
        }),
        `Custom error (could not decode)`
      );
    });
  });

  describe("supportsInterface", () => {
    it("supportsInterface", async function () {
      await attestationguard.supportsInterface(interfaceId, { from: user1 });
    });
  });

  //describe("transferOwnership", () => {});

  describe("enforceAttestation", () => {
    it("enforceAttestation", async function () {
      await expectRevert(
        attestationguard.enforceAttestation(true, {
          from: owner,
        }),
        `caller not authorized`
      );

      await attestationguard.enforceAttestation(true, { from: user1 });
    });
  });

  describe("setAttestationAutority", () => {
    it("setAttestationAutority1", async function () {
      await expectRevert(
        attestationguard.setAttestationAutority(user2, {
          from: owner,
        }),
        `caller not authorized`
      );

      await attestationguard.setAttestationAutority(owner, { from: user1 });
    });

    it("setAttestationAutority2", async function () {
      await expectRevert(
        attestationguard.setAttestationAutority(ZERO_ADDRESS, {
          from: user1,
        }),
        `must use a valid attestation addr`
      );
    });
  });

  describe("setAttestationPolicyThumbprint", () => {
    it("setAttestationPolicyThumbprint", async function () {
      await expectRevert(
        attestationguard.setAttestationPolicyThumbprint(ZERO_BYTES32, {
          from: owner,
        }),
        `caller not authorized`
      );

      await attestationguard.setAttestationPolicyThumbprint(ZERO_BYTES32, {
        from: user1,
      });
    });
  });

  describe("attestHash", () => {
    it("attestHash", async function () {
      await expectRevert(
        attestationguard.attestHash(ZERO_BYTES32, {
          from: owner,
        }),
        `caller not authorized`
      );

      await attestationguard.attestHash(ZERO_BYTES32, {
        from: user1,
      });
    });
  });

  describe("checkTransaction", () => {
    it("checkTransaction1", async function () {
      await expectRevert(
        attestationguard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          data1,
          address,
          {
            from: safe.address,
          }
        ),
        `revert Invalid nonce for attestation guard`
      );
    });
    it("checkTransaction2", async function () {
      await attestationguard.enforceAttestation(false, { from: user1 });
      await attestationguard.checkTransaction(
        to,
        value,
        data,
        operation,
        safeTxGas,
        baseGas,
        gasPrice,
        gasToken,
        refundReceiver,
        data1,
        address,
        {
          from: safe.address,
        }
      );
    });

    it("checkTransaction3", async function () {
      await safe.addNonce({ from: user1 });
      await safe.addNonce({ from: user1 });
      nonce = await safe.nonce({ from: user1 });
      console.log("nonce: " + nonce);
      txhash = await safe.getTransactionHash(
        to,
        value,
        data,
        operation,
        safeTxGas,
        baseGas,
        gasPrice,
        gasToken,
        refundReceiver,
        nonce - 1,
        {
          from: safe.address,
        }
      );
      console.log(txhash);
      await attestationguard.attestHash(txhash, {
        from: user1,
      });
      ss = await attestationguard.checkTransaction(
        to,
        value,
        data,
        operation,
        safeTxGas,
        baseGas,
        gasPrice,
        gasToken,
        refundReceiver,
        data1,
        address,
        {
          from: safe.address,
        }
      );
    });

    it("checkTransaction4", async function () {
      await safe.addNonce({ from: user1 });
      await safe.addNonce({ from: user1 });
      nonce = await safe.nonce({ from: user1 });
      await expectRevert(
        attestationguard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          ZERO_BYTES32,
          address,
          {
            from: safe.address,
          }
        ),
        `unexpected signature stream`
      );
    });

    it("checkTransaction5", async function () {
      await safe.addNonce({ from: user1 });
      await safe.addNonce({ from: user1 });
      nonce = await safe.nonce({ from: user1 });
      await expectRevert(
        attestationguard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          data1,
          address,
          {
            from: safe.address,
          }
        ),
        `transaction attestation missing`
      );
    });

    it("checkTransaction6", async function () {
      await safe.addNonce({ from: user1 });
      await safe.addNonce({ from: user1 });
      nonce = await safe.nonce({ from: user1 });
      await expectRevert(
        attestationguard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          data2,
          address,
          {
            from: safe.address,
          }
        ),
        `transaction attestation missing`
      );
    });

    it("checkTransaction7", async function () {
      await safe.addNonce({ from: user1 });
      await safe.addNonce({ from: user1 });
      nonce = await safe.nonce({ from: user1 });
      await expectRevert(
        attestationguard.checkTransaction(
          to,
          value,
          data,
          operation,
          safeTxGas,
          baseGas,
          gasPrice,
          gasToken,
          refundReceiver,
          data3,
          address,
          {
            from: safe.address,
          }
        ),
        `transaction attestation missing`
      );
    });

    it("checkTransaction8", async function () {
      //const networkId = await web3.eth.net.getId();
      //const chainId1 = await web3.eth.getChainId();
      await web3.eth.accounts.wallet.create(1);
      firstAccount = web3.eth.accounts.wallet[0];
      console.log("firstAccount: " + JSON.stringify(firstAccount));
      await safe.addNonce({ from: user1 });
      await safe.addNonce({ from: user1 });
      nonce = await safe.nonce({ from: user1 });
      console.log("nonce: " + nonce);
      txhash = await safe.getTransactionHash(
        to,
        value,
        data,
        operation,
        safeTxGas,
        baseGas,
        gasPrice,
        gasToken,
        refundReceiver,
        nonce - 1,
        {
          from: safe.address,
        }
      );
      console.log("txhash: " + txhash);
      await attestationguard.setAttestationAutority(firstAccount.address, {
        from: user1,
      });
      signature = await get_signature(txhash, firstAccount.privateKey);
      console.log("signature: " + signature);
      await attestationguard.checkTransaction(
        to,
        value,
        data,
        operation,
        safeTxGas,
        baseGas,
        gasPrice,
        gasToken,
        refundReceiver,
        signature,
        address,
        {
          from: safe.address,
        }
      );
    });
  });

  describe("checkAfterExecution", () => {
    it("checkAfterExecution", async function () {
      await attestationguard.checkAfterExecution(ZERO_BYTES32, true, {
        from: user1,
      });
    });
  });

  describe("checkModuleTransaction", () => {
    it("checkModuleTransaction", async function () {
      await attestationguard.checkModuleTransaction(
        to,
        value,
        data,
        operation,
        user1,
        {
          from: user1,
        }
      );
    });
  });
});

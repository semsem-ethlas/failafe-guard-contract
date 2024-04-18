const safeMath_test = artifacts.require("safeL2");
const { expectRevert, constants } = require("@openzeppelin/test-helpers");

contract("safeMath_test", (accounts) => {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const stranger = accounts[3];

  let a = 0;
  let b = 0;

  let safemath_test;

  beforeEach(async () => {
    safemath_test = await safeMath_test.new({ from: owner });
  });

  describe("mul", () => {
    it("mul", async function () {
      await safemath_test.mul(a, b, { from: user1 });
    });
  });

  describe("sub", () => {
    it("sub", async function () {
      await safemath_test.sub(a, b, { from: user2 });
      await expectRevert.unspecified(
        safemath_test.sub(a, "10", { from: user2 }),
        ``
      );
    });
  });

  describe("add", () => {
    it("add", async function () {
      await safemath_test.add(a, b, { from: stranger });
    });
  });

  describe("max", () => {
    it("max", async function () {
      await safemath_test.max(a, b, { from: owner });
    });
  });
});

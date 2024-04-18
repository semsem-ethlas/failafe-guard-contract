# SignatureDecoder - Decodes signatures encoded as bytes (SignatureDecoder.sol)

View Source: [/notForAudit_test_cases/contracts/common/SignatureDecoder.sol](../notForAudit_test_cases/contracts/common/SignatureDecoder.sol)

**↘ Derived Contracts: [AttestationGuard](AttestationGuard.md), [Safe](Safe.md)**

**SignatureDecoder**

## Functions

- [signatureSplit(bytes signatures, uint256 pos)](#signaturesplit)

### signatureSplit

Splits signature bytes into `uint8 v, bytes32 r, bytes32 s`.

```solidity
function signatureSplit(bytes signatures, uint256 pos) internal pure
returns(v uint8, r bytes32, s bytes32)
```

**Arguments**

| Name       | Type    | Description                                                                                                              |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| signatures | bytes   | The signature format is a compact form of {bytes32 r}{bytes32 s}{uint8 v} Compact means uint8 is not padded to 32 bytes. |
| pos        | uint256 | , to avoid out of bounds access on                                                                                       |

**Returns**

v Recovery ID or Safe signature type.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function signatureSplit(bytes memory signatures, uint256 pos) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            let signaturePos := mul(0x41, pos)
            r := mload(add(signatures, add(signaturePos, 0x20)))
            s := mload(add(signatures, add(signaturePos, 0x40)))
            v := byte(0, mload(add(signatures, add(signaturePos, 0x60))))
        }
        /* solhint-enable no-inline-assembly */
    }
```

</details>

## Contracts

- [AttestationGuard](AttestationGuard.md)
- [AttestationGuardFactory](AttestationGuardFactory.md)
- [BaseGuard](BaseGuard.md)
- [Context](Context.md)
- [Enum](Enum.md)
- [ErrorMessage](ErrorMessage.md)
- [Executor](Executor.md)
- [FallbackManager](FallbackManager.md)
- [Guard](Guard.md)
- [GuardManager](GuardManager.md)
- [IERC165](IERC165.md)
- [IFallbackManager](IFallbackManager.md)
- [IGuardManager](IGuardManager.md)
- [IModuleManager](IModuleManager.md)
- [IOwnerManager](IOwnerManager.md)
- [ISafe](ISafe.md)
- [ISignatureValidator](ISignatureValidator.md)
- [ISignatureValidatorConstants](ISignatureValidatorConstants.md)
- [ModuleManager](ModuleManager.md)
- [NativeCurrencyPaymentFallback](NativeCurrencyPaymentFallback.md)
- [Ownable](Ownable.md)
- [OwnerManager](OwnerManager.md)
- [Safe](Safe.md)
- [SafeL2](SafeL2.md)
- [SafeMath](SafeMath.md)
- [SecuredTokenTransfer](SecuredTokenTransfer.md)
- [SelfAuthorized](SelfAuthorized.md)
- [SignatureDecoder](SignatureDecoder.md)
- [Singleton](Singleton.md)
- [StorageAccessible](StorageAccessible.md)

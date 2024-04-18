# Error Message - Contract which uses assembly to revert with a custom error message. (ErrorMessage.sol)

View Source: [/notForAudit_test_cases/contracts/libraries/ErrorMessage.sol](../notForAudit_test_cases/contracts/libraries/ErrorMessage.sol)

**↘ Derived Contracts: [SelfAuthorized](SelfAuthorized.md)**

**ErrorMessage**

The aim is to save gas using assembly to revert with custom error message.

## Functions

- [revertWithError(bytes5 error)](#revertwitherror)

### revertWithError

Function which uses assembly to revert with the passed error message.

```solidity
function revertWithError(bytes5 error) internal pure
```

**Arguments**

| Name  | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| error | bytes5 | The error string to revert with. |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function revertWithError(bytes5 error) internal pure {
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, 0x08c379a000000000000000000000000000000000000000000000000000000000) // Selector for method "Error(string)"
            mstore(add(ptr, 0x04), 0x20) // String offset
            mstore(add(ptr, 0x24), 0x05) // Revert reason length (5 bytes for bytes5)
            mstore(add(ptr, 0x44), error) // Revert reason
            revert(ptr, 0x64) // Revert data length is 4 bytes for selector + offset + error length + error.
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

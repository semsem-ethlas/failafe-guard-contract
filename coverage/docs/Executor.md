# Executor - A contract that can execute transactions (Executor.sol)

View Source: [/notForAudit_test_cases/contracts/base/Executor.sol](../notForAudit_test_cases/contracts/base/Executor.sol)

**↘ Derived Contracts: [ModuleManager](ModuleManager.md)**

**Executor**

## Functions

- [execute(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 txGas)](#execute)

### execute

Executes either a delegatecall or a call with provided parameters.

```solidity
function execute(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 txGas) internal nonpayable
returns(success bool)
```

**Arguments**

| Name      | Type                | Description          |
| --------- | ------------------- | -------------------- |
| to        | address             | Destination address. |
| value     | uint256             | Ether value.         |
| data      | bytes               | Data payload.        |
| operation | enum Enum.Operation | Operation type.      |
| txGas     | uint256             |                      |

**Returns**

success boolean flag indicating if the call succeeded.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function execute(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        uint256 txGas
    ) internal returns (bool success) {
        if (operation == Enum.Operation.DelegateCall) {
            /* solhint-disable no-inline-assembly */
            /// @solidity memory-safe-assembly
            assembly {
                success := delegatecall(txGas, to, add(data, 0x20), mload(data), 0, 0)
            }
            /* solhint-enable no-inline-assembly */
        } else {
            /* solhint-disable no-inline-assembly */
            /// @solidity memory-safe-assembly
            assembly {
                success := call(txGas, to, value, add(data, 0x20), mload(data), 0, 0)
            }
            /* solhint-enable no-inline-assembly */
        }
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

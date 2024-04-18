# Guard Interface (Guard.sol)

View Source: [/notForAudit_test_cases/contracts/base/GuardManager.sol](../notForAudit_test_cases/contracts/base/GuardManager.sol)

**↗ Extends: [IERC165](IERC165.md)**

**Guard**

## Contract Members

**Constants & Variables**

```js
bytes32 internal constant GUARD_STORAGE_SLOT;

```

## Functions

- [checkTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver, bytes signatures, address msgSender)](#checktransaction)
- [checkModuleTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, address module)](#checkmoduletransaction)
- [checkAfterExecution(bytes32 hash, bool success)](#checkafterexecution)
- [supportsInterface(bytes4 interfaceId)](#supportsinterface)
- [setGuard(address guard)](#setguard)
- [getGuard()](#getguard)

### checkTransaction

Checks the transaction details.

```solidity
function checkTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver, bytes signatures, address msgSender) external nonpayable
```

**Arguments**

| Name           | Type                | Description                                       |
| -------------- | ------------------- | ------------------------------------------------- |
| to             | address             | The address to which the transaction is intended. |
| value          | uint256             | The value of the transaction in Wei.              |
| data           | bytes               | The transaction data.                             |
| operation      | enum Enum.Operation | The type of operation of the transaction.         |
| safeTxGas      | uint256             | Gas used for the transaction.                     |
| baseGas        | uint256             | The base gas for the transaction.                 |
| gasPrice       | uint256             | The price of gas in Wei for the transaction.      |
| gasToken       | address             | The token used to pay for gas.                    |
| refundReceiver | address payable     | The address which should receive the refund.      |
| signatures     | bytes               | The signatures of the transaction.                |
| msgSender      | address             | The address of the message sender.                |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures,
        address msgSender
    ) external;
```

</details>

### checkModuleTransaction

Checks the module transaction details.

```solidity
function checkModuleTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, address module) external nonpayable
returns(moduleTxHash bytes32)
```

**Arguments**

| Name      | Type                | Description                                       |
| --------- | ------------------- | ------------------------------------------------- |
| to        | address             | The address to which the transaction is intended. |
| value     | uint256             | The value of the transaction in Wei.              |
| data      | bytes               | The transaction data.                             |
| operation | enum Enum.Operation | The type of operation of the transaction.         |
| module    | address             | The module involved in the transaction.           |

**Returns**

moduleTxHash The hash of the module transaction.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkModuleTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        address module
    ) external returns (bytes32 moduleTxHash);
```

</details>

### checkAfterExecution

Checks after execution of transaction.

```solidity
function checkAfterExecution(bytes32 hash, bool success) external nonpayable
```

**Arguments**

| Name    | Type    | Description                              |
| ------- | ------- | ---------------------------------------- |
| hash    | bytes32 | The hash of the transaction.             |
| success | bool    | The status of the transaction execution. |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkAfterExecution(bytes32 hash, bool success) external;
```

</details>

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view
returns(bool)
```

**Arguments**

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| interfaceId | bytes4 |             |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function supportsInterface(bytes4 interfaceId) external view virtual override returns (bool) {
        return
            interfaceId == type(Guard).interfaceId || // 0x945b8148
            interfaceId == type(IERC165).interfaceId; // 0x01ffc9a7
    }
```

</details>

### setGuard

```solidity
function setGuard(address guard) external nonpayable authorized
```

**Arguments**

| Name  | Type    | Description |
| ----- | ------- | ----------- |
| guard | address |             |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setGuard(address guard) external override authorized {
        if (guard != address(0) && !Guard(guard).supportsInterface(type(Guard).interfaceId)) revertWithError("GS300");
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            sstore(GUARD_STORAGE_SLOT, guard)
        }
        /* solhint-enable no-inline-assembly */
        emit ChangedGuard(guard);
    }
```

</details>

### getGuard

Internal method to retrieve the current guard
We do not have a public method because we're short on bytecode size limit,
to retrieve the guard address, one can use `getStorageAt` from `StorageAccessible` contract
with the slot `GUARD_STORAGE_SLOT`

```solidity
function getGuard() internal view
returns(guard address)
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getGuard() internal view returns (address guard) {
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            guard := sload(GUARD_STORAGE_SLOT)
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

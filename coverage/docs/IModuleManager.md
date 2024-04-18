# IModuleManager - An interface of contract managing Safe modules (IModuleManager.sol)

View Source: [/notForAudit_test_cases/contracts/interfaces/IModuleManager.sol](../notForAudit_test_cases/contracts/interfaces/IModuleManager.sol)

**↗ Extends: [IGuardManager](IGuardManager.md)**
**↘ Derived Contracts: [ISafe](ISafe.md), [ModuleManager](ModuleManager.md)**

**IModuleManager**

Modules are extensions with unlimited access to a Safe that can be added to a Safe by its owners.
⚠️ WARNING: Modules are a security risk since they can execute arbitrary transactions,
so only trusted and audited modules should be added to a Safe. A malicious module can
completely takeover a Safe.

**Events**

```js
event EnabledModule(address indexed module);
event DisabledModule(address indexed module);
event ExecutionFromModuleSuccess(address indexed module);
event ExecutionFromModuleFailure(address indexed module);
```

## Functions

- [enableModule(address module)](#enablemodule)
- [disableModule(address prevModule, address module)](#disablemodule)
- [execTransactionFromModule(address to, uint256 value, bytes data, enum Enum.Operation operation)](#exectransactionfrommodule)
- [execTransactionFromModuleReturnData(address to, uint256 value, bytes data, enum Enum.Operation operation)](#exectransactionfrommodulereturndata)
- [isModuleEnabled(address module)](#ismoduleenabled)
- [getModulesPaginated(address start, uint256 pageSize)](#getmodulespaginated)

### enableModule

Enables the module `module` for the Safe.

```solidity
function enableModule(address module) external nonpayable
```

**Arguments**

| Name   | Type    | Description               |
| ------ | ------- | ------------------------- |
| module | address | Module to be whitelisted. |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion enableModule(address module) external;

```

</details>

### disableModule

Disables the module `module` for the Safe.

```solidity
function disableModule(address prevModule, address module) external nonpayable
```

**Arguments**

| Name       | Type    | Description                                 |
| ---------- | ------- | ------------------------------------------- |
| prevModule | address | Previous module in the modules linked list. |
| module     | address | Module to be removed.                       |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion disableModule(address prevModule, address module) external;

```

</details>

### execTransactionFromModule

Execute `operation` (0: Call, 1: DelegateCall) to `to` with `value` (Native Token)

```solidity
function execTransactionFromModule(address to, uint256 value, bytes data, enum Enum.Operation operation) external nonpayable
returns(success bool)
```

**Arguments**

| Name      | Type                | Description                                |
| --------- | ------------------- | ------------------------------------------ |
| to        | address             | Destination address of module transaction. |
| value     | uint256             | Ether value of module transaction.         |
| data      | bytes               | Data payload of module transaction.        |
| operation | enum Enum.Operation | Operation type of module transaction.      |

**Returns**

success Boolean flag indicating if the call succeeded.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion execTransactionFromModule(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation
    ) external returns (bool success);

```

</details>

### execTransactionFromModuleReturnData

Execute `operation` (0: Call, 1: DelegateCall) to `to` with `value` (Native Token) and return data

```solidity
function execTransactionFromModuleReturnData(address to, uint256 value, bytes data, enum Enum.Operation operation) external nonpayable
returns(success bool, returnData bytes)
```

**Arguments**

| Name      | Type                | Description                                |
| --------- | ------------------- | ------------------------------------------ |
| to        | address             | Destination address of module transaction. |
| value     | uint256             | Ether value of module transaction.         |
| data      | bytes               | Data payload of module transaction.        |
| operation | enum Enum.Operation | Operation type of module transaction.      |

**Returns**

success Boolean flag indicating if the call succeeded.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion execTransactionFromModuleReturnData(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation
    ) external returns (bool success, bytes memory returnData);

```

</details>

### isModuleEnabled

Returns if an module is enabled

```solidity
function isModuleEnabled(address module) external view
returns(bool)
```

**Arguments**

| Name   | Type    | Description |
| ------ | ------- | ----------- |
| module | address |             |

**Returns**

True if the module is enabled

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion isModuleEnabled(address module) external view returns (bool);

```

</details>

### getModulesPaginated

Returns an array of modules.
If all entries fit into a single page, the next pointer will be 0x1.
If another page is present, next will be the last element of the returned array.

```solidity
function getModulesPaginated(address start, uint256 pageSize) external view
returns(array address[], next address)
```

**Arguments**

| Name     | Type    | Description                                                          |
| -------- | ------- | -------------------------------------------------------------------- |
| start    | address | Start of the page. Has to be a module or start pointer (0x1 address) |
| pageSize | uint256 | Maximum number of modules that should be returned. Has to be > 0     |

**Returns**

array Array of modules.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion getModulesPaginated(address start, uint256 pageSize) external view returns (address[] memory array, address next);
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

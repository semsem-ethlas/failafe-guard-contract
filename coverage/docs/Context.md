# Context.sol

View Source: [@openzeppelin/contracts/utils/Context.sol](../@openzeppelin/contracts/utils/Context.sol)

**↘ Derived Contracts: [Ownable](Ownable.md)**

**Context**

Provides information about the current execution context, including the
sender of the transaction and its data. While these are generally available
via msg.sender and msg.data, they should not be accessed in such a direct
manner, since when dealing with meta-transactions the account sending and
paying for execution may not be the actual sender (as far as an application
is concerned).
This contract is only required for intermediate, library-like contracts.

## Functions

- [\_msgSender()](#_msgsender)
- [\_msgData()](#_msgdata)
- [\_contextSuffixLength()](#_contextsuffixlength)

### \_msgSender

```solidity
function _msgSender() internal view
returns(address)
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
```

</details>

### \_msgData

```solidity
function _msgData() internal view
returns(bytes)
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
```

</details>

### \_contextSuffixLength

```solidity
function _contextSuffixLength() internal view
returns(uint256)
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
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

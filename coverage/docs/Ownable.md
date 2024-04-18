# Ownable.sol

View Source: [@openzeppelin/contracts/access/Ownable.sol](../@openzeppelin/contracts/access/Ownable.sol)

**↗ Extends: [Context](Context.md)**
**↘ Derived Contracts: [AttestationGuard](AttestationGuard.md), [AttestationGuardFactory](AttestationGuardFactory.md)**

**Ownable**

Contract module which provides a basic access control mechanism, where
there is an account (an owner) that can be granted exclusive access to
specific functions.
The initial owner is set to the address provided by the deployer. This can
later be changed with {transferOwnership}.
This module is used through inheritance. It will make available the modifier
`onlyOwner`, which can be applied to your functions to restrict their use to
the owner.

## Contract Members

**Constants & Variables**

```js
address private _owner;

```

**Events**

```js
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

## Modifiers

- [onlyOwner](#onlyowner)

### onlyOwner

Throws if called by any account other than the owner.

```js
modifier onlyOwner() internal
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

## Functions

- [constructor(address initialOwner)](#)
- [owner()](#owner)
- [\_checkOwner()](#_checkowner)
- [renounceOwnership()](#renounceownership)
- [transferOwnership(address newOwner)](#transferownership)
- [\_transferOwnership(address newOwner)](#_transferownership)

###

Initializes the contract setting the address provided by the deployer as the initial owner.

```solidity
function (address initialOwner) internal nonpayable
```

**Arguments**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| initialOwner | address |             |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }
```

</details>

### owner

Returns the address of the current owner.

```solidity
function owner() public view
returns(address)
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function owner() public view virtual returns (address) {
        return _owner;
    }
```

</details>

### \_checkOwner

Throws if the sender is not the owner.

```solidity
function _checkOwner() internal view
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }
```

</details>

### renounceOwnership

Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions. Can only be called by the current owner.
NOTE: Renouncing ownership will leave the contract without an owner,
thereby disabling any functionality that is only available to the owner.

```solidity
function renounceOwnership() public nonpayable onlyOwner
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }
```

</details>

### transferOwnership

Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner.

```solidity
function transferOwnership(address newOwner) public nonpayable onlyOwner
```

**Arguments**

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| newOwner | address |             |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }
```

</details>

### \_transferOwnership

Transfers ownership of the contract to a new account (`newOwner`).
Internal function without access restriction.

```solidity
function _transferOwnership(address newOwner) internal nonpayable
```

**Arguments**

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| newOwner | address |             |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
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

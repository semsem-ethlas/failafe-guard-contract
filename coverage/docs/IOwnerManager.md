# IOwnerManager - Interface for contract which manages Safe owners and a threshold to authorize transactions. (IOwnerManager.sol)

View Source: [/notForAudit_test_cases/contracts/interfaces/IOwnerManager.sol](../notForAudit_test_cases/contracts/interfaces/IOwnerManager.sol)

**↘ Derived Contracts: [ISafe](ISafe.md), [OwnerManager](OwnerManager.md)**

**IOwnerManager**

**Events**

```js
event AddedOwner(address indexed owner);
event RemovedOwner(address indexed owner);
event ChangedThreshold(uint256  threshold);
```

## Functions

- [addOwnerWithThreshold(address owner, uint256 /\_threshold)](#addownerwiththreshold)
- [removeOwner(address prevOwner, address owner, uint256 /\_threshold)](#removeowner)
- [swapOwner(address prevOwner, address oldOwner, address newOwner)](#swapowner)
- [changeThreshold(uint256 /\_threshold)](#changethreshold)
- [getThreshold()](#getthreshold)
- [isOwner(address owner)](#isowner)
- [getOwners()](#getowners)

### addOwnerWithThreshold

Adds the owner `owner` to the Safe and updates the threshold to `_threshold`.

```solidity
function addOwnerWithThreshold(address owner, uint256 _threshold) external nonpayable
```

**Arguments**

| Name         | Type    | Description        |
| ------------ | ------- | ------------------ |
| owner        | address | New owner address. |
| /\_threshold | uint256 | New threshold.     |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function addOwnerWithThreshold(address owner, uint256 _threshold) external;
```

</details>

### removeOwner

Removes the owner `owner` from the Safe and updates the threshold to `_threshold`.

```solidity
function removeOwner(address prevOwner, address owner, uint256 _threshold) external nonpayable
```

**Arguments**

| Name         | Type    | Description                                                      |
| ------------ | ------- | ---------------------------------------------------------------- |
| prevOwner    | address | Owner that pointed to the owner to be removed in the linked list |
| owner        | address | Owner address to be removed.                                     |
| /\_threshold | uint256 | New threshold.                                                   |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function removeOwner(
        address prevOwner,
        address owner,
        uint256 _threshold
    ) external;
```

</details>

### swapOwner

Replaces the owner `oldOwner` in the Safe with `newOwner`.

```solidity
function swapOwner(address prevOwner, address oldOwner, address newOwner) external nonpayable
```

**Arguments**

| Name      | Type    | Description                                                       |
| --------- | ------- | ----------------------------------------------------------------- |
| prevOwner | address | Owner that pointed to the owner to be replaced in the linked list |
| oldOwner  | address | Owner address to be replaced.                                     |
| newOwner  | address | New owner address.                                                |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function swapOwner(
        address prevOwner,
        address oldOwner,
        address newOwner
    ) external;
```

</details>

### changeThreshold

Changes the threshold of the Safe to `_threshold`.

```solidity
function changeThreshold(uint256 _threshold) external nonpayable
```

**Arguments**

| Name         | Type    | Description    |
| ------------ | ------- | -------------- |
| /\_threshold | uint256 | New threshold. |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function changeThreshold(uint256 _threshold) external;
```

</details>

### getThreshold

Returns the number of required confirmations for a Safe transaction aka the threshold.

```solidity
function getThreshold() external view
returns(uint256)
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getThreshold() external view returns (uint256);
```

</details>

### isOwner

Returns if `owner` is an owner of the Safe.

```solidity
function isOwner(address owner) external view
returns(bool)
```

**Arguments**

| Name  | Type    | Description |
| ----- | ------- | ----------- |
| owner | address |             |

**Returns**

Boolean if owner is an owner of the Safe.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function isOwner(address owner) external view returns (bool);
```

</details>

### getOwners

Returns a list of Safe owners.

```solidity
function getOwners() external view
returns(address[])
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getOwners() external view returns (address[] memory);
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

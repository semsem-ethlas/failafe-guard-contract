# OwnerManager - Manages Safe owners and a threshold to authorize transactions. (OwnerManager.sol)

View Source: [\notForAudit_test_cases\contracts\base\OwnerManager.sol](..\notForAudit_test_cases\contracts\base\OwnerManager.sol)

**↗ Extends: [SelfAuthorized](SelfAuthorized.md), [IOwnerManager](IOwnerManager.md)**
**↘ Derived Contracts: [Safe](Safe.md)**

**OwnerManager**

Uses a linked list to store the owners because the code generate by the solidity compiler
      is more efficient than using a dynamic array.

## Contract Members
**Constants & Variables**

```js
address internal constant SENTINEL_OWNERS;
mapping(address => address) internal owners;
uint256 internal ownerCount;
uint256 internal threshold;

```

## Functions

- [setupOwners(address[] _owners, uint256 _threshold)](#setupowners)
- [addOwnerWithThreshold(address owner, uint256 _threshold)](#addownerwiththreshold)
- [removeOwner(address prevOwner, address owner, uint256 _threshold)](#removeowner)
- [swapOwner(address prevOwner, address oldOwner, address newOwner)](#swapowner)
- [changeThreshold(uint256 _threshold)](#changethreshold)
- [getThreshold()](#getthreshold)
- [isOwner(address owner)](#isowner)
- [getOwners()](#getowners)

### setupOwners

Sets the initial storage of the contract.

```solidity
function setupOwners(address[] _owners, uint256 _threshold) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owners | address[] | List of Safe owners. | 
| _threshold | uint256 | Number of required confirmations for a Safe transaction. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setupOwners(address[] memory _owners, uint256 _threshold) internal {
        // Threshold can only be 0 at initialization.
        // Check ensures that setup function can only be called once.
        if (threshold > 0) revertWithError("GS200");
        // Validate that threshold is smaller than number of added owners.
        if (_threshold > _owners.length) revertWithError("GS201");
        // There has to be at least one Safe owner.
        if (_threshold == 0) revertWithError("GS202");
        // Initializing Safe owners.
        address currentOwner = SENTINEL_OWNERS;
        for (uint256 i = 0; i < _owners.length; i++) {
            // Owner address cannot be null.
            address owner = _owners[i];
            if (owner == address(0) || owner == SENTINEL_OWNERS || owner == address(this) || currentOwner == owner)
                revertWithError("GS203");
            // No duplicate owners allowed.
            if (owners[owner] != address(0)) revertWithError("GS204");
            owners[currentOwner] = owner;
            currentOwner = owner;
        }
        owners[currentOwner] = SENTINEL_OWNERS;
        ownerCount = _owners.length;
        threshold = _threshold;
    }
```
</details>

### addOwnerWithThreshold

```solidity
function addOwnerWithThreshold(address owner, uint256 _threshold) public nonpayable authorized 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| _threshold | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function addOwnerWithThreshold(address owner, uint256 _threshold) public override authorized {
        // Owner address cannot be null, the sentinel or the Safe itself.
        if (owner == address(0) || owner == SENTINEL_OWNERS || owner == address(this)) revertWithError("GS203");
        // No duplicate owners allowed.
        if (owners[owner] != address(0)) revertWithError("GS204");
        owners[owner] = owners[SENTINEL_OWNERS];
        owners[SENTINEL_OWNERS] = owner;
        ownerCount++;
        emit AddedOwner(owner);
        // Change threshold if threshold was changed.
        if (threshold != _threshold) changeThreshold(_threshold);
    }
```
</details>

### removeOwner

```solidity
function removeOwner(address prevOwner, address owner, uint256 _threshold) public nonpayable authorized 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| prevOwner | address |  | 
| owner | address |  | 
| _threshold | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function removeOwner(address prevOwner, address owner, uint256 _threshold) public override authorized {
        // Only allow to remove an owner, if threshold can still be reached.
        if (ownerCount - 1 < _threshold) revertWithError("GS201");
        // Validate owner address and check that it corresponds to owner index.
        if (owner == address(0) || owner == SENTINEL_OWNERS) revertWithError("GS203");
        if (owners[prevOwner] != owner) revertWithError("GS205");
        owners[prevOwner] = owners[owner];
        owners[owner] = address(0);
        ownerCount--;
        emit RemovedOwner(owner);
        // Change threshold if threshold was changed.
        if (threshold != _threshold) changeThreshold(_threshold);
    }
```
</details>

### swapOwner

```solidity
function swapOwner(address prevOwner, address oldOwner, address newOwner) public nonpayable authorized 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| prevOwner | address |  | 
| oldOwner | address |  | 
| newOwner | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function swapOwner(address prevOwner, address oldOwner, address newOwner) public override authorized {
        // Owner address cannot be null, the sentinel or the Safe itself.
        if (newOwner == address(0) || newOwner == SENTINEL_OWNERS || newOwner == address(this)) revertWithError("GS203");
        // No duplicate owners allowed.
        if (owners[newOwner] != address(0)) revertWithError("GS204");
        // Validate oldOwner address and check that it corresponds to owner index.
        if (oldOwner == address(0) || oldOwner == SENTINEL_OWNERS) revertWithError("GS203");
        if (owners[prevOwner] != oldOwner) revertWithError("GS205");
        owners[newOwner] = owners[oldOwner];
        owners[prevOwner] = newOwner;
        owners[oldOwner] = address(0);
        emit RemovedOwner(oldOwner);
        emit AddedOwner(newOwner);
    }
```
</details>

### changeThreshold

```solidity
function changeThreshold(uint256 _threshold) public nonpayable authorized 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _threshold | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function changeThreshold(uint256 _threshold) public override authorized {
        // Validate that threshold is smaller than number of owners.
        if (_threshold > ownerCount) revertWithError("GS201");
        // There has to be at least one Safe owner.
        if (_threshold == 0) revertWithError("GS202");
        threshold = _threshold;
        emit ChangedThreshold(threshold);
    }
```
</details>

### getThreshold

```solidity
function getThreshold() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getThreshold() public view override returns (uint256) {
        return threshold;
    }
```
</details>

### isOwner

```solidity
function isOwner(address owner) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function isOwner(address owner) public view override returns (bool) {
        return !(owner == SENTINEL_OWNERS || owners[owner] == address(0));
    }
```
</details>

### getOwners

```solidity
function getOwners() public view
returns(address[])
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getOwners() public view override returns (address[] memory) {
        address[] memory array = new address[](ownerCount);

        // populate return array
        uint256 index = 0;
        address currentOwner = owners[SENTINEL_OWNERS];
        while (currentOwner != SENTINEL_OWNERS) {
            array[index] = currentOwner;
            currentOwner = owners[currentOwner];
            index++;
        }
        return array;
    }
```
</details>

## Contracts

* [AttestationGuard](AttestationGuard.md)
* [AttestationGuardFactory](AttestationGuardFactory.md)
* [BaseGuard](BaseGuard.md)
* [Context](Context.md)
* [Enum](Enum.md)
* [ErrorMessage](ErrorMessage.md)
* [Executor](Executor.md)
* [FallbackManager](FallbackManager.md)
* [Guard](Guard.md)
* [GuardManager](GuardManager.md)
* [IERC165](IERC165.md)
* [IFallbackManager](IFallbackManager.md)
* [IGuardManager](IGuardManager.md)
* [IModuleManager](IModuleManager.md)
* [IOwnerManager](IOwnerManager.md)
* [ISafe](ISafe.md)
* [ISignatureValidator](ISignatureValidator.md)
* [ISignatureValidatorConstants](ISignatureValidatorConstants.md)
* [ModuleManager](ModuleManager.md)
* [NativeCurrencyPaymentFallback](NativeCurrencyPaymentFallback.md)
* [Ownable](Ownable.md)
* [OwnerManager](OwnerManager.md)
* [Safe](Safe.md)
* [SafeL2](SafeL2.md)
* [SafeMath](SafeMath.md)
* [SecuredTokenTransfer](SecuredTokenTransfer.md)
* [SelfAuthorized](SelfAuthorized.md)
* [SignatureDecoder](SignatureDecoder.md)
* [Singleton](Singleton.md)
* [StorageAccessible](StorageAccessible.md)

# SafeL2.sol

View Source: [\contracts\notForAudit_test_cases.sol](..\contracts\notForAudit_test_cases.sol)

**↗ Extends: [Safe](Safe.md)**

**SafeL2**

## Functions

- [mul(uint256 a, uint256 b)](#mul)
- [sub(uint256 a, uint256 b)](#sub)
- [add(uint256 a, uint256 b)](#add)
- [max(uint256 a, uint256 b)](#max)

### mul

```solidity
function mul(uint256 a, uint256 b) public payable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mul(uint256 a, uint256 b) public payable returns (uint256) {

        return a.mul(b);

    }
```
</details>

### sub

```solidity
function sub(uint256 a, uint256 b) public payable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function sub(uint256 a, uint256 b) public payable returns (uint256) {

        return a.sub(b);

    }
```
</details>

### add

```solidity
function add(uint256 a, uint256 b) public payable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function add(uint256 a, uint256 b) public payable returns (uint256) {

        return a.add(b);

    }
```
</details>

### max

```solidity
function max(uint256 a, uint256 b) public payable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function max(uint256 a, uint256 b) public payable returns (uint256) {

        return a.max(b);

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

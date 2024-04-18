# AttestationGuardFactory.sol

View Source: [\contracts\guard\AttestationGuardFactory.sol](..\contracts\guard\AttestationGuardFactory.sol)

**↗ Extends: [Ownable](Ownable.md)**

**AttestationGuardFactory**

**Events**

```js
event AttestationGuardCreated(address  AttestationGuardAddr);
```

## Functions

- [constructor()](#)
- [createAttestationGuard(address attestationAuthority)](#createattestationguard)

### 

```solidity
function () public nonpayable Ownable 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor() Ownable(msg.sender) {}
```
</details>

### createAttestationGuard

```solidity
function createAttestationGuard(address attestationAuthority) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| attestationAuthority | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function createAttestationGuard(address attestationAuthority) public {

        AttestationGuard guardInstance = new AttestationGuard(

            attestationAuthority

        );

        //transferOwnership(tx.origin);

        emit AttestationGuardCreated(address(guardInstance));

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

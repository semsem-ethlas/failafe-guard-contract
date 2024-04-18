# SelfAuthorized - Authorizes current contract to perform actions to itself. (SelfAuthorized.sol)

View Source: [\notForAudit_test_cases\contracts\common\SelfAuthorized.sol](..\notForAudit_test_cases\contracts\common\SelfAuthorized.sol)

**↗ Extends: [ErrorMessage](ErrorMessage.md)**
**↘ Derived Contracts: [FallbackManager](FallbackManager.md), [ModuleManager](ModuleManager.md), [OwnerManager](OwnerManager.md)**

**SelfAuthorized**

## Modifiers

- [authorized](#authorized)

### authorized

```js
modifier authorized() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [requireSelfCall()](#requireselfcall)

### requireSelfCall

```solidity
function requireSelfCall() private view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function requireSelfCall() private view {
        if (msg.sender != address(this)) revertWithError("GS031");
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

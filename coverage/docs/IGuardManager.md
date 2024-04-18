# IGuardManager - A contract interface managing transaction guards which perform pre and post-checks on Safe transactions. (IGuardManager.sol)

View Source: [/notForAudit_test_cases/contracts/interfaces/IGuardManager.sol](../notForAudit_test_cases/contracts/interfaces/IGuardManager.sol)

**↘ Derived Contracts: [IModuleManager](IModuleManager.md)**

**IGuardManager**

**Events**

```js
event ChangedGuard(address indexed guard);
```

## Functions

- [setGuard(address guard)](#setguard)

### setGuard

Set Transaction Guard `guard` for the Safe. Make sure you trust the guard.

```solidity
function setGuard(address guard) external nonpayable
```

**Arguments**

| Name  | Type    | Description                                                               |
| ----- | ------- | ------------------------------------------------------------------------- |
| guard | address | The address of the guard to be used or the 0 address to disable the guard |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion setGuard(address guard) external;
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

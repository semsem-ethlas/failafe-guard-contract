# IFallbackManager - A contract interface managing fallback calls made to this contract. (IFallbackManager.sol)

View Source: [/notForAudit_test_cases/contracts/interfaces/IFallbackManager.sol](../notForAudit_test_cases/contracts/interfaces/IFallbackManager.sol)

**↘ Derived Contracts: [FallbackManager](FallbackManager.md), [ISafe](ISafe.md)**

**IFallbackManager**

**Events**

```js
event ChangedFallbackHandler(address indexed handler);
```

## Functions

- [setFallbackHandler(address handler)](#setfallbackhandler)

### setFallbackHandler

Set Fallback Handler to `handler` for the Safe.

```solidity
function setFallbackHandler(address handler) external nonpayable
```

**Arguments**

| Name    | Type    | Description                        |
| ------- | ------- | ---------------------------------- |
| handler | address | contract to handle fallback calls. |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setFallbackHandler(address handler) external;
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

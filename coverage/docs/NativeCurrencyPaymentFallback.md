# NativeCurrencyPaymentFallback - A contract that has a fallback to accept native currency payments. (NativeCurrencyPaymentFallback.sol)

View Source: [/notForAudit_test_cases/contracts/common/NativeCurrencyPaymentFallback.sol](../notForAudit_test_cases/contracts/common/NativeCurrencyPaymentFallback.sol)

**↘ Derived Contracts: [Safe](Safe.md)**

**NativeCurrencyPaymentFallback**

**Events**

```js
event SafeReceived(address indexed sender, uint256  value);
```

## Functions

- [constructor()](#)

###

Receive function accepts native currency transactions.

```solidity
function () external payable
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
receive() external payable {
        emit SafeReceived(msg.sender, msg.value);
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

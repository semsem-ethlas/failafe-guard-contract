# IERC165.sol

View Source: [/notForAudit_test_cases/contracts/interfaces/IERC165.sol](../notForAudit_test_cases/contracts/interfaces/IERC165.sol)

**↘ Derived Contracts: [BaseGuard](BaseGuard.md), [Guard](Guard.md), [GuardManager](GuardManager.md)**

**IERC165**

More details at https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol

## Functions

- [supportsInterface(bytes4 interfaceId)](#supportsinterface)

### supportsInterface

Returns true if this contract implements the interface defined by `interfaceId`.
See the corresponding EIP section
https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified
to learn more about how these ids are created.
This function call must use less than 30 000 gas.

```solidity
function supportsInterface(bytes4 interfaceId) external view
returns(bool)
```

**Arguments**

| Name        | Type   | Description |
| ----------- | ------ | ----------- |
| interfaceId | bytes4 |             |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function supportsInterface(bytes4 interfaceId) external view returns (bool);
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

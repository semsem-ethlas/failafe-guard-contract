# ISignatureValidator.sol

View Source: [\notForAudit_test_cases\contracts\interfaces\ISignatureValidator.sol](..\notForAudit_test_cases\contracts\interfaces\ISignatureValidator.sol)

**↗ Extends: [ISignatureValidatorConstants](ISignatureValidatorConstants.md)**

**ISignatureValidator**

## Contract Members
**Constants & Variables**

```js
bytes4 internal constant EIP1271_MAGIC_VALUE;

```

## Functions

- [isValidSignature(bytes32 _hash, bytes _signature)](#isvalidsignature)

### isValidSignature

EIP1271 method to validate a signature.

```solidity
function isValidSignature(bytes32 _hash, bytes _signature) external view
returns(bytes4)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _hash | bytes32 | Hash of the data signed on the behalf of address(this). | 
| _signature | bytes | Signature byte array associated with _data.  MUST return the bytes4 magic value 0x1626ba7e when function passes.  MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5)  MUST allow external calls | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function isValidSignature(bytes32 _hash, bytes memory _signature) external view virtual returns (bytes4);
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

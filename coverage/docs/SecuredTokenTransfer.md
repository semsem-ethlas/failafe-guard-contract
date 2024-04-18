# SecuredTokenTransfer - Secure token transfer. (SecuredTokenTransfer.sol)

View Source: [\notForAudit_test_cases\contracts\common\SecuredTokenTransfer.sol](..\notForAudit_test_cases\contracts\common\SecuredTokenTransfer.sol)

**↘ Derived Contracts: [Safe](Safe.md)**

**SecuredTokenTransfer**

## Functions

- [transferToken(address token, address receiver, uint256 amount)](#transfertoken)

### transferToken

Transfers a token and returns a boolean if it was a success

```solidity
function transferToken(address token, address receiver, uint256 amount) internal nonpayable
returns(transferred bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | address | Token that should be transferred | 
| receiver | address | Receiver to whom the token should be transferred | 
| amount | uint256 | The amount of tokens that should be transferred | 

**Returns**

transferred Returns true if the transfer was successful

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function transferToken(address token, address receiver, uint256 amount) internal returns (bool transferred) {
        // 0xa9059cbb - keccack("transfer(address,uint256)")
        bytes memory data = abi.encodeWithSelector(0xa9059cbb, receiver, amount);
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            // We write the return value to scratch space.
            // See https://docs.soliditylang.org/en/v0.7.6/internals/layout_in_memory.html#layout-in-memory
            let success := call(sub(gas(), 10000), token, 0, add(data, 0x20), mload(data), 0, 0x20)
            switch returndatasize()
            case 0 {
                transferred := success
            }
            case 0x20 {
                transferred := iszero(or(iszero(success), iszero(mload(0))))
            }
            default {
                transferred := 0
            }
        }
        /* solhint-enable no-inline-assembly */
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

# Fallback Manager - A contract managing fallback calls made to this contract (FallbackManager.sol)

View Source: [\notForAudit_test_cases\contracts\base\FallbackManager.sol](..\notForAudit_test_cases\contracts\base\FallbackManager.sol)

**↗ Extends: [SelfAuthorized](SelfAuthorized.md), [IFallbackManager](IFallbackManager.md)**
**↘ Derived Contracts: [Safe](Safe.md)**

**FallbackManager**

## Contract Members
**Constants & Variables**

```js
bytes32 internal constant FALLBACK_HANDLER_STORAGE_SLOT;

```

## Functions

- [internalSetFallbackHandler(address handler)](#internalsetfallbackhandler)
- [setFallbackHandler(address handler)](#setfallbackhandler)
- [constructor()](#)

### internalSetFallbackHandler

Internal function to set the fallback handler.

```solidity
function internalSetFallbackHandler(address handler) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| handler | address | contract to handle fallback calls. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function internalSetFallbackHandler(address handler) internal {
        /*
            If a fallback handler is set to self, then the following attack vector is opened:
            Imagine we have a function like this:
            function withdraw() internal authorized {
                withdrawalAddress.call.value(address(this).balance)("");
            }

            If the fallback method is triggered, the fallback handler appends the msg.sender address to the calldata and calls the fallback handler.
            A potential attacker could call a Safe with the 3 bytes signature of a withdraw function. Since 3 bytes do not create a valid signature,
            the call would end in a fallback handler. Since it appends the msg.sender address to the calldata, the attacker could craft an address 
            where the first 3 bytes of the previous calldata + the first byte of the address make up a valid function signature. The subsequent call would result in unsanctioned access to Safe's internal protected methods.
            For some reason, solidity matches the first 4 bytes of the calldata to a function signature, regardless if more data follow these 4 bytes.
        */
        if (handler == address(this)) revertWithError("GS400");

        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            sstore(FALLBACK_HANDLER_STORAGE_SLOT, handler)
        }
        /* solhint-enable no-inline-assembly */
    }
```
</details>

### setFallbackHandler

```solidity
function setFallbackHandler(address handler) public nonpayable authorized 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| handler | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setFallbackHandler(address handler) public override authorized {
        internalSetFallbackHandler(handler);
        emit ChangedFallbackHandler(handler);
    }
```
</details>

### 

```solidity
function () external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
fallback() external {
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            // When compiled with the optimizer, the compiler relies on a certain assumptions on how the
            // memory is used, therefore we need to guarantee memory safety (keeping the free memory point 0x40 slot intact,
            // not going beyond the scratch space, etc)
            // Solidity docs: https://docs.soliditylang.org/en/latest/assembly.html#memory-safety

            let handler := sload(FALLBACK_HANDLER_STORAGE_SLOT)

            if iszero(handler) {
                return(0, 0)
            }

            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())

            // The msg.sender address is shifted to the left by 12 bytes to remove the padding
            // Then the address without padding is stored right after the calldata
            mstore(add(ptr, calldatasize()), shl(96, caller()))

            // Add 20 bytes for the address appended add the end
            let success := call(gas(), handler, 0, ptr, add(calldatasize(), 20), 0, 0)

            returndatacopy(ptr, 0, returndatasize())
            if iszero(success) {
                revert(ptr, returndatasize())
            }
            return(ptr, returndatasize())
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

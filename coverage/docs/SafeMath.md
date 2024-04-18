# SafeMath (SafeMath.sol)

View Source: [/notForAudit_test_cases/contracts/external/SafeMath.sol](../notForAudit_test_cases/contracts/external/SafeMath.sol)

**SafeMath**

Math operations with safety checks that revert on error (overflow/underflow)

## Functions

- [mul(uint256 a, uint256 b)](#mul)
- [sub(uint256 a, uint256 b)](#sub)
- [add(uint256 a, uint256 b)](#add)
- [max(uint256 a, uint256 b)](#max)

### mul

Multiplies two numbers, reverts on overflow.

```solidity
function mul(uint256 a, uint256 b) internal pure
returns(uint256)
```

**Arguments**

| Name | Type    | Description   |
| ---- | ------- | ------------- |
| a    | uint256 | First number  |
| b    | uint256 | Second number |

**Returns**

Product of a and b

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }
```

</details>

### sub

Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).

```solidity
function sub(uint256 a, uint256 b) internal pure
returns(uint256)
```

**Arguments**

| Name | Type    | Description   |
| ---- | ------- | ------------- |
| a    | uint256 | First number  |
| b    | uint256 | Second number |

**Returns**

Difference of a and b

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }
```

</details>

### add

Adds two numbers, reverts on overflow.

```solidity
function add(uint256 a, uint256 b) internal pure
returns(uint256)
```

**Arguments**

| Name | Type    | Description   |
| ---- | ------- | ------------- |
| a    | uint256 | First number  |
| b    | uint256 | Second number |

**Returns**

Sum of a and b

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }
```

</details>

### max

Returns the largest of two numbers.

```solidity
function max(uint256 a, uint256 b) internal pure
returns(uint256)
```

**Arguments**

| Name | Type    | Description   |
| ---- | ------- | ------------- |
| a    | uint256 | First number  |
| b    | uint256 | Second number |

**Returns**

Largest of a and b

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
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

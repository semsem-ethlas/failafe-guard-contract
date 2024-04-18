# ISafe - A multisignature wallet interface with support for confirmations using signed messages based on EIP-712. (ISafe.sol)

View Source: [/notForAudit_test_cases/contracts/interfaces/ISafe.sol](../notForAudit_test_cases/contracts/interfaces/ISafe.sol)

**↗ Extends: [IModuleManager](IModuleManager.md), [IOwnerManager](IOwnerManager.md), [IFallbackManager](IFallbackManager.md)**
**↘ Derived Contracts: [Safe](Safe.md)**

**ISafe**

**Events**

```js
event SafeSetup(address indexed initiator, address[]  owners, uint256  threshold, address  initializer, address  fallbackHandler);
event ApproveHash(bytes32 indexed approvedHash, address indexed owner);
event SignMsg(bytes32 indexed msgHash);
event ExecutionFailure(bytes32 indexed txHash, uint256  payment);
event ExecutionSuccess(bytes32 indexed txHash, uint256  payment);
```

## Functions

- [setup(address[] \_owners, uint256 \_threshold, address to, bytes data, address fallbackHandler, address paymentToken, uint256 payment, address payable paymentReceiver)](#setup)
- [execTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver, bytes signatures)](#exectransaction)
- [checkSignatures(bytes32 dataHash, bytes signatures)](#checksignatures)
- [checkSignatures(bytes32 dataHash, bytes , bytes signatures)](#checksignatures)
- [checkNSignatures(address executor, bytes32 dataHash, bytes signatures, uint256 requiredSignatures)](#checknsignatures)
- [approveHash(bytes32 hashToApprove)](#approvehash)
- [domainSeparator()](#domainseparator)
- [getTransactionHash(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, uint256 \_nonce)](#gettransactionhash)
- [VERSION()](#version)
- [nonce()](#nonce)
- [signedMessages(bytes32 messageHash)](#signedmessages)
- [approvedHashes(address owner, bytes32 messageHash)](#approvedhashes)

### setup

Sets an initial storage of the Safe contract.

```solidity
function setup(address[] _owners, uint256 _threshold, address to, bytes data, address fallbackHandler, address paymentToken, uint256 payment, address payable paymentReceiver) external nonpayable
```

**Arguments**

| Name            | Type            | Description                                                 |
| --------------- | --------------- | ----------------------------------------------------------- |
| \_owners        | address[]       | List of Safe owners.                                        |
| \_threshold     | uint256         | Number of required confirmations for a Safe transaction.    |
| to              | address         | Contract address for optional delegate call.                |
| data            | bytes           | Data payload for optional delegate call.                    |
| fallbackHandler | address         | Handler for fallback calls to this contract                 |
| paymentToken    | address         | Token that should be used for the payment (0 is ETH)        |
| payment         | uint256         | Token Token that should be used for the payment (0 is ETH)  |
| paymentReceiver | address payable | Address that should receive the payment (or 0 if tx.origin) |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setup(
        address[] calldata _owners,
        uint256 _threshold,
        address to,
        bytes calldata data,
        address fallbackHandler,
        address paymentToken,
        uint256 payment,
        address payable paymentReceiver
    ) external;
```

</details>

### execTransaction

Executes a `operation` {0: Call, 1: DelegateCall}} transaction to `to` with `value` (Native Currency)
and pays `gasPrice` \* `gasLimit` in `gasToken` token to `refundReceiver`.

```solidity
function execTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver, bytes signatures) external payable
returns(success bool)
```

**Arguments**

| Name           | Type                | Description                                                                                                                                              |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| to             | address             | Destination address of Safe transaction.                                                                                                                 |
| value          | uint256             | Ether value of Safe transaction.                                                                                                                         |
| data           | bytes               | Data payload of Safe transaction.                                                                                                                        |
| operation      | enum Enum.Operation | Operation type of Safe transaction.                                                                                                                      |
| safeTxGas      | uint256             | Gas that should be used for the Safe transaction.                                                                                                        |
| baseGas        | uint256             | Gas costs that are independent of the transaction execution(e.g. base transaction fee, signature check, payment of the refund)                           |
| gasPrice       | uint256             | Gas price that should be used for the payment calculation.                                                                                               |
| gasToken       | address             | Token address (or 0 if ETH) that is used for the payment.                                                                                                |
| refundReceiver | address payable     | Address of receiver of gas payment (or 0 if tx.origin).                                                                                                  |
| signatures     | bytes               | Signature data that should be verified. Can be packed ECDSA signature ({bytes32 r}{bytes32 s}{uint8 v}), contract signature (EIP-1271) or approved hash. |

**Returns**

success Boolean indicating transaction's success.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function execTransaction(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures
    ) external payable returns (bool success);
```

</details>

### checkSignatures

Checks whether the signature provided is valid for the provided data and hash. Reverts otherwise.

```solidity
function checkSignatures(bytes32 dataHash, bytes signatures) external view
```

**Arguments**

| Name       | Type    | Description                                                                                                                                              |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataHash   | bytes32 | Hash of the data (could be either a message hash or transaction hash)                                                                                    |
| signatures | bytes   | Signature data that should be verified. Can be packed ECDSA signature ({bytes32 r}{bytes32 s}{uint8 v}), contract signature (EIP-1271) or approved hash. |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkSignatures(
        bytes32 dataHash,
        bytes memory signatures
    ) external view;
```

</details>

### checkSignatures

Checks whether the signature provided is valid for the provided data and hash. Reverts otherwise.

```solidity
function checkSignatures(bytes32 dataHash, bytes , bytes signatures) external view
```

**Arguments**

| Name       | Type    | Description                                                                                                                                              |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dataHash   | bytes32 | Hash of the data (could be either a message hash or transaction hash)                                                                                    |
|            | bytes   | dataHash Hash of the data (could be either a message hash or transaction hash)                                                                           |
| signatures | bytes   | Signature data that should be verified. Can be packed ECDSA signature ({bytes32 r}{bytes32 s}{uint8 v}), contract signature (EIP-1271) or approved hash. |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkSignatures(
        bytes32 dataHash,
        bytes memory /* IGNORED */,
        bytes memory signatures
    ) external view;
```

</details>

### checkNSignatures

Checks whether the signature provided is valid for the provided data and hash. Reverts otherwise.

```solidity
function checkNSignatures(address executor, bytes32 dataHash, bytes signatures, uint256 requiredSignatures) external view
```

**Arguments**

| Name               | Type    | Description                                                                                                                                                                                   |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| executor           | address | Address that executing the transaction. ⚠️⚠️⚠️ Make sure that the executor address is a legitmate executor. Incorrectly passed the executor might reduce the threshold by 1 signature. ⚠️⚠️⚠️ |
| dataHash           | bytes32 | Hash of the data (could be either a message hash or transaction hash)                                                                                                                         |
| signatures         | bytes   | Signature data that should be verified. Can be packed ECDSA signature ({bytes32 r}{bytes32 s}{uint8 v}), contract signature (EIP-1271) or approved hash.                                      |
| requiredSignatures | uint256 | Amount of required valid signatures.                                                                                                                                                          |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
s(
        address executor,
        bytes32 dataHash,
        bytes memory signatures,
        uint256 requiredSignatures
    ) external view;

    /**
     * @notice
```

</details>

### approveHash

Marks hash `hashToApprove` as approved.

```solidity
function approveHash(bytes32 hashToApprove) external nonpayable
```

**Arguments**

| Name          | Type    | Description                                                                     |
| ------------- | ------- | ------------------------------------------------------------------------------- |
| hashToApprove | bytes32 | The hash to mark as approved for signatures that are verified by this contract. |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
es32 hashToApprove) external;

    /**
     * @dev Re
```

</details>

### domainSeparator

Returns the domain separator for this contract, as defined in the EIP-712 standard.

```solidity
function domainSeparator() external view
returns(bytes32)
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
() external view returns (bytes32);

    /**
     * @notice
```

</details>

### getTransactionHash

Returns transaction hash to be signed by owners.

```solidity
function getTransactionHash(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, uint256 _nonce) external view
returns(bytes32)
```

**Arguments**

| Name           | Type                | Description                                                 |
| -------------- | ------------------- | ----------------------------------------------------------- |
| to             | address             | Destination address.                                        |
| value          | uint256             | Ether value.                                                |
| data           | bytes               | Data payload.                                               |
| operation      | enum Enum.Operation | Operation type.                                             |
| safeTxGas      | uint256             | Gas that should be used for the safe transaction.           |
| baseGas        | uint256             | Gas costs for data used to trigger the safe transaction.    |
| gasPrice       | uint256             | Maximum gas price that should be used for this transaction. |
| gasToken       | address             | Token address (or 0 if ETH) that is used for the payment.   |
| refundReceiver | address             | Address of receiver of gas payment (or 0 if tx.origin).     |
| \_nonce        | uint256             | Transaction nonce.                                          |

**Returns**

Transaction hash.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
ash(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address refundReceiver,
        uint256 _nonce
    ) external view returns (bytes32);

    /**
     * Externa
```

</details>

### VERSION

Returns the version of the Safe contract.

```solidity
function VERSION() external view
returns(string)
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
nal view returns (string memory);

    /**
     * @notice
```

</details>

### nonce

Returns the nonce of the Safe contract.

```solidity
function nonce() external view
returns(uint256)
```

**Arguments**

| Name | Type | Description |
| ---- | ---- | ----------- |

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
l view returns (uint256);

    /**
     * @notice
```

</details>

### signedMessages

Returns a uint if the messageHash is signed by the owner.

```solidity
function signedMessages(bytes32 messageHash) external view
returns(uint256)
```

**Arguments**

| Name        | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| messageHash | bytes32 | Hash of message that should be checked. |

**Returns**

Number denoting if an owner signed the hash.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript

        bytes32 messageHash
    ) external view returns (uint256);

    /**
     * @notice
```

</details>

### approvedHashes

Returns a uint if the messageHash is approved by the owner.

```solidity
function approvedHashes(address owner, bytes32 messageHash) external view
returns(uint256)
```

**Arguments**

| Name        | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| owner       | address | Owner address that should be checked.   |
| messageHash | bytes32 | Hash of message that should be checked. |

**Returns**

Number denoting if an owner approved the hash.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript

        address owner,
        bytes32 messageHash
    ) external view returns (uint256);
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

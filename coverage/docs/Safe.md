# Safe - A multisignature wallet with support for confirmations using signed messages based on EIP-712. (Safe.sol)

View Source: [\notForAudit_test_cases\contracts\Safe.sol](..\notForAudit_test_cases\contracts\Safe.sol)

**↗ Extends: [Singleton](Singleton.md), [NativeCurrencyPaymentFallback](NativeCurrencyPaymentFallback.md), [ModuleManager](ModuleManager.md), [OwnerManager](OwnerManager.md), [SignatureDecoder](SignatureDecoder.md), [SecuredTokenTransfer](SecuredTokenTransfer.md), [ISignatureValidatorConstants](ISignatureValidatorConstants.md), [FallbackManager](FallbackManager.md), [StorageAccessible](StorageAccessible.md), [ISafe](ISafe.md)**
**↘ Derived Contracts: [SafeL2](SafeL2.md)**

**Safe**

Most important concepts:
      - Threshold: Number of required confirmations for a Safe transaction.
      - Owners: List of addresses that control the Safe. They are the only ones that can add/remove owners, change the threshold and
        approve transactions. Managed in `OwnerManager`.
      - Transaction Hash: Hash of a transaction is calculated using the EIP-712 typed structured data hashing scheme.
      - Nonce: Each transaction should have a different nonce to prevent replay attacks.
      - Signature: A valid signature of an owner of the Safe for a transaction hash.
      - Guard: Guard is a contract that can execute pre- and post- transaction checks. Managed in `GuardManager`.
      - Modules: Modules are contracts that can be used to extend the write functionality of a Safe. Managed in `ModuleManager`.
      - Fallback: Fallback handler is a contract that can provide additional read-only functional for Safe. Managed in `FallbackManager`.
      Note: This version of the implementation contract doesn't emit events for the sake of gas efficiency and therefore requires a tracing node for indexing/
      For the events-based implementation see `SafeL2.sol`.

## Contract Members
**Constants & Variables**

```js
//public members
string public constant VERSION;
uint256 public nonce;
mapping(bytes32 => uint256) public signedMessages;
mapping(address => mapping(bytes32 => uint256)) public approvedHashes;

//private members
bytes32 private constant DOMAIN_SEPARATOR_TYPEHASH;
bytes32 private constant SAFE_TX_TYPEHASH;
bytes32 private _deprecatedDomainSeparator;

```

## Functions

- [constructor()](#)
- [setup(address[] _owners, uint256 _threshold, address to, bytes data, address fallbackHandler, address paymentToken, uint256 payment, address payable paymentReceiver)](#setup)
- [execTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver, bytes signatures)](#exectransaction)
- [handlePayment(uint256 gasUsed, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver)](#handlepayment)
- [checkContractSignature(address owner, bytes32 dataHash, bytes signatures, uint256 offset)](#checkcontractsignature)
- [checkSignatures(bytes32 dataHash, bytes signatures)](#checksignatures)
- [checkSignatures(bytes32 dataHash, bytes , bytes signatures)](#checksignatures)
- [checkNSignatures(address executor, bytes32 dataHash, bytes signatures, uint256 requiredSignatures)](#checknsignatures)
- [approveHash(bytes32 hashToApprove)](#approvehash)
- [domainSeparator()](#domainseparator)
- [encodeTransactionData(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, uint256 _nonce)](#encodetransactiondata)
- [getTransactionHash(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, uint256 _nonce)](#gettransactionhash)
- [addNonce()](#addnonce)

### 

```solidity
function () public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor() {
        /**
         * By setting the threshold it is not possible to call setup anymore,
         * so we create a Safe with 0 owners and threshold 1.
         * This is an unusable Safe, perfect for the singleton
         */
        threshold = 1;
    }
```
</details>

### setup

```solidity
function setup(address[] _owners, uint256 _threshold, address to, bytes data, address fallbackHandler, address paymentToken, uint256 payment, address payable paymentReceiver) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owners | address[] |  | 
| _threshold | uint256 |  | 
| to | address |  | 
| data | bytes |  | 
| fallbackHandler | address |  | 
| paymentToken | address |  | 
| payment | uint256 |  | 
| paymentReceiver | address payable |  | 

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
    ) external override {
        // setupOwners checks if the Threshold is already set, therefore preventing that this method is called twice
        setupOwners(_owners, _threshold);
        if (fallbackHandler != address(0))
            internalSetFallbackHandler(fallbackHandler);
        // As setupOwners can only be called if the contract has not been initialized we don't need a check for setupModules
        setupModules(to, data);

        if (payment > 0) {
            // To avoid running into issues with EIP-170 we reuse the handlePayment function (to avoid adjusting code of that has been verified we do not adjust the method itself)
            // baseGas = 0, gasPrice = 1 and gas = payment => amount = (payment + 0) * 1 = payment
            handlePayment(payment, 0, 1, paymentToken, paymentReceiver);
        }
        emit SafeSetup(msg.sender, _owners, _threshold, to, fallbackHandler);
    }
```
</details>

### execTransaction

```solidity
function execTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver, bytes signatures) public payable
returns(success bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address |  | 
| value | uint256 |  | 
| data | bytes |  | 
| operation | enum Enum.Operation |  | 
| safeTxGas | uint256 |  | 
| baseGas | uint256 |  | 
| gasPrice | uint256 |  | 
| gasToken | address |  | 
| refundReceiver | address payable |  | 
| signatures | bytes |  | 

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
    ) public payable virtual override returns (bool success) {
        bytes32 txHash;
        // Use scope here to limit variable lifetime and prevent `stack too deep` errors
        {
            txHash = getTransactionHash( // Transaction info
                to,
                value,
                data,
                operation,
                safeTxGas,
                // Payment info
                baseGas,
                gasPrice,
                gasToken,
                refundReceiver,
                // Signature info
                // We use the post-increment here, so the current nonce value is used and incremented afterwards.
                nonce++
            );
            checkSignatures(txHash, signatures);
        }
        address guard = getGuard();
        {
            if (guard != address(0)) {
                Guard(guard).checkTransaction(
                    // Transaction info
                    to,
                    value,
                    data,
                    operation,
                    safeTxGas,
                    // Payment info
                    baseGas,
                    gasPrice,
                    gasToken,
                    refundReceiver,
                    // Signature info
                    signatures,
                    msg.sender
                );
            }
        }

        // We require some gas to emit the events (at least 2500) after the execution and some to perform code until the execution (500)
        // We also include the 1/64 in the check that is not send along with a call to counteract potential shortings because of EIP-150
        if (gasleft() < ((safeTxGas * 64) / 63).max(safeTxGas + 2500) + 500)
            revertWithError("GS010");
        // Use scope here to limit variable lifetime and prevent `stack too deep` errors
        {
            uint256 gasUsed = gasleft();
            // If the gasPrice is 0 we assume that nearly all available gas can be used (it is always more than safeTxGas)
            // We only subtract 2500 (compared to the 3000 before) to ensure that the amount passed is still higher than safeTxGas
            success = execute(
                to,
                value,
                data,
                operation,
                gasPrice == 0 ? (gasleft() - 2500) : safeTxGas
            );
            gasUsed = gasUsed.sub(gasleft());
            // If no safeTxGas and no gasPrice was set (e.g. both are 0), then the internal tx is required to be successful
            // This makes it possible to use `estimateGas` without issues, as it searches for the minimum gas where the tx doesn't revert
            if (!success && safeTxGas == 0 && gasPrice == 0)
                revertWithError("GS013");
            // We transfer the calculated tx costs to the tx.origin to avoid sending it to intermediate contracts that have made calls
            uint256 payment = 0;
            if (gasPrice > 0) {
                payment = handlePayment(
                    gasUsed,
                    baseGas,
                    gasPrice,
                    gasToken,
                    refundReceiver
                );
            }
            if (success) emit ExecutionSuccess(txHash, payment);
            else emit ExecutionFailure(txHash, payment);
        }
        {
            if (guard != address(0)) {
                Guard(guard).checkAfterExecution(txHash, success);
            }
        }
    }
```
</details>

### handlePayment

Handles the payment for a Safe transaction.

```solidity
function handlePayment(uint256 gasUsed, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver) private nonpayable
returns(payment uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| gasUsed | uint256 | Gas used by the Safe transaction. | 
| baseGas | uint256 | Gas costs that are independent of the transaction execution (e.g. base transaction fee, signature check, payment of the refund). | 
| gasPrice | uint256 | Gas price that should be used for the payment calculation. | 
| gasToken | address | Token address (or 0 if ETH) that is used for the payment. | 
| refundReceiver | address payable |  | 

**Returns**

payment The amount of payment made in the specified token.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function handlePayment(
        uint256 gasUsed,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver
    ) private returns (uint256 payment) {
        // solhint-disable-next-line avoid-tx-origin
        address payable receiver = refundReceiver == address(0)
            ? payable(tx.origin)
            : refundReceiver;
        if (gasToken == address(0)) {
            // For native tokens, we will only adjust the gas price to not be higher than the actually used gas price
            payment = gasUsed.add(baseGas).mul(
                gasPrice < tx.gasprice ? gasPrice : tx.gasprice
            );
            (bool refundSuccess, ) = receiver.call{value: payment}("");
            if (!refundSuccess) revertWithError("GS011");
        } else {
            payment = gasUsed.add(baseGas).mul(gasPrice);
            if (!transferToken(gasToken, receiver, payment))
                revertWithError("GS012");
        }
    }
```
</details>

### checkContractSignature

Checks whether the contract signature is valid. Reverts otherwise.

```solidity
function checkContractSignature(address owner, bytes32 dataHash, bytes signatures, uint256 offset) internal view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address | Address of the owner used to sign the message | 
| dataHash | bytes32 | Hash of the data (could be either a message hash or transaction hash) | 
| signatures | bytes | Signature data that should be verified. | 
| offset | uint256 | Offset to the start of the contract signature in the signatures byte array | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkContractSignature(
        address owner,
        bytes32 dataHash,
        bytes memory signatures,
        uint256 offset
    ) internal view {
        // Check that signature data pointer (s) is in bounds (points to the length of data -> 32 bytes)
        if (offset.add(32) > signatures.length) revertWithError("GS022");

        // Check if the contract signature is in bounds: start of data is s + 32 and end is start + signature length
        uint256 contractSignatureLen;
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            contractSignatureLen := mload(add(add(signatures, offset), 0x20))
        }
        /* solhint-enable no-inline-assembly */
        if (offset.add(32).add(contractSignatureLen) > signatures.length)
            revertWithError("GS023");

        // Check signature
        bytes memory contractSignature;
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            // The signature data for contract signatures is appended to the concatenated signatures and the offset is stored in s
            contractSignature := add(add(signatures, offset), 0x20)
        }
        /* solhint-enable no-inline-assembly */

        if (
            ISignatureValidator(owner).isValidSignature(
                dataHash,
                contractSignature
            ) != EIP1271_MAGIC_VALUE
        ) revertWithError("GS024");
    }
```
</details>

### checkSignatures

```solidity
function checkSignatures(bytes32 dataHash, bytes signatures) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| dataHash | bytes32 |  | 
| signatures | bytes |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkSignatures(
        bytes32 dataHash,
        bytes memory signatures
    ) public view override {
        checkSignatures(dataHash, "", signatures);
    }
```
</details>

### checkSignatures

```solidity
function checkSignatures(bytes32 dataHash, bytes , bytes signatures) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| dataHash | bytes32 |  | 
|  | bytes |  | 
| signatures | bytes |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkSignatures(
        bytes32 dataHash,
        bytes memory /* IGNORED */,
        bytes memory signatures
    ) public view override {
        // Load threshold to avoid multiple storage loads
        uint256 _threshold = threshold;
        // Check that a threshold is set
        if (_threshold == 0) revertWithError("GS001");
        checkNSignatures(msg.sender, dataHash, signatures, _threshold);
    }
```
</details>

### checkNSignatures

```solidity
function checkNSignatures(address executor, bytes32 dataHash, bytes signatures, uint256 requiredSignatures) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| executor | address |  | 
| dataHash | bytes32 |  | 
| signatures | bytes |  | 
| requiredSignatures | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkNSignatures(
        address executor,
        bytes32 dataHash,
        bytes memory signatures,
        uint256 requiredSignatures
    ) public view override {
        // Check that the provided signature data is not too short
        if (signatures.length < requiredSignatures.mul(65))
            revertWithError("GS020");
        // There cannot be an owner with address 0.
        address lastOwner = address(0);
        address currentOwner;
        uint256 v; // Implicit conversion from uint8 to uint256 will be done for v received from signatureSplit(...).
        bytes32 r;
        bytes32 s;
        uint256 i;
        for (i = 0; i < requiredSignatures; i++) {
            (v, r, s) = signatureSplit(signatures, i);
            if (v == 0) {
                // If v is 0 then it is a contract signature
                // When handling contract signatures the address of the contract is encoded into r
                currentOwner = address(uint160(uint256(r)));

                // Check that signature data pointer (s) is not pointing inside the static part of the signatures bytes
                // This check is not completely accurate, since it is possible that more signatures than the threshold are send.
                // Here we only check that the pointer is not pointing inside the part that is being processed
                if (uint256(s) < requiredSignatures.mul(65))
                    revertWithError("GS021");

                // The contract signature check is extracted to a separate function for better compatibility with formal verification
                // A quote from the Certora team:
                // "The assembly code broke the pointer analysis, which switched the prover in failsafe mode, where it is (a) much slower and (b) computes different hashes than in the normal mode."
                // More info here: https://github.com/safe-global/safe-smart-account/pull/661
                checkContractSignature(
                    currentOwner,
                    dataHash,
                    signatures,
                    uint256(s)
                );
            } else if (v == 1) {
                // If v is 1 then it is an approved hash
                // When handling approved hashes the address of the approver is encoded into r
                currentOwner = address(uint160(uint256(r)));
                // Hashes are automatically approved by the sender of the message or when they have been pre-approved via a separate transaction
                if (
                    executor != currentOwner &&
                    approvedHashes[currentOwner][dataHash] == 0
                ) revertWithError("GS025");
            } else if (v > 30) {
                // If v > 30 then default va (27,28) has been adjusted for eth_sign flow
                // To support eth_sign and similar we adjust v and hash the messageHash with the Ethereum message prefix before applying ecrecover
                currentOwner = ecrecover(
                    keccak256(
                        abi.encodePacked(
                            "\x19Ethereum Signed Message:\n32",
                            dataHash
                        )
                    ),
                    uint8(v - 4),
                    r,
                    s
                );
            } else {
                // Default is the ecrecover flow with the provided data hash
                // Use ecrecover with the messageHash for EOA signatures
                currentOwner = ecrecover(dataHash, uint8(v), r, s);
            }
            if (
                currentOwner <= lastOwner ||
                owners[currentOwner] == address(0) ||
                currentOwner == SENTINEL_OWNERS
            ) revertWithError("GS026");
            lastOwner = currentOwner;
        }
    }
```
</details>

### approveHash

```solidity
function approveHash(bytes32 hashToApprove) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| hashToApprove | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function approveHash(bytes32 hashToApprove) external override {
        if (owners[msg.sender] == address(0)) revertWithError("GS030");
        approvedHashes[msg.sender][hashToApprove] = 1;
        emit ApproveHash(hashToApprove, msg.sender);
    }
```
</details>

### domainSeparator

```solidity
function domainSeparator() public view
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function domainSeparator() public view override returns (bytes32) {
        uint256 chainId;
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            chainId := chainid()
        }
        /* solhint-enable no-inline-assembly */

        return keccak256(abi.encode(DOMAIN_SEPARATOR_TYPEHASH, chainId, this));
    }
```
</details>

### encodeTransactionData

Returns the pre-image of the transaction hash (see getTransactionHash).

```solidity
function encodeTransactionData(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, uint256 _nonce) private view
returns(bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address | Destination address. | 
| value | uint256 | Ether value. | 
| data | bytes | Data payload. | 
| operation | enum Enum.Operation | Operation type. | 
| safeTxGas | uint256 | Gas that should be used for the safe transaction. | 
| baseGas | uint256 | Gas costs for that are independent of the transaction execution(e.g. base transaction fee, signature check, payment of the refund) | 
| gasPrice | uint256 | Maximum gas price that should be used for this transaction. | 
| gasToken | address | Token address (or 0 if ETH) that is used for the payment. | 
| refundReceiver | address | Address of receiver of gas payment (or 0 if tx.origin). | 
| _nonce | uint256 | Transaction nonce. | 

**Returns**

Transaction hash bytes.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function encodeTransactionData(
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
    ) private view returns (bytes memory) {
        bytes32 safeTxHash = keccak256(
            abi.encode(
                SAFE_TX_TYPEHASH,
                to,
                value,
                keccak256(data),
                operation,
                safeTxGas,
                baseGas,
                gasPrice,
                gasToken,
                refundReceiver,
                _nonce
            )
        );
        return
            abi.encodePacked(
                bytes1(0x19),
                bytes1(0x01),
                domainSeparator(),
                safeTxHash
            );
    }
```
</details>

### getTransactionHash

```solidity
function getTransactionHash(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, uint256 _nonce) public view
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address |  | 
| value | uint256 |  | 
| data | bytes |  | 
| operation | enum Enum.Operation |  | 
| safeTxGas | uint256 |  | 
| baseGas | uint256 |  | 
| gasPrice | uint256 |  | 
| gasToken | address |  | 
| refundReceiver | address |  | 
| _nonce | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function getTransactionHash(
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
    ) public view override returns (bytes32) {
        return
            keccak256(
                encodeTransactionData(
                    to,
                    value,
                    data,
                    operation,
                    safeTxGas,
                    baseGas,
                    gasPrice,
                    gasToken,
                    refundReceiver,
                    _nonce
                )
            );
    }
```
</details>

### addNonce

```solidity
function addNonce() public payable
returns(success bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function addNonce() public payable virtual returns (bool success) {
        nonce++;
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

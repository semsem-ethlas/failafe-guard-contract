# AttestationGuard.sol

View Source: [\contracts\guard\AttestationGuard.sol](..\contracts\guard\AttestationGuard.sol)

**↗ Extends: [BaseGuard](BaseGuard.md), [SignatureDecoder](SignatureDecoder.md), [Ownable](Ownable.md)**

**AttestationGuard**

AttestationGuard reverts if the hash that was signed by quorum of owners 
 has not been attested to by the attestation service. It's presence signifies
  operational policy requirements having been met.

## Contract Members
**Constants & Variables**

```js
//public members
address public attestationAuthority;
mapping(address => mapping(bytes32 => uint256)) public attestedHashes;
bytes32 public attestationPolicyThumbprint;

//internal members
bool internal attestationOn;

```

## Functions

- [constructor(address _attestationAuthority)](#)
- [constructor()](#)
- [enforceAttestation(bool enforce)](#enforceattestation)
- [setAttestationAutority(address _attestationAuthority)](#setattestationautority)
- [setAttestationPolicyThumbprint(bytes32 _attestationPolicyThumbprint)](#setattestationpolicythumbprint)
- [attestHash(bytes32 hashToApprove)](#attesthash)
- [checkTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver, bytes signatures, address )](#checktransaction)
- [checkAfterExecution(bytes32 , bool )](#checkafterexecution)
- [checkModuleTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, address module)](#checkmoduletransaction)

### 

```solidity
function (address _attestationAuthority) public nonpayable Ownable 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _attestationAuthority | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor(address _attestationAuthority) Ownable(tx.origin) {

        require(_attestationAuthority != address(0), "must use a valid attestation addr");

        attestationAuthority = _attestationAuthority;

        attestationOn = true;

        // attestationPolicyThumbprint = _attestationPolicyThumbprint;

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

        // We don't revert on fallback to avoid issues in case of a Safe upgrade

        // E.g. The expected check method might change and then the Safe would be locked.

    }
```
</details>

### enforceAttestation

```solidity
function enforceAttestation(bool enforce) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| enforce | bool |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function enforceAttestation(bool enforce) external {

        require(msg.sender == attestationAuthority, "caller not authorized");

        attestationOn = enforce;

    }
```
</details>

### setAttestationAutority

```solidity
function setAttestationAutority(address _attestationAuthority) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _attestationAuthority | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setAttestationAutority(address _attestationAuthority) external {

        require(_attestationAuthority != address(0), "must use a valid attestation addr");

        require(msg.sender == attestationAuthority, "caller not authorized");

        attestationAuthority = _attestationAuthority;

    }
```
</details>

### setAttestationPolicyThumbprint

```solidity
function setAttestationPolicyThumbprint(bytes32 _attestationPolicyThumbprint) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _attestationPolicyThumbprint | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setAttestationPolicyThumbprint(

        bytes32 _attestationPolicyThumbprint

    ) external {

        require(msg.sender == attestationAuthority, "caller not authorized");

        attestationPolicyThumbprint = _attestationPolicyThumbprint;

    }
```
</details>

### attestHash

```solidity
function attestHash(bytes32 hashToApprove) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| hashToApprove | bytes32 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function attestHash(bytes32 hashToApprove) external {

        require(msg.sender == attestationAuthority, "caller not authorized");

        attestedHashes[msg.sender][hashToApprove] = 1;

    }
```
</details>

### checkTransaction

```solidity
function checkTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address payable refundReceiver, bytes signatures, address ) external view
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
|  | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkTransaction(

        address to,

        uint256 value,

        bytes memory data,

        Enum.Operation operation,

        uint256 safeTxGas,

        uint256 baseGas,

        uint256 gasPrice,

        address gasToken,

        address payable refundReceiver,

        bytes memory signatures,

        address

    ) external view override {

        if (!attestationOn) {

            return;

        }

        uint256 currentNonce = ISafe(msg.sender).nonce();

        // safe increments nonce by the time the gaurd is called

        require(currentNonce > 0, "Invalid nonce for attestation guard");

        bytes32 txHash = ISafe(msg.sender).getTransactionHash( // Transaction info

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

            (currentNonce - 1)

        );

        if (attestedHashes[attestationAuthority][txHash] != 0) {

            return;  // attestion hash found, permit execution to proceed

        }

        // fallback, check if attestation address is one of the owners

        uint256 threshold = ISafe(msg.sender).getThreshold();

        require (signatures.length >= threshold.mul(65),  "unexpected signature stream");

        uint256 v;

        bytes32 r;

        bytes32 s;

        address currentOwner;

        for (uint256 i = 0; i < threshold; i++) {

            (v, r, s) = signatureSplit(signatures, i);

            if (v == 0) {

                // If v is 0 then it is a contract signature

                // When handling contract signatures the address of the contract is encoded into r

                // sig verification already done by Safe contract

                currentOwner = address(uint160(uint256(r)));

            } else if (v == 1) {

                // If v is 1 then it is an approved hash

                // When handling approved hashes the address of the approver is encoded into r

                currentOwner = address(uint160(uint256(r)));

            } else if (v > 30) {

                // If v > 30 then default va (27,28) has been adjusted for eth_sign flow

                // To support eth_sign and similar we adjust v and hash the messageHash with the Ethereum message prefix before applying ecrecover

                currentOwner = ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", txHash)), uint8(v - 4), r, s);

            } else {

                // Default is the ecrecover flow with the provided data hash

                // Use ecrecover with the messageHash for EOA signatures

                currentOwner = ecrecover(txHash, uint8(v), r, s);

            }

            if (currentOwner == attestationAuthority){

                // attestation authority vouched for this hash

                // can permit execution to proceed

                return;

            }

        }

        // attestation service performs addtional checks on the signners, i.e., geoloc, etc.

        revert("transaction attestation missing");

    }
```
</details>

### checkAfterExecution

```solidity
function checkAfterExecution(bytes32 , bool ) external view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bytes32 |  | 
|  | bool |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkAfterExecution(bytes32, bool) external view override {}
```
</details>

### checkModuleTransaction

Called by the Safe contract before a transaction is executed via a module.

```solidity
function checkModuleTransaction(address to, uint256 value, bytes data, enum Enum.Operation operation, address module) external nonpayable
returns(bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address | Destination address of Safe transaction. | 
| value | uint256 | Ether value of Safe transaction. | 
| data | bytes | Data payload of Safe transaction. | 
| operation | enum Enum.Operation | Operation type of Safe transaction. | 
| module | address | Module executing the transaction. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function checkModuleTransaction(

        address to,

        uint256 value,

        bytes memory data,

        Enum.Operation operation,

        address module

    ) external override returns (bytes32) {}
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

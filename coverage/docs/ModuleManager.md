# Module Manager - A contract managing Safe modules (ModuleManager.sol)

View Source: [\notForAudit_test_cases\contracts\base\ModuleManager.sol](..\notForAudit_test_cases\contracts\base\ModuleManager.sol)

**↗ Extends: [SelfAuthorized](SelfAuthorized.md), [Executor](Executor.md), [GuardManager](GuardManager.md), [IModuleManager](IModuleManager.md)**
**↘ Derived Contracts: [Safe](Safe.md)**

**ModuleManager**

Modules are extensions with unlimited access to a Safe that can be added to a Safe by its owners.
⚠️ WARNING: Modules are a security risk since they can execute arbitrary transactions, 
so only trusted and audited modules should be added to a Safe. A malicious module can
completely takeover a Safe.

## Contract Members
**Constants & Variables**

```js
address internal constant SENTINEL_MODULES;
mapping(address => address) internal modules;

```

## Functions

- [setupModules(address to, bytes data)](#setupmodules)
- [preModuleExecution(address to, uint256 value, bytes data, enum Enum.Operation operation)](#premoduleexecution)
- [postModuleExecution(address guard, bytes32 guardHash, bool success)](#postmoduleexecution)
- [enableModule(address module)](#enablemodule)
- [disableModule(address prevModule, address module)](#disablemodule)
- [execTransactionFromModule(address to, uint256 value, bytes data, enum Enum.Operation operation)](#exectransactionfrommodule)
- [execTransactionFromModuleReturnData(address to, uint256 value, bytes data, enum Enum.Operation operation)](#exectransactionfrommodulereturndata)
- [isModuleEnabled(address module)](#ismoduleenabled)
- [getModulesPaginated(address start, uint256 pageSize)](#getmodulespaginated)
- [isContract(address account)](#iscontract)

### setupModules

Setup function sets the initial storage of the contract.
         Optionally executes a delegate call to another contract to setup the modules.

```solidity
function setupModules(address to, bytes data) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address | Optional destination address of call to execute. | 
| data | bytes | Optional data of call to execute. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion setupModules(address to, bytes memory data) internal {
        if (modules[SENTINEL_MODULES] != address(0)) revertWithError("GS100");
        modules[SENTINEL_MODULES] = SENTINEL_MODULES;
        if (to != address(0)) {
            if (!isContract(to)) revertWithError("GS002");
            // Setup has to complete successfully or transaction fails.
            if (!execute(to, 0, data, Enum.Operation.DelegateCall, type(uint256).max)) revertWithError("GS000");
        }
    }

```
</details>

### preModuleExecution

Runs pre-execution checks for module transactions if a guard is enabled.

```solidity
function preModuleExecution(address to, uint256 value, bytes data, enum Enum.Operation operation) internal nonpayable
returns(guard address, guardHash bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address | Target address of module transaction. | 
| value | uint256 | Ether value of module transaction. | 
| data | bytes | Data payload of module transaction. | 
| operation | enum Enum.Operation | Operation type of module transaction. | 

**Returns**

guard Guard to be used for checking.

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion preModuleExecution(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation
    ) internal returns (address guard, bytes32 guardHash) {
        guard = getGuard();

        // Only whitelisted modules are allowed.
        require(msg.sender != SENTINEL_MODULES && modules[msg.sender] != address(0), "GS104");

        if (guard != address(0)) {
            guardHash = Guard(guard).checkModuleTransaction(to, value, data, operation, msg.sender);
        }
    }

```
</details>

### postModuleExecution

Runs post-execution checks for module transactions if a guard is enabled.

```solidity
function postModuleExecution(address guard, bytes32 guardHash, bool success) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| guard | address | Hash Hash returned from the guard during pre execution check. | 
| guardHash | bytes32 | Hash returned from the guard during pre execution check. | 
| success | bool | Boolean flag indicating if the call succeeded. | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion postModuleExecution(address guard, bytes32 guardHash, bool success) internal {
        if (guard != address(0)) {
            Guard(guard).checkAfterExecution(guardHash, success);
        }
        if (success) emit ExecutionFromModuleSuccess(msg.sender);
        else emit ExecutionFromModuleFailure(msg.sender);
    }

```
</details>

### enableModule

```solidity
function enableModule(address module) public nonpayable authorized 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| module | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion enableModule(address module) public override authorized {
        // Module address cannot be null or sentinel.
        if (module == address(0) || module == SENTINEL_MODULES) revertWithError("GS101");
        // Module cannot be added twice.
        if (modules[module] != address(0)) revertWithError("GS102");
        modules[module] = modules[SENTINEL_MODULES];
        modules[SENTINEL_MODULES] = module;
        emit EnabledModule(module);
    }

```
</details>

### disableModule

```solidity
function disableModule(address prevModule, address module) public nonpayable authorized 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| prevModule | address |  | 
| module | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion disableModule(address prevModule, address module) public override authorized {
        // Validate module address and check that it corresponds to module index.
        if (module == address(0) || module == SENTINEL_MODULES) revertWithError("GS101");
        if (modules[prevModule] != module) revertWithError("GS103");
        modules[prevModule] = modules[module];
        modules[module] = address(0);
        emit DisabledModule(module);
    }

```
</details>

### execTransactionFromModule

```solidity
function execTransactionFromModule(address to, uint256 value, bytes data, enum Enum.Operation operation) public nonpayable
returns(success bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address |  | 
| value | uint256 |  | 
| data | bytes |  | 
| operation | enum Enum.Operation |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion execTransactionFromModule(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation
    ) public virtual override returns (bool success) {
        (address guard, bytes32 guardHash) = preModuleExecution(to, value, data, operation);
        success = execute(to, value, data, operation, type(uint256).max);
        postModuleExecution(guard, guardHash, success);
    }

```
</details>

### execTransactionFromModuleReturnData

```solidity
function execTransactionFromModuleReturnData(address to, uint256 value, bytes data, enum Enum.Operation operation) public nonpayable
returns(success bool, returnData bytes)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address |  | 
| value | uint256 |  | 
| data | bytes |  | 
| operation | enum Enum.Operation |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion execTransactionFromModuleReturnData(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation
    ) public override returns (bool success, bytes memory returnData) {
        (address guard, bytes32 guardHash) = preModuleExecution(to, value, data, operation);
        success = execute(to, value, data, operation, type(uint256).max);
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            // Load free memory location
            returnData := mload(0x40)
            // We allocate memory for the return data by setting the free memory location to
            // current free memory location + data size + 32 bytes for data size value
            mstore(0x40, add(returnData, add(returndatasize(), 0x20)))
            // Store the size
            mstore(returnData, returndatasize())
            // Store the data
            returndatacopy(add(returnData, 0x20), 0, returndatasize())
        }
        /* solhint-enable no-inline-assembly */
        postModuleExecution(guard, guardHash, success);
    }

```
</details>

### isModuleEnabled

```solidity
function isModuleEnabled(address module) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| module | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion isModuleEnabled(address module) public view override returns (bool) {
        return SENTINEL_MODULES != module && modules[module] != address(0);
    }

```
</details>

### getModulesPaginated

```solidity
function getModulesPaginated(address start, uint256 pageSize) external view
returns(array address[], next address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| start | address |  | 
| pageSize | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion getModulesPaginated(address start, uint256 pageSize) external view override returns (address[] memory array, address next) {
        if (start != SENTINEL_MODULES && !isModuleEnabled(start)) revertWithError("GS105");
        if (pageSize == 0) revertWithError("GS106");
        // Init array with max page size
        array = new address[](pageSize);

        // Populate return array
        uint256 moduleCount = 0;
        next = modules[start];
        while (next != address(0) && next != SENTINEL_MODULES && moduleCount < pageSize) {
            array[moduleCount] = next;
            next = modules[next];
            moduleCount++;
        }

        /**
          Because of the argument validation, we can assume that the loop will always iterate over the valid module list values
          and the `next` variable will either be an enabled module or a sentinel address (signalling the end). 

          If we haven't reached the end inside the loop, we need to set the next pointer to the last element of the modules array
          because the `next` variable (which is a module by itself) acting as a pointer to the start of the next page is neither 
          included to the current page, nor will it be included in the next one if you pass it as a start.
        */
        if (next != SENTINEL_MODULES) {
            next = array[moduleCount - 1];
        }
        // Set correct size of returned array
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            mstore(array, moduleCount)
        }
        /* solhint-enable no-inline-assembly */
    }

```
</details>

### isContract

Returns true if `account` is a contract.

```solidity
function isContract(address account) internal view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address | The address being queried | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
tion isContract(address account) internal view returns (bool) {
        uint256 size;
        /* solhint-disable no-inline-assembly */
        /// @solidity memory-safe-assembly
        assembly {
            size := extcodesize(account)
        }
        /* solhint-enable no-inline-assembly */
        return size > 0;
    }
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

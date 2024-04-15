// SPDX-License-Identifier: LGPL-3.0-only
/* solhint-disable one-contract-per-file */
pragma solidity >=0.7.0 <0.9.0;
import {Enum} from "../libraries/Enum.sol";
import {BaseGuard} from "./GuardManager.sol";
import {ISafe} from "../interfaces/ISafe.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OnlyOwnersGuard
 */
contract AttestationGuard is BaseGuard, Ownable {
    address public attestationAuthority;
    bool attestationOn;

    mapping(address => mapping(bytes32 => uint256)) public attestedHashes;
    // only one attestation policy valid at any one time
    bytes32 public attestationPolicyThumbprint;

    constructor(address _attestationAuthority) Ownable(tx.origin) {
        attestationAuthority = _attestationAuthority;
        attestationOn = true;
        // attestationPolicyThumbprint = _attestationPolicyThumbprint;
    }

    // solhint-disable-next-line payable-fallback
    fallback() external {
        // We don't revert on fallback to avoid issues in case of a Safe upgrade
        // E.g. The expected check method might change and then the Safe would be locked.
    }

    function enforceAttestation(bool enforce) external {
        require(msg.sender == attestationAuthority, "caller not authorized");
        attestationOn = enforce;
    }

    function setAttestationAutority(address _attestationAuthority) external {
        require(msg.sender == attestationAuthority, "caller not authorized");
        attestationAuthority = _attestationAuthority;
    }

    function setAttestationPolicyThumbprint(
        bytes32 _attestationPolicyThumbprint
    ) external {
        require(msg.sender == attestationAuthority, "caller not authorized");
        attestationPolicyThumbprint = _attestationPolicyThumbprint;
    }

    // called by attestion authority to record a hash that was signed
    // by quroum of oweners, each of which have passed attestation policy
    // requirements (e.g., geolocation, device info, etc.)
    function attestHash(bytes32 hashToApprove) external {
        require(msg.sender == attestationAuthority, "caller not authorized");
        attestedHashes[msg.sender][hashToApprove] = 1;
    }

    // Called by the Safe contract before a transaction is executed.
    // Reverts if the hash that was signed by quorum of owners has not
    // been attested to by the attestation service. It's presence signifies
    // operational policy requirements having been met.
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
        bytes memory,
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

        // attestation service performs addtional checks on the signners, i.e., geoloc, etc.
        require(
            attestedHashes[attestationAuthority][txHash] != 0,
            "transaction attestation missing"
        );
    }

    function checkAfterExecution(bytes32, bool) external view override {}

    /**
     * @notice Called by the Safe contract before a transaction is executed via a module.
     * @param to Destination address of Safe transaction.
     * @param value Ether value of Safe transaction.
     * @param data Data payload of Safe transaction.
     * @param operation Operation type of Safe transaction.
     * @param module Module executing the transaction.
     */
    function checkModuleTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        address module
    ) external override returns (bytes32) {}
}

// SPDX-License-Identifier: LGPL-3.0-only
/* solhint-disable one-contract-per-file */
pragma solidity >=0.7.0 <0.9.0;
import {Enum} from "../external/Enum.sol";
import {BaseGuard} from "../external/GuardManager.sol";
import {ISafe} from "../external/interfaces/ISafe.sol";
import {SafeMath} from "../external/SafeMath.sol";
import {SignatureDecoder} from "../external/SignatureDecoder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @notice AttestationGuard reverts if the hash that was signed by quorum of owners
 * has not been attested to by the attestation service. It's presence signifies
 *  operational policy requirements having been met.
 */
contract AttestationGuard is BaseGuard, SignatureDecoder, Ownable {
    using SafeMath for uint256;

    address public attestationAuthority;
    bool attestationOn;

    mapping(address => mapping(bytes32 => uint256)) public attestedHashes;
    // only one attestation policy valid at any one time
    bytes32 public attestationPolicyThumbprint;

    constructor(address _attestationAuthority) Ownable(tx.origin) {
        require(
            _attestationAuthority != address(0),
            "must use a valid attestation addr"
        );
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
        require(
            _attestationAuthority != address(0),
            "must use a valid attestation addr"
        );
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
            return; // attestion hash found, permit execution to proceed
        }
        // fallback, check if attestation address is one of the owners
        uint256 threshold = ISafe(msg.sender).getThreshold();

        require(
            signatures.length >= threshold.mul(65),
            "unexpected signature stream"
        );

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
                currentOwner = ecrecover(
                    keccak256(
                        abi.encodePacked(
                            "\x19Ethereum Signed Message:\n32",
                            txHash
                        )
                    ),
                    uint8(v - 4),
                    r,
                    s
                );
            } else {
                // Default is the ecrecover flow with the provided data hash
                // Use ecrecover with the messageHash for EOA signatures
                currentOwner = ecrecover(txHash, uint8(v), r, s);
            }

            if (currentOwner == attestationAuthority) {
                // attestation authority vouched for this hash
                // can permit execution to proceed
                return;
            }
        }

        // attestation service performs addtional checks on the signners, i.e., geoloc, etc.
        revert("transaction attestation missing");
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

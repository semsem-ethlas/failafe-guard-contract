// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import {AttestationGuard} from "./AttestationGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AttestationGuardFactory is Ownable {
    event AttestationGuardCreated(address AttestationGuardAddr);

    constructor() Ownable(msg.sender) {}
    // Function to create a new ChildContract
    function createAttestationGuard(address attestationAuthority) public {
        AttestationGuard guardInstance = new AttestationGuard(
            attestationAuthority
        );
        //transferOwnership(tx.origin);
        emit AttestationGuardCreated(address(guardInstance));
    }
}

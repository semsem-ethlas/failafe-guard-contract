// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import {Safe, Enum} from "../notForAudit_test_cases/contracts/Safe.sol";
import {SafeMath} from "./external/SafeMath.sol";

contract SafeL2 is Safe {
    using SafeMath for uint256;

    function mul(uint256 a, uint256 b) public payable returns (uint256) {
        return a.mul(b);
    }

    function sub(uint256 a, uint256 b) public payable returns (uint256) {
        return a.sub(b);
    }

    function add(uint256 a, uint256 b) public payable returns (uint256) {
        return a.add(b);
    }

    function max(uint256 a, uint256 b) public payable returns (uint256) {
        return a.max(b);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CarbonCredit {
    mapping(address => uint256) public credits;
    event CreditsGenerated(address indexed farmer, uint256 amount);

    function generateCredits(address farmer, uint256 amount) public {
        credits[farmer] += amount;
        emit CreditsGenerated(farmer, amount);
    }

    function getCredits(address farmer) public view returns (uint256) {
        return credits[farmer];
    }
}

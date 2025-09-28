// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CarbonCredit {
    struct CreditAccount {
        uint256 totalBalance;
        bool suspended;
    }

    struct ProjectCredits {
        uint256 totalIssued;
        uint256 totalRetired;
    }

    address public admin;

    // --- Mappings ---
    mapping(address => CreditAccount) public accounts;
    mapping(uint256 => ProjectCredits) public projects;
    mapping(uint256 => bool) public validProjects;
    mapping(address => mapping(uint256 => uint256)) public userProjectBalance;

    // --- Events ---
    event CreditsGenerated(address indexed farmer, uint256 projectId, uint256 amount);
    event CreditsTransferred(address indexed from, address indexed to, uint256 projectId, uint256 amount);
    event CreditsRetired(address indexed holder, uint256 projectId, uint256 amount);
    event CreditsSuspended(address indexed holder, bool suspended);
    event ProjectAdded(uint256 projectId);

    // --- Modifiers ---
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier notSuspended(address holder) {
        require(!accounts[holder].suspended, "Account suspended");
        _;
    }

    modifier validProject(uint256 projectId) {
        require(validProjects[projectId], "Invalid project");
        _;
    }

    // --- Constructor ---
    constructor() {
        admin = msg.sender;
    }

    // --- Admin Functions ---
    function addProject(uint256 projectId) external onlyAdmin {
        require(!validProjects[projectId], "Project already exists");
        validProjects[projectId] = true;
        emit ProjectAdded(projectId);
    }

    // 🔹 Explicit view function to check if project exists
    function isProjectValid(uint256 projectId) external view returns (bool) {
        return validProjects[projectId];
    }

    function generateCredits(address farmer, uint256 projectId, uint256 amount)
        external
        onlyAdmin
        validProject(projectId)
    {
        require(amount > 0, "Amount must be positive");
        accounts[farmer].totalBalance += amount;
        userProjectBalance[farmer][projectId] += amount;
        projects[projectId].totalIssued += amount;
        emit CreditsGenerated(farmer, projectId, amount);
    }

    function suspendCredits(address holder, bool suspend) external onlyAdmin {
        accounts[holder].suspended = suspend;
        emit CreditsSuspended(holder, suspend);
    }

    function transferCredits(address to, uint256 projectId, uint256 amount)
        external
        notSuspended(msg.sender)
        notSuspended(to)
        validProject(projectId)
    {
        require(amount > 0, "Amount must be positive");
        require(userProjectBalance[msg.sender][projectId] >= amount, "Insufficient credits");
        
        userProjectBalance[msg.sender][projectId] -= amount;
        userProjectBalance[to][projectId] += amount;

        accounts[msg.sender].totalBalance -= amount;
        accounts[to].totalBalance += amount;

        emit CreditsTransferred(msg.sender, to, projectId, amount);
    }

    function retireCredits(uint256 projectId, uint256 amount)
        external
        notSuspended(msg.sender)
        validProject(projectId)
    {
        require(amount > 0, "Amount must be positive");
        require(userProjectBalance[msg.sender][projectId] >= amount, "Insufficient credits");

        userProjectBalance[msg.sender][projectId] -= amount;
        accounts[msg.sender].totalBalance -= amount;
        projects[projectId].totalRetired += amount;

        emit CreditsRetired(msg.sender, projectId, amount);
    }

    // --- View Functions ---
    function getTotalCredits(address holder) external view returns (uint256) {
        return accounts[holder].totalBalance;
    }

    function getCreditsByProject(address holder, uint256 projectId) external view returns (uint256) {
        return userProjectBalance[holder][projectId];
    }

    function isSuspended(address holder) external view returns (bool) {
        return accounts[holder].suspended;
    }

    function getProjectCredits(uint256 projectId) external view returns (uint256 issued, uint256 retired) {
        ProjectCredits memory pc = projects[projectId];
        return (pc.totalIssued, pc.totalRetired);
    }
}

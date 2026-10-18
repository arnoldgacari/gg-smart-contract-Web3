// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GG Smart Contract
 * @notice A custom ERC-20 token contract built for portfolio demonstration.
 */
contract GGToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("GG Smart Contract", "GG") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /// @notice Allows the contract owner to mint additional GG tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

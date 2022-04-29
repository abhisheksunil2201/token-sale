//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Dark is ERC20{ 
    address public admin;

    constructor() ERC20("DarkToken", "DARK") {
        admin = msg.sender;
        _mint(admin, 100000);
    }

    function mint(address _to, uint _amount) public {
        require(msg.sender == admin, 'Only admin can mint');
        _mint(_to, _amount);
    }
}

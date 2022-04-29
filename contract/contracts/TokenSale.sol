//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "./Dark.sol";

contract TokenSale{ 
    address public admin;
    Dark public token;
    uint public tokenPrice = 1000000000000000;

    constructor(Dark _token) {
        token = _token;
        admin = msg.sender;
        console.log("TokenSale instantiated");
    }

    function getTokenSupply() public view returns(uint) {
        return token.totalSupply();
    }

    function changeTokenPrice(uint _newPrice) public {
        require(msg.sender == admin, "Only admin can change token price");
        tokenPrice = _newPrice;
    }

    function getPrice(uint _amount) public view returns(uint) {
        return _amount * tokenPrice;
    }

    function buyToken(uint _amount) public payable {
        console.log("buyToken called", token.balanceOf(address(this)));
        require(token.balanceOf(address(this)) >= _amount, "Not enough tokens");
        require(msg.value == _amount * tokenPrice, "Incorrect ETH sent");

        token.transfer(msg.sender, _amount);
    }
}

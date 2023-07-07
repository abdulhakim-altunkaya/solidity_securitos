//SPDX-License-Identifier: MIT

pragma solidity >= 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract Token is ERC20Capped {

    //Token burning and minting events
    event TokenMinted(address minter, uint amount);
    event TokenBurned(address burner, uint amount);

    //setting owner and related code
    address public owner;
    error NotOwner(address caller, string message);
    modifier onlyOwner() {
        if(msg.sender != owner) {
            revert NotOwner(msg.sender, "you are not owner");
        }
        _;
    }
    function transferOwner(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "not valid address");
        owner = _newOwner;
    }

    //creating token
    constructor(uint cap) ERC20("Sitos", "SITOS") ERC20Capped(cap*(10**18)) {
        owner = msg.sender;
    }

    //minting function for owner
    function mintToken(uint _amount) external onlyOwner {
        require(_amount > 0 && _amount < 100000, "mint between 0 and 100000");
        _mint(msg.sender, _amount*(10**18));
        emit TokenMinted(msg.sender, _amount);
    }

    //minting function for generals
    function mintTokenGenerals(uint _amount) external  {
        require(_amount > 0 && _amount < 500, "mint between 0 and 500");
        _mint(msg.sender, _amount*(10**18));
        emit TokenMinted(msg.sender, _amount);
    }

    //burning token function, no need set a higher limit
    function burnToken(uint _amount) external {
        require(_amount > 0, "burn amount must be greater than 0");
        _burn(msg.sender, _amount*(10**18));
        emit TokenBurned(msg.sender, _amount);
    }

    //approve swap contract before sending tokens to it for liquidity
    function approveSecuritos(address _securitosContract, uint _amount) external {
        require(_amount > 0, "approve amount must be greater than 0");
        uint amount = _amount*(10**18);
        _approve(msg.sender, _securitosContract, amount);
    }

    //general view functions, you can understand what they do from names
    function getTotalSupply() external view returns(uint) {
        return totalSupply() / (10**18);
    }

    function getContractAddress() external view returns(address) {
        return address(this);
    } 

    function getYourBalance() external view returns(uint) {
        return balanceOf(msg.sender) / (10**18);
    }

    function getContractBalance() external view returns(uint) {
        return balanceOf(address(this)) / (10**18);
    }

}
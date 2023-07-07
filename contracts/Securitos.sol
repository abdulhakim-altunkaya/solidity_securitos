// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract Securitos is ERC20Capped {
    
    //EVENTS
    event TokenMinted(address minter, uint amount); 
    event TokenBurned(address burner, uint amount); 
    event TokenTransferred(address receiver, uint amount);
    event TokenDeposited(address sender, uint amount);
    event NewMember(address caller);

    //1. OWNERSHIP OPERATIONS
    address public owner;
    error OwnerError(string message, address caller);
    modifier onlyOwner() {
        if(msg.sender != owner) {
            revert OwnerError("you are not owner", msg.sender);
        }
        _;
    }
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "owner must be address");
        owner = _newOwner;
    }

    //CONSTRUCTOR
    constructor(uint cap) ERC20("Securitos", "SINTOS") ERC20Capped(cap*(10**18)) {
        owner = msg.sender;
    }

    //2.TOKEN OPERATIONS
    bool public freeMinting = true;
    uint freeMintingAmount = 10;
    function toggleFreeMinting(uint _amount) external onlyOwner {
        freeMinting = !freeMinting;
        freeMintingAmount = _amount;
    }
    //people will mint token for free for a certain time.
    function freeMint() external {
        require(freeMinting == true, "free minting disabled");
        require(msg.sender == tx.origin, "contracts cannot mint");
        require(msg.sender != address(0), "real addresses can mint");
        _mint(msg.sender, freeMintingAmount*(10**18));
        emit TokenMinted(msg.sender, freeMintingAmount);
    }
    function burnToken(uint _amount) external {
        require(balanceOf(msg.sender) > 0, "you don't have token");
        _burn(msg.sender, _amount*(10**18));
        emit TokenBurned(msg.sender, _amount);
    }

    //owner can withdraw excess tokens ("profit") to his metamask account.
    function withdrawToken(uint _amount) external onlyOwner {
        require(balanceOf(address(this)) > 0, "contract doesn't have CONTOR");
        require(msg.sender == tx.origin, "contracts cannot withdraw");
        require(msg.sender != address(0), "real addresses can withdraw");
        _transfer(address(this), msg.sender, _amount*(10**18));
        emit TokenTransferred(msg.sender, _amount);
    }

    //Contract must have enough tokens. So that people can come and buy tokens for auditing service. 
    uint lastReplenishment = block.timestamp;
    function replenishTreasury() external onlyOwner {
        require( block.timestamp > lastReplenishment + 15 seconds, "Replenishment cannot be often");//in production: 5 days
        lastReplenishment = block.timestamp;
        _mint(address(this), 2000*(10**18));
    }

    //view functions
    function getTotalSupply() external view returns(uint) {
        return totalSupply() / (10**18);
    }
    function getContractAddress() external view returns(address) {
        return address(this);
    }
    function getYourTokenBalance() external view returns(uint) {
        return balanceOf(msg.sender) / (10**18);
    }
    function getContractTokenBalance() external view returns(uint) {
        return balanceOf(address(this)) / (10**18);
    }
    function getContractEtherBalance() external view returns(uint) {
        return address(this).balance / (10**18);
    }

    function returnBalances() external view returns(uint, uint, uint, uint) {
        return(
            balanceOf(msg.sender) / (10**18),
            balanceOf(address(this)) / (10**18),
            address(this).balance / (10**18),
            totalSupply() / (10**18)
        );
    }

    //3.PAYMENT OPERATIONS
    uint public fee = 1;
    function changeFee(uint _fee) external onlyOwner {
        fee = _fee;
    }
    
    function makePayment() external returns(bool) {
        require(balanceOf(msg.sender) >= fee, "you don't have enough token");
        require(msg.sender == tx.origin, "contracts cannot pay");
        require(msg.sender != address(0), "real addresses can pay");
        _transfer(msg.sender, address(this), fee*(10**18));
        emit TokenDeposited(msg.sender, fee);
        return true;
    }
    //Currently the pool of SINTOS/FTM is not based on orderbook model.
    //For that reason there is fixed price which is 12 Sintos for 1 FTM
    function buyToken() external payable {
        require(balanceOf(address(this)) >= 1000, "contract does not have enough Sintos Token");
        require(msg.sender == tx.origin, "only accounts can buy tokens, not contracts");
        require(msg.sender != address(0), "real addresses can buy");
        //here the buyer send amount(with decimals) to the contract by using msg.value
        require(msg.value == 1*(10**18), "deposit is 1 FTM" ); 
        _transfer(address(this), msg.sender, 12*(10**18));
        emit TokenTransferred(msg.sender, 12);
    }

/*
add fallback and receive with events
if needed add a revert to the fallback
add separate contract for contror staking
add separate contract for contor initial offering */

}

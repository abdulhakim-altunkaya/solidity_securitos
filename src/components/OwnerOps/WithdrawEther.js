import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function WithdrawEther() {

  const {ethereum} = window;

  const contractSecuritos = useAccount( state => state.contractSecuritos2);

  let [message, setMessage] = useState("");

  const withdrawEth = async () => {
    let accounts;
    if(window.ethereum !== "undefined") {
      accounts = await ethereum.request({ method: "eth_requestAccounts"});
    } else {
      alert("Please install Metamask");
      return;
    }

    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner");
      return;
    }

    let ftmBalance = await contractSecuritos.getContractEtherBalance();
    let ftmBalance2 = ftmBalance.toString();
    let ftmBalance3 = parseInt(ftmBalance2);
    if(ftmBalance3 < 1) {
      alert("Sytem is empty, no fee collected yet");
      return;
    }

    await contractSecuritos.withdrawEther();
    setMessage("Success, Ethers of the System sent to owner");
  }
  return (
    <div>
      <button className='button4' onClick={withdrawEth}>Withdraw FTM</button>&nbsp;&nbsp;{message}
    </div>
  )
}

export default WithdrawEther
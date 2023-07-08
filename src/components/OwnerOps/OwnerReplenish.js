import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function OwnerReplenish() {

  const {ethereum} = window;

  const contractSecuritos = useAccount( state => state.contractSecuritos2);

  let [message, setMessage] = useState("");

  const replenish = async () => {
    
    let accounts;
    if(window.ethereum !== "undefined") {
      accounts = await ethereum.request({ method: "eth_requestAccounts"});
    } else {
      alert("Please install Metamask");
      return;
    }
  
    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner (Security check 1)");
      return;
    }

    await contractSecuritos.replenishTreasury();
    setMessage("You successfully replenished treasury");

  }

  return (
    <div>
      <button onClick={replenish} className='button4'>Refill Treasury</button><span className='spanTokens'>{message}</span>
    </div>
  )
}

export default OwnerReplenish;

 
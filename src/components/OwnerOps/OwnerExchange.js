import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function OwnerExchange() {

  const {ethereum} = window;

  const contractSecuritos = useAccount( state => state.contractSecuritos2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const updateExchange = async () => {
    
    let accounts;
    if(window.ethereum !== "undefined") {
      accounts = await ethereum.request({ method: "eth_requestAccounts"});
    } else {
      alert("Please install Metamask");
      return;
    }
    
    let amount1 = parseInt(amount);

    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner (Security check 1)");
      return;
    }

    if(amount1 < 0 || amount1 > 19) {
      alert("You cannot set exchange to less than 0 and more than 20 token (Security check 2)");
      return;
    }

    if(amount === "") {
      alert("You cannot leave amount area empty (Security check 3)");
      return;
    }

    await contractSecuritos.setExchange(amount1);
    setMessage("You successfully changed exchange value");

  }

  return (
    <div>
      <button onClick={updateExchange} className='button4'>Change Exchange</button>
      <input type="number" className='inputFields' placeholder='new exchange value'
      value={amount} onChange={(e) => setAmount(e.target.value)} />&nbsp;&nbsp;{message}
    </div>
  )
}

export default OwnerExchange;

 
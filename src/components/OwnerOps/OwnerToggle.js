import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function OwnerToggle() {

  const {ethereum} = window;

  const contractSecuritos = useAccount( state => state.contractSecuritos2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const toggleFreeMint = async () => {
    
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
      alert("You cannot set free minting to less than 0 and more than 20 token (Security check 2)");
      return;
    }

    if(amount === "") {
      alert("You cannot leave amount area empty (Security check 3)");
      return;
    }

    await contractSecuritos.toggleFreeMinting(amount1);
    setMessage("You successfully changed free minting amount. However, free minting is paused now. To unpause it click on this button again with same amount");
  }

  return (
    <div>
      <button onClick={toggleFreeMint} className='button4'>Toggle FreeMint</button>
      <input type="number" className='inputFields' placeholder='enter new amount'
      value={amount} onChange={(e) => setAmount(e.target.value)} /> {message}
    </div>
  )
}

export default OwnerToggle;

 
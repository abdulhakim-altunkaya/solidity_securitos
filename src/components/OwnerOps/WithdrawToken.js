import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function WithdrawToken() {

  const {ethereum} = window;

  const contractSecuritos = useAccount( state => state.contractSecuritos2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const withdrawSintos = async () => {
    let accounts;
    if(window.ethereum !== "undefined") {
      accounts = await ethereum.request({ method: "eth_requestAccounts"});
    } else {
      alert("Please install Metamask (Security check 6)");
      return;
    }
    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner (Security check 1)");
      return;
    }

    let amount1 = parseInt(amount);

    if(amount === "") {
      alert("You cannot leave amount area empty (Security check 3)");
      return;
    }
    if(amount === 0 || amount1 === 0) {
      alert("You cannot withdraw 0 (Security check 5)");
      return;
    }

    let tokenBalance = await contractSecuritos.getContractTokenBalance();
    let tokenBalance2 = tokenBalance.toString();
    let tokenBalance3 = parseInt(tokenBalance2);
    if(tokenBalance3 < 1) {
      alert("Sytem is empty, no token collected yet (Security check 4)");
      return;
    }

    if(amount1 < 1 || amount1 > tokenBalance3) {
      alert("You cannot withdraw less than 0 and more than contract token Balance (Security check 2)");
      return;
    }

    await contractSecuritos.withdrawToken(amount1);
    setMessage("Success, Tokens of the System sent to owner");
  }
  return (
    <div>
      <button className='button4' onClick={withdrawSintos}>Withdraw Token</button>
      <input type="number" className='inputFields' placeholder='enter token amount'
      value={amount} onChange={(e) => setAmount(e.target.value)} />&nbsp;&nbsp;{message}
    </div>
  )
}

export default WithdrawToken
import React, {useState} from 'react';
import { useAccount } from '../../Store';  

function TokaBalance() { 

  const contractSecuritos = useAccount( state => state.contractSecuritos2);

  let [balance, setBalance] = useState("");

  const getBalance = async () => {
      let userBalance = await contractSecuritos.getYourTokenBalance();
      let userBalance2 = userBalance.toString();
      setBalance(userBalance2);
  }

  return (
    <div>
        <button onClick={getBalance} className='button4'>See Balance</button>
        <span className='spanTokens'>User Token Balance: {balance}</span>
    </div>
  )
}

export default TokaBalance;
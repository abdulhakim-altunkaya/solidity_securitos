import React, {useState} from 'react';
import { useAccount } from '../../Store';  

function TokaBurn() {

  const contractToken = useAccount( state => state.contractToken2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const burnToken = async () => {

    let amount1 = parseInt(amount);

    //security check 1: no empty input
    if(amount1 === "") {
      alert("Burn at least 1 token (Security Check 1)");
      return;
    }
    if(amount === "") {
      alert("Burn at least 1 token (Security Check 2)");
      return
    }

    //security check 2: No amount less than 1
    if(amount1 < 1) {
      alert("Burn at least 1 token (Security Check 3)");
      return;
    }

    //security check 3: check user balance
    let userBalance = await contractToken.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);
    if(userBalance3 < 1) {
      alert("You dont have enough SITOS. How do you think you burn something that you dont have? (Security Check 4)");
      return;
    }
    if(userBalance3 < amount1) {
      alert("The amount you want to burn is bigger than your balance (Security Check 5)");
      return;
    }

    //execution
    await contractToken.burnToken(amount1);
    setMessage(`Success, you burned ${amount1} SITOS`)
  }

  return (
    <div>
      <button onClick={burnToken} className='button4'>Burn Token</button>
      <input type="number" placeholder='enter amount' className='inputFields'
      value={amount} onChange={e => setAmount(e.target.value)} /> {message}
    </div>
  )
}

export default TokaBurn;
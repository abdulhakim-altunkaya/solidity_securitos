import React, {useState} from 'react';
import { useAccount } from '../../Store';  
 
function TokaBuy() {

  const contractSecuritos = useAccount( state => state.contractSecuritos2);

  let [message, setMessage] = useState("1 FTM = 12 SINTOS");

  const buyTokens = async () => {

    let tokenBalance = await contractSecuritos.getContractTokenBalance();
    let tokenBalance2 = tokenBalance.toString();
    let tokenBalance3 = parseInt(tokenBalance2);
    if(tokenBalance3 < 12) {
      alert("Sytem is empty, owner must refill system with SINTOS tokens");
      return;
    }

    let txFee = await contractSecuritos.exchangeValue();
    let txFee2 = txFee.toString();
    const tx = await contractSecuritos.buyToken({value: txFee2});
    await tx.wait();
    setMessage(`Buying Successful`);
  }

  return (
    <div>
      <button onClick={buyTokens} className='button4'>Buy Tokens</button> 
      <span className='spanTokens'>{message}</span>
    </div>
  )
}

export default TokaBuy;
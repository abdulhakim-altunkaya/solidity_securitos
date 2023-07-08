import React, {useState} from 'react';
import { useAccount } from '../../Store';  
 
function TokaMint() {

  const contractSecuritos = useAccount( state => state.contractSecuritos2);

  let [message, setMessage] = useState("");

  const mintToken = async () => {

    //security check 1: if you have 50+ token, you cannot mint more for free
    let userBalance = await contractSecuritos.getYourTokenBalance(); 
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);
    if(userBalance3 > 50) {
      alert("You have more than 50 token. You cannot mint more for free");
      return;
    }

    //execution
    await contractSecuritos.freeMint();
    setMessage(`Free Minting Successful`);
  }

  return (
    <div>
      <button onClick={mintToken} className='button4'>Mint Free Token</button>&nbsp;{message}
    </div>
  )
}

export default TokaMint
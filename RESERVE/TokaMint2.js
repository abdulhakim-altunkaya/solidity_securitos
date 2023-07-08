import React, {useState} from 'react';
import { ethers } from "ethers";
import { ABISecuritos } from "../src/components/AddressABI/ABISecuritos";
import { AddressSecuritos } from "../src/components/AddressABI/AddressSecuritos";
 
function TokaMint2() {

    let contract;
    let signer;
    const connectContract = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(AddressSecuritos, ABISecuritos, signer);
    }
    connectContract();

    let [message, setMessage] = useState("");
    const mintToken = async () => {
        let whoisowner = await contract.owner();
        setMessage(whoisowner);
    }

  return (
    <div>
      <button onClick={mintToken} className='button4'>Mint Free Token12</button>{message}
    </div>
  )
}

export default TokaMint2
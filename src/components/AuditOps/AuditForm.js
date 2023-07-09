import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import { useAccount } from "../../Store.js";
import { ethers } from "ethers";

function AuditForm() {

    const {ethereum} = window;

    const contractSecuritos = useAccount( state => state.contractSecuritos2);

    let[contractCode, setContractCode] = useState("");
    let[responseChatgpt, setResponseChatgpt] = useState("");
    let[manual, setManual] = useState("block");
    let[disableButton7, setDisableButton7] = useState(false);

    const api = process.env.REACT_APP_CHATGPT_API;
    const configuration = new Configuration({apiKey: api});
    const openai = new OpenAIApi(configuration);

    const connectMetamask = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Create an ethers.js provider using MetaMask's provider
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          
          // Request access to the user's accounts
          await window.ethereum.enable();
          
          // Get the initial network ID
          const initialNetwork = await provider.getNetwork();
          const initialNetworkId = initialNetwork.chainId;
          
          // Check if the user is on the Fantom Testnet
          if (initialNetworkId !== '0xfa2') {
            // Prompt the user to switch to the Fantom Testnet
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xfa2' }],
            });
            
            // Wait for network change confirmation
            await new Promise((resolve, reject) => {
              const networkChangedHandler = () => {
                resolve();
                window.ethereum.removeListener('chainChanged', networkChangedHandler);
              };
              window.ethereum.on('chainChanged', networkChangedHandler);
            });
            
            // Recreate the ethers.js provider after switching
            const updatedProvider = new ethers.providers.Web3Provider(window.ethereum);
            
            // Get the updated network ID
            const updatedNetwork = await updatedProvider.getNetwork();
            const updatedNetworkId = updatedNetwork.chainId;
            console.log(updatedNetworkId);
          } 
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        alert('You need to install MetaMask');
        return;
      }
    };
    connectMetamask();
    
    

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(contractCode.length < 100) {
      alert("function code is not long enough (Security Check 2)");
      return;
    }

    let userBalance = await contractSecuritos.getYourTokenBalance(); 
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);
    if(userBalance3 < 1) {
      alert("You dont have enough SINTOS token. Go to Token Operations section (Security Check 3)");
      return;
    }

    setManual("none");
    setDisableButton7(true);
    const txResponse = await contractSecuritos.makePayment();
    await txResponse.wait();
    
    if(txResponse === false) {
      setResponseChatgpt("You need to pay 1 SINTOS, go to Token Operations section to get some SINTOS (Security Check 4)");
      setDisableButton7(false);
      setManual("block");
      return;
    }
    const formInput = `Imagine you are smart contract auditor. Take a look at the function that I will be sharing below.
        Then try to see loopholes inside the function. What are the weak points that hackers can exploit? Also,
        if you detect some vulnerabilities of the function, mention them and provide solutions and suggestions.
        Tell us which lines of code should we check, what are the vulnerabilities. However,
        if you do not see any vulnerability, you can praise. For example, you can say "it is good that you put 
        require statement here....". Write 8 to 12 sentences in total. Half of them should be about the vulnerabilities.
        And the other half should be praising the function code. Do not use repetitive sentences. If the function is too long,
        you can ask them to maake it shorter. Also if the function is not written in Solidity, you can ask them to submit a Solidity
        function. If the submission is not a function, you can ask them to submit a function.
        Here is function: ${contractCode}`;
    const response = await openai.createCompletion({
      prompt: formInput,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000
    });
    const message = response.data.choices[0].text;
    setResponseChatgpt(message);
    setDisableButton7(false);
  }

  



  return ( 

    <div className='smallFormDiv'>

      <h2>SUBMIT YOUR FUNCTION</h2>
      <p>Upload only one function at a time. Do not upload multiple functions.
      </p>
    
      <form onSubmit={handleSubmit} className='contractSubmitForm'>
          <textarea type="text" value={contractCode} onChange={ e => setContractCode(e.target.value) } required></textarea>
          {disableButton7 === true ? 
            <input type="submit" value="Wait..." disabled className='button-87'/>
          :
            <input type="submit" value="Send" className='button-87'/>
          }
          
      </form>
      <p>{responseChatgpt}</p>
      <div style={{display: `${manual}`}}>
      <strong>To audit a function:</strong> <br />
      <strong>1.</strong> Make sure you have Metamask in your browser and you are on Fantom Testnet <br />
      <strong>2.</strong> Connect this site to your Metamask. <br />
      <strong>3.</strong> Audit fee is 1 SINTOS token. <br />
      <strong>3.</strong> If you do not have 1 SINTOS token, go to "Token Operations" of website and buy or mint some tokens.<br />
      <strong>4.</strong> Copy paste your function to the form area and click "send". Confirm Metamask transaction and wait 25 seconds.
      Answer will appear here.
     </div>
    </div>
  )
}

export default AuditForm;


import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import { useAccount } from "../../Store.js";

function AuditForm() {

    const contractSecuritos = useAccount( state => state.contractSecuritos2);

    let[contractCode, setContractCode] = useState("");
    let[responseChatgpt, setResponseChatgpt] = useState("");
    let[manual, setManual] = useState("block");
    let[disableButton7, setDisableButton7] = useState(false);

    const api = process.env.REACT_APP_CHATGPT_API;
    const configuration = new Configuration({apiKey: api});
    const openai = new OpenAIApi(configuration);



  const handleSubmit = async (e) => {

    e.preventDefault();

    if(contractCode.length < 100) {
      alert("contract code is not long enough (Security Check 2)");
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
    const formInput = `Imagine you are smart contract auditor. Take a look at the contract that I will be sharing below.
        Then try to see loopholes inside the contract. What are the weak points that hackers can exploit? Also,
        if you detect some vulnerabilities of the contract, mention them and provide solutions and suggestions.
        Tell us which lines of code should we check, what are the vulnerabilities. However,
        if you do not see any vulnerability, you can praise. For example, you can say "it is good that you put 
        require statement here....". Write 8 to 12 sentences in total. Half of them should be about the vulnerabilities.
        And the other half should be praising the contract code. Do not use repetitive sentences. If the contract is too long,
        you can say as an answer that it is too long and request to make it shorter.
        Here is contract: ${contractCode}`;
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

      <h2>SUBMIT YOUR CONTRACT</h2>
      <p>Before submitting the contract, please make sure you upload only one contract at a time. Do not upload multiple contracts.
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
      <strong>To audit contract:</strong> <br />
      <strong>1.</strong> Make sure you have Metamask in your browser and you are on Fantom Testnet <br />
      <strong>2.</strong> Connect this site to your Metamask. <br />
      <strong>3.</strong> Audit fee is 1 SINTOS token. <br />
      <strong>3.</strong> If you do not have 1 SINTOS token, go to "Token Operations" of website and buy or mint some tokens.<br />
      <strong>4.</strong> Copy paste your contract to form area and click "send". Confirm Metamask transaction and wait 25 seconds.
      Answer will appear here.
     </div>
    </div>
  )
}

export default AuditForm;


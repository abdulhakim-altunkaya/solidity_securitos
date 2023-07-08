import React, {useState} from 'react';

function ConnectMet() {

    const {ethereum} = window;

    let [displayStatus, setDisplayStatus] = useState(false);
    let [account, setAccount] = useState("");

    const connectMetamask = async () => {
        if(window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts"});
            setAccount(accounts[0]);
            setDisplayStatus(!displayStatus);
        } else {
            alert("You need to install Metamask");
            return;
        }
    }


    return (

        <div>
            <button onClick={connectMetamask} className='button9'>CONNECT METAMASK</button>
            {
                displayStatus === true ? 
                <>
                <div className='contractDetailsDiv'>
                    <span>Your Metamask Account:</span>  <br />{account} <br /> 
                    <span>Owner address:</span> 0x50b716662ca9717BA5DD7B20b5b722Cf15B0821B <br />   
                    <span>Securitos & Sintos Token address:</span><br />0x439235E67Ca8C1Ed4C571d0387bE9C574f830e8B <br />
                    <span>Sintos Token symbol & Cap:</span>  SINTOS, 1000000 <br />
                    <span>Sintos Token Standard & Decimals:</span>  ERC20, 18 <br />
                    <span>Network:</span> Fantom Testnet <br />
                </div>
                </>
                :
                <></>
            }
        </div>
    )
}

export default ConnectMet;


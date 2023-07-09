import React, {useState} from 'react';
import { ethers } from "ethers";

function ConnectMet() {

    const {ethereum} = window;

    let [displayStatus, setDisplayStatus] = useState(false);
    let [account, setAccount] = useState("");      

    const connectMetamask = async () => {
        if(window.ethereum !== "undefined") {

            //1.CHANGE NETWORK PART WILL BE EXECUTED IF USER IS ON DIFFERENT NETWORK
            // Create an ethers.js provider using MetaMask's provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            try {
                // Request access to the user's accounts
                await window.ethereum.enable();
                // Get the network ID
                const network = await provider.getNetwork();
                const networkId = network.chainId;
                // Check if the user is on the Fantom Testnet
                if (networkId !== '0xfa2') {
                  // Prompt the user to switch to the Fantom Testnet
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xfa2' }],
                  });
                }
            } catch (error) {
                console.error('Error:', error);
                return;
            }
            //2.METAMASK CONNECTION PART
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


import React, { useState } from 'react';
import { useAccount } from '../../Store';

function GetBalances() {

    const {ethereum} = window;

    const contractSecuritos = useAccount( state => state.contractSecuritos2);

    let[displayStatus4, setDisplayStatus4] = useState(false);
    let[buttonLoading4, setButtonLoading4] = useState(false);
    let[myBalance, setMyBalance] = useState("");
    let[totalMinted, setTotalMinted] = useState("");
    let[treasurySINTOS, setTreasurySINTOS] = useState("");
    let[treasuryFTM, setTreasuryFTM] = useState("");

    const getBalances = async () => {
        if(window.ethereum === "undefined") {
            alert("You need to install Metamask first (Security Check 1)");
            return;
        } else {
            const accounts = await ethereum.request({ method: "eth_requestAccounts"});
            if(accounts[0].slice(0,2) !== "0x") {
                alert("Invalid address type. There is a problem with your Metamask connection. (Security Check 2)");
                return;
            }
        }

        setButtonLoading4(true);
        const dataRaw = await contractSecuritos.returnBalances();
        const dataArray = dataRaw.map( balance => (balance.toString()));
        setMyBalance(dataArray[0]);
        setTotalMinted(dataArray[3]);
        setTreasurySINTOS(dataArray[1]);
        //setTreasuryFTM(dataArray[2].slice(0, -18));
        setTreasuryFTM(dataArray[2]);
        setDisplayStatus4(true); 
        setButtonLoading4(false);
    }

    const hideDetails2 = () => {
        setDisplayStatus4(false);
    } 

    return (
        <> 
            {
                buttonLoading4 === false ? 
                    <button className='button9' onClick={getBalances}>GET BALANCES</button>
                :
                    <button className='button9' disabled >Getting...</button>
            }
            
            {displayStatus4 === true ? 
                <>
                    <div>            
                        <span><strong>Your SINTOS balance:</strong> {myBalance}</span> <br />
                        <span><strong>Securitos Treasury SINTOS:</strong> {treasurySINTOS}</span> <br />
                        <span><strong>Securitos Treasury FTM:</strong> {treasuryFTM}</span> <br />
                        <span><strong>Total Minted SINTOS until now:</strong> {totalMinted}</span>
                    </div>
                    <button className='hidingButton' onClick={hideDetails2}>Hide Details</button> <br />
                </>
            :
                <></>
            }
        </>
    )
}

export default GetBalances
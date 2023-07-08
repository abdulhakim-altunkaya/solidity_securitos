import React from 'react';
import ConnectMet from './ConnectMet';
import GetBalances from './GetBalances';

function TokenRead() {
  return (
    <div className='tokenReadDiv'>
      <p>To use this website: <br />
        1. Make sure you have Metamask installed on your browser <br />
        2. Make sure you are on Fantom Testnet <br />
        3. Make sure you have Fantom Testnet tokens.
      </p>
      <ConnectMet />
      <br />
      <GetBalances />
    </div>
  )
}

export default TokenRead;
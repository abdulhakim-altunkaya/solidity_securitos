import React from 'react';
import FogBalances from "./FogBalances";
import FogApprove from "./FogApprove";
import FogHash from "./FogHash";
import FogDeposit from "./FogDeposit";
import FogWithdrawAll from "./FogWithdrawAll";
import FogWithdrawPart from "./FogWithdrawPart";
import FogFee from "./FogFee";

function Fog() {
  return (
    <div>
      <FogBalances />
      <FogApprove />
      <FogFee />
      <FogHash />
      <FogDeposit />
      <FogWithdrawAll />
      <FogWithdrawPart />
      <p id='aboutText'>Project created for Fantom Hackathon by Abdulhakim Altunkaya. 2023</p>
    </div>
  )
}

export default Fog;
import React, {useState} from 'react';
import TokaMint from "./TokaMint";
import TokaBurn from "./TokaBurn";
import TokaBalance from "./TokaBalance";
import TokaBuy from "./TokaBuy";

function Toka() {

  let [displayStatus, setDisplayStatus] = useState(false);

  const displayTokaOps = () => {
    setDisplayStatus(!displayStatus);
  }

  return (
    <div>
      <button onClick={displayTokaOps} className='button9'>Sintos Token Operations</button>
      {
        displayStatus ? 
        <>
          <TokaMint />
          <TokaBuy />
          <TokaBurn />
          <TokaBalance />
        </>
        :
        <></>
      }
    </div>
  )
}

export default Toka;
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from './services/useStorage.js';
import InfuraSetup from './components/InfuraSetup.js';
import WalletSummary from './components/WalletSummary.js';
import SendEther from './components/SendEther';
import ReceiveEther from './components/ReceiveEther';
import './App.css';

const infuraClientId = JSON.parse(window.localStorage.getItem('infuraClientId'));
const rpcURL = `https://ropsten.infura.io/v3/${infuraClientId}`;
const web3 = new window.Web3(rpcURL);

function App() {
  const [account, setAccount] = useLocalStorage("account", null); 
  const [infuraClientId, setInfuraClientId] = useLocalStorage("infuraClientId", null);
  const [actionType, setActionType] = useState(null);
  
  useEffect(() => {
    if (account === null) {
      let newAccount;
      newAccount = web3.eth.accounts.create();
      setAccount({
          address: newAccount.address,
          privateKey: newAccount.privateKey
      });
    }
  },[]);
 
  return (
    <div className="App">
      <h2>The Ropsten Wallet.</h2>
      <div>
        {(infuraClientId==null) &&
          <InfuraSetup />
        }
        {(infuraClientId!=null) &&        
          <WalletSummary address={account.address} />
        }
        <hr/>

        {(actionType==null) && 
          <div>
            <button onClick={() => {setActionType("Receive")}}>Receive</button>
            <button onClick={() => {setActionType("Send")}}>Send</button> 
          </div>
        }
        {(actionType=="Receive") && 
          <ReceiveEther address={account.address} setActionType={setActionType} />
        }
        {(actionType=="Send") && 
          <SendEther address={account.address} setActionType={setActionType} />
        }

      </div>
    </div>
  );
}

export default App;

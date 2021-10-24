import React, {useEffect, useState, useRef} from "react";
import { useLocalStorage } from "../services/useStorage";
import { useModal } from '../services/useModal';
import Modal from './Modal.js';
import './TipTool.css';

const infuraClientId = JSON.parse(window.localStorage.getItem('infuraClientId'));
const rpcURL = `https://ropsten.infura.io/v3/${infuraClientId}`;
const web3 = new window.Web3(rpcURL);


export default function SendEther({address,  setActionType}) {
    const [balanceEther, setBalanceEther] = useState(0);
    const [transactionResult, setTransactionResult] = useState(null);
    const inputToAddress = useRef(null);
    const inputEtherAmount = useRef(null);

    const [account] = useLocalStorage("account", null);
    const { isShowing, toggle } = useModal();

    useEffect(async () => {
        let currentBalance = 0;
        currentBalance = await web3.eth.getBalance(address);
        setBalanceEther(web3.utils.fromWei(currentBalance, 'ether'));

        //inputToAddress.current.value = "0x633004b1318cb61AF4F3fcb56DeE0D9f4E9B4617";
        inputEtherAmount.current.value = 0.001;
    },[address]);

    const setToAddress = (toAddress) => {
        inputToAddress.current.value = toAddress;
    }

    const SendTransaction = async () => {
        // console.log("Key",account.privateKey);
        // console.log("From Address:",address);
        // console.log("Balance:", balanceEther);
        // console.log("To Address:",inputToAddress.current.value);
        // console.log("Ether Amount:",inputEtherAmount.current.value);
        // console.log(transactionResult);
        web3.eth.accounts.signTransaction(
            {
                to: inputToAddress.current.value,
                value: web3.utils.toHex(web3.utils.toWei(inputEtherAmount.current.value, 'ether')),
                gasLimit: web3.utils.toHex(21000),
                gas: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
            }, 
            account.privateKey, 
            (err, signedTx) => {
                web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, txHash) => {
                    setTransactionResult(txHash);
                })
            });

    }

    return (
        <div>
            { (transactionResult == null) && 
                <div>           
                    <div><b>Send Ether</b></div>
                    <div>From Account: {address}</div>
                    <div>To Account: 
                        <input type="text" ref={inputToAddress} id="toaddress" name="toaddress"/>
                        <button className="tooltip" onClick={toggle}>
                            <img src="https://www.pikpng.com/pngl/m/103-1038229_png-file-svg-white-camera-icon-svg-clipart.png" 
                                alt="Png File Svg - White Camera Icon Svg Clipart@pikpng.com"
                                width="15" />
                            <span className="tooltiptext">Photo QR Code</span>
                        </button>
                    </div>
                    <div>Ether Amount: 
                        <input type="number" ref={inputEtherAmount} id="etheramount" name="etheramount" />
                    </div>
                    <div><button onClick={SendTransaction}>Submit Transaction</button></div>
                    <Modal
                        isShowing={isShowing}
                        hide={toggle}
                        setToAddress={setToAddress}
                    />
                </div>
            }


            { (transactionResult != null) &&
                <div>Transaction: {transactionResult}</div>
            }


            
            <div><button onClick={() => setActionType(null)}>Close</button></div>
        </div>
    )
}
import React, {useEffect, useState} from "react";
import './TipTool.css';

const infuraClientId = JSON.parse(window.localStorage.getItem('infuraClientId'));
const rpcURL = `https://ropsten.infura.io/v3/${infuraClientId}`;
const web3 = new window.Web3(rpcURL);


export default function WalletSummary({address}) {
    const [balanceEther, setBalanceEther] = useState(0);

    useEffect(async () => {
        let currentBalance = 0;
        currentBalance = await web3.eth.getBalance(address);
        setBalanceEther(web3.utils.fromWei(currentBalance, 'ether'));
    },[address]);

    const getBalance = async () => {
        console.log("Getting Balance...")
        let currentBalance = 0;
        currentBalance = await web3.eth.getBalance(address);
        setBalanceEther(web3.utils.fromWei(currentBalance, 'ether'));
    }

    return (
        <div>
            <div>Address: {address}</div>
            <div>Balance: {balanceEther} ether 
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                    onClick={getBalance}
                    style={{paddingLeft:'5px', cursor: 'pointer'}}
                >
                    <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
                </svg>
            </div>
        </div>
    )
}
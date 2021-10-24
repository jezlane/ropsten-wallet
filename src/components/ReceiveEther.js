import React, {useEffect, useState} from "react";


export default function SendEther({address, setActionType}) {
    const [qrCode, setQrCode] = useState("");

    useEffect(() => {
        setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${address}`);
    },[address]);

    return (
        <div>
            <div><b>Receive Ether</b></div>
            <div>Address: {address}</div>
            <div>
                <img src={qrCode} alt="QR Code of Address" />
            </div>
            <div>
                Or ask <a href="https://faucet.ropsten.be/" target="_blank">
                    faucet
                </a>
            </div>
            <div><button onClick={() => setActionType(null)}>Close</button></div>
        </div>
    )
}
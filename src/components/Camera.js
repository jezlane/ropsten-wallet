import React, { useState } from 'react'
import QrReader from 'react-qr-reader'

export default function  QRTest({setQrResult}) {

  const [result, setResult] = useState('No result');
  const [facingMode, setFacingMode] = useState('user');

  const toggleFaceMode = () => {
    (facingMode == 'user') ? setFacingMode('environment') : setFacingMode('user');
  }

  const handleScan = (data) => {
    if (data) {
      setResult(data)
      setQrResult(data)
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  return (
    <div>
        <button onClick={toggleFaceMode}>toggle camera</button>
        <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{width: '80%', paddingLeft: '10%', }}
            facingMode={facingMode}
        />
    </div>
  )
}

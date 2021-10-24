import React, { useState } from 'react';
import Camera from './Camera';

import './Modal.css';

export default function Modal({ isShowing, hide, setToAddress }) {
  const [qrResult, setQrResult] = useState("")

  return(
    isShowing ?
    <div>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <Camera setQrResult={setQrResult} />
          
          <div style={{paddingTop:'10px',}}>
            <div>{qrResult}</div>
            <button onClick={() => {
                    setToAddress(qrResult);
                    hide();
                }}>
                set Address
            </button>
          </div>
        </div>
      </div>
    </div>
    : null
  )
};


// const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
//   <React.Fragment>
//     <div className="modal-overlay"/>
//     <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
//       <div className="modal">
//         <div className="modal-header">
//           <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <p>
//           Hello, I'm a modal.
//         </p>
//       </div>
//     </div>
//   </React.Fragment>, document.body
// ) : null;

// export default Modal;
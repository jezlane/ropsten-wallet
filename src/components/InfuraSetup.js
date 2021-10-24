import React, {useRef} from "react";
import { useLocalStorage } from '../services/useStorage.js';


export default function InfuraSetup() {
    const inputClientId = useRef(null);
    const [infuraClientId, setInfuraClientId] = useLocalStorage("infuraClientId", null);

    const SetClientId = () => {
        setInfuraClientId(inputClientId.current.value);
    }

    return (
        <div>
            <div>
                Infura Client ID: 
                <input type="text" ref={inputClientId} id="clientid" name="clientid" />
                <button onClick={SetClientId}>Enter</button>
            </div>

        </div>
    )
}
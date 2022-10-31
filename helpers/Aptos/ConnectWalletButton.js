import React, { useState } from "react";
import styles from '../../styles/Home.module.css'

import {useWallet} from "@manahippo/aptos-wallet-adapter"

import aptosLogo from "../../public/aptosLogo.png"
import ConnectWalletModal from "./ConnectWalletModal"

const ConnectWalletButton = (props) => {
    const {connectButton, className, style, disabled} = props

    const wallet = useWallet()
    const [showModal, setShowModal] = useState(false)

    function handleButtonClick() {
        if (connectButton) {
            setShowModal(true)
            return
        }
        wallet.disconnect()
    }

    const button = <button disabled={disabled} className={`${styles.connectWalletBtn} ${className} ${disabled ? "disabled" : ""}`} onClick={handleButtonClick} style={style}>
        <img src={aptosLogo.src} />
        <h4 className="mb-0">{connectButton ? "Connect" : "Disconnect"}</h4>
    </button>

    return (
        <>
        {connectButton ? button : wallet.account?.address?.toString() !== undefined ? <span className="mx-auto w-100">{button}</span> : null}
        <ConnectWalletModal show={showModal} onConnect={() => setShowModal(false)} />
        </>
    )
}

export default ConnectWalletButton;

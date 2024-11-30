import React, { useState, useEffect } from 'react'
import styles from "./styles/bankCardSubComponent.module.css"

import CardLogo from "../cards/CardLogo"
import { Icon } from '@iconify/react';
const BankCardSubComponent = ({ favFullCardData, setFavFullCardData, }) => {

    const [venderLogo, setVenderLogo] = useState();


    useEffect(() => {
        if (favFullCardData.category === 'Bank') {
            setVenderLogo(
                < CardLogo cardNo={favFullCardData.cardNumber} />
            )
        }
        console.log(favFullCardData)
    }, [favFullCardData])

    const handleInputValueChange = (e) => {
        setFavFullCardData({
            ...favFullCardData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className={styles.subCardWrapper} >
            <div className={styles.cardHolderWrapper}>
                <div className={styles.cardHolderContainer}>
                    <div className={styles.cardHolderIconDiv}>
                        <Icon
                            className={styles.cardHolderIcon}
                            icon="prime:user"
                        />
                    </div>
                    <div className={styles.cardHolderLabelTextDiv}>
                        <p>CARD HOLDER</p>
                    </div>
                    <div className={styles.cardHolderInputDiv}>
                        <input className={`${styles.textInputCommonStyle} ${styles.cardHolderTextField}  ${styles.cardHolderTextFieldFont}`} value={favFullCardData.cardHolder} readOnly={true} />
                    </div>

                </div>
            </div>
            <div className={styles.cardNumberWrapper}>
                <div className={styles.cardNumberContainer}>
                    <div className={styles.cardNumberIconDiv}>
                        <Icon className={styles.cardNumIcon} icon="vaadin:password" />
                    </div>
                    <div className={styles.cardNumberLabelTextDiv}>
                        <p>CARD NUMBER</p>
                    </div>
                    <div className={styles.cardNumberInputDiv}>
                        <input className={`${styles.textInputCommonStyle} ${styles.cardNumberTextField}  ${styles.cardNumberTextFieldFont}`} value={favFullCardData.cardNumber} readOnly={true} />
                    </div>
                    <div className={styles.cardVenderIconContainer}>
                        <div className={styles.cardVenderIconDiv} >
                            {venderLogo}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.expiryDateWrapper}>
                <div className={styles.expiryDateContainer}>
                    <div className={styles.expiryIconDiv} >
                        <Icon
                            className={styles.expiryDateIcon}
                            icon="prime:calendar-times" />
                    </div>
                    <div className={styles.expiryLabelTextDiv} >
                        <p>EXPIRY</p>
                    </div>
                    <div className={styles.expiryInputDiv} >
                        <input className={`${styles.textInputCommonStyle} ${styles.expiryTextField}  ${styles.expiryTextFieldFont}`} value={favFullCardData.expiry} readOnly={true} />
                    </div>
                </div>
            </div>
            <div className={styles.cvvNumberWrapper}>
                <div className={styles.cvvNumberContainer}>
                    <div className={styles.cvvNumberIconDiv} >
                        <Icon
                            className={styles.cvvIcon}
                            icon="ph:password-bold" />
                    </div>
                    <div className={styles.cvvNumberLabelTextDiv} >
                        <p>CVV</p>
                    </div>
                    <div className={styles.cvvNumberInputDiv} >
                        <input className={`${styles.textInputCommonStyle} ${styles.cvvTextField}  ${styles.cvvTextFieldFont}`} value={favFullCardData.cvv} readOnly={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BankCardSubComponent
import React, { useState, useEffect } from 'react'
import styles from "./styles/bankCardSubComponent.module.css"

import CardLogo from "../cards/CardLogo"
import { Icon } from '@iconify/react';
const BankCardSubComponent = ({ fullContentCardData, setFullContentCardData, editMode, setEditMode }) => {

    const [venderLogo, setVenderLogo] = useState();


    useEffect(() => {
        if (fullContentCardData.category === 'Bank') {
            setVenderLogo(
                < CardLogo cardNo={fullContentCardData.cardNumber} />
            )
        }
    }, [fullContentCardData])

    const handleInputValueChange = (e) => {
        setFullContentCardData({
            ...fullContentCardData,
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
                            icon="prime:user" color="#002a9a"
                        />
                    </div>
                    <div className={styles.cardHolderLabelTextDiv}>
                        <p>CARD HOLDER</p>
                    </div>
                    <div className={styles.cardHolderInputDiv}>
                        <input
                            className={editMode ? styles.cardHolderInputActive : styles.cardHolderInputNotActive}
                            readOnly={editMode ? false : true}
                            onChange={handleInputValueChange}
                            name={"cardHolder"}
                            value={fullContentCardData.cardHolder} />
                    </div>

                </div>
            </div>
            <div className={styles.cardNumberWrapper}>
                <div className={styles.cardNumerContainer}>
                    <div className={styles.cardNumberIconDiv}>
                        <Icon className={styles.cardNumIcon} icon="vaadin:password" color="#002a9a" />
                    </div>
                    <div className={styles.cardNumberLabelTextDiv}>
                        <p>CARD NUMBER</p>
                    </div>
                    <div className={styles.cardNumberInputDiv}>
                        <input
                            className={editMode ? styles.inputActive : styles.inputNotActive}
                            readOnly={editMode ? false : true}
                            onChange={handleInputValueChange}
                            name={"cardNumber"}
                            value={fullContentCardData.cardNumber} />
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
                            icon="prime:calendar-times" color="#002a9a" />
                    </div>
                    <div className={styles.expiryLabelTextDiv} >
                        <p>EXPIRY</p>
                    </div>
                    <div className={styles.expiryInputDiv} >
                        <input
                            className={editMode ? styles.inputActive : styles.inputNotActive}
                            readOnly={editMode ? false : true}
                            onChange={handleInputValueChange}
                            name={"expiry"}
                            value={fullContentCardData.expiry} />
                    </div>
                </div>
            </div>
            <div className={styles.cvvNumberWrapper}>
                <div className={styles.cvvNumberContainer}>
                    <div className={styles.cvvNumberIconDiv} >
                        <Icon
                            className={styles.cvvIcon}
                            icon="ph:password-bold" color="#002a9a" />
                    </div>
                    <div className={styles.cvvNumberLabelTextDiv} >
                        <p>CVV</p>
                    </div>
                    <div className={styles.cvvNumberInputDiv} >
                        <input
                            className={editMode ? styles.inputActive : styles.inputNotActive}
                            readOnly={editMode ? false : true}
                            onChange={handleInputValueChange}
                            name={"cvv"}
                            value={fullContentCardData.cvv} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BankCardSubComponent
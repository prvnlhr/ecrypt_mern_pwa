import React, { useState, useEffect } from 'react'
import styles from "../styles/bankCardSubComponent.module.css"
import bankCardstyles from "../styles/bankCardSubComponent.module.css"

import CardLogo from "../CardLogo"
import { Icon } from '@iconify/react';
const BankCardSubComponent = ({ fullContentCardData, setFullContentCardData, editMode, setEditMode, onFocus, currFocusField }) => {

    const [venderLogo, setVenderLogo] = useState();


    useEffect(() => {
        if (fullContentCardData.category === 'Bank') {
            setVenderLogo(
                <CardLogo className={bankCardstyles.cardVenderLogo} cardNo={fullContentCardData.cardNumber} />
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
                <div className={`${styles.cardHolderContainer}  ${(currFocusField === 3 && editMode) && styles.focusFieldStyle} `}>
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
                        <input
                            className={editMode ? styles.cardHolderInputActive : styles.cardHolderInputNotActive}
                            readOnly={editMode ? false : true}
                            onChange={handleInputValueChange}
                            name={"cardHolder"}
                            onFocus={() => onFocus(3)}

                            value={fullContentCardData.cardHolder} />
                    </div>

                </div>
            </div>
            <div className={styles.cardNumberWrapper}>
                <div className={`${styles.cardNumerContainer}  ${(currFocusField === 4 && editMode) && styles.focusFieldStyle} `}>
                    <div className={styles.cardNumberIconDiv}>
                        <Icon className={styles.cardNumIcon} icon="vaadin:password" />
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
                            onFocus={() => onFocus(4)}
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
                <div className={`${styles.expiryDateContainer}  ${(currFocusField === 5 && editMode) && styles.focusFieldStyle} `}>
                    <div className={styles.expiryIconDiv} >
                        <Icon
                            className={styles.expiryDateIcon}
                            icon="prime:calendar-times" />
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
                            onFocus={() => onFocus(5)}
                            value={fullContentCardData.expiry} />
                    </div>
                </div>
            </div>
            <div className={styles.cvvNumberWrapper}>
                <div className={`${styles.cvvNumberContainer} ${(currFocusField === 6 && editMode) && styles.focusFieldStyle} `}>
                    <div className={styles.cvvNumberIconDiv} >
                        <Icon
                            className={styles.cvvIcon}
                            icon="ph:password-bold" />
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
                            onFocus={() => onFocus(6)}
                            value={fullContentCardData.cvv} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BankCardSubComponent
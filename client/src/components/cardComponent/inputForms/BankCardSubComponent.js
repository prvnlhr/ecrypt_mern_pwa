import React, { useState } from 'react'
import styles from "../styles/bankCardSubComponent.module.css"
import { Icon } from '@iconify/react';
const BankCardSubComponent = ({ bankCardData, setBankCardData, handleFormDataChange, currCardVender, handleCardNumberChanged }) => {



    const setCardVenderLogo = () => {
        return 0;
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
                            className={styles.inputActive}
                            value={bankCardData.cardHolder}
                            name="cardHolder"
                            onChange={handleFormDataChange}
                        />
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
                        <input value={bankCardData.cardNumber}
                            className={styles.inputActive}
                            name="cardNumber"
                            onChange={
                                handleFormDataChange

                            }
                        />
                    </div>
                    <div className={styles.cardVenderIconDiv}>
                        {currCardVender}
                        {/* <Icon className={styles.cardVenderIcon} icon="logos:visa" /> */}
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
                        <input value={bankCardData.expiry}
                            className={styles.inputActive}
                            name="expiry"
                            onChange={handleFormDataChange}
                        />
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
                        <input value={bankCardData.cvv}
                            className={styles.inputActive}
                            name="cvv"
                            onChange={handleFormDataChange}

                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BankCardSubComponent
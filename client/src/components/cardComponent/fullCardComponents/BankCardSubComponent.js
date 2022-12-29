import React, { useState, useEffect } from 'react'
import styles from "../styles/bankCardSubComponent.module.css"

import CardLogo from "../CardLogo"
import { Icon } from '@iconify/react';
const BankCardSubComponent = ({ cardData }) => {
    const [venderLogo, setVenderLogo] = useState();
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
                        <input value={"Anderw Garfield"} />
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
                        <input value={"5242 7230 1846 1202"} />
                    </div>
                    <div className={styles.cardVenderIconDiv}>
                        <Icon className={styles.cardVenderIcon} icon="logos:visa" />
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
                        <input value={"04/24"} />
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
                        <input value={"256"} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BankCardSubComponent
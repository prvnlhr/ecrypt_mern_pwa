import React, { useState } from 'react'
import styles from "./styles/cardStyles.module.css"
import { logosArray } from "../../logoComponents/logosData"
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion"


const Card = () => {
    const [cardExpand, setCardExpand] = useState(false);
    const changeCardView = () => {
        setCardExpand(!cardExpand)
    }
    return (
        <div className={cardExpand ? styles.cardWrapperExpand : styles.cardWrapperShrink} onClick={changeCardView}>
            <div className={cardExpand ? styles.cardContainerExpand : styles.cardContainerShrink} >

                <div className={styles.logoWrapper}>
                    <div className={cardExpand ? styles.logoDivExpand : styles.logoDivShrink}>
                        {
                            logosArray[72].logo
                        }
                    </div>
                </div>

                <div className={styles.titleWrapper}>
                    {cardExpand &&
                        <div className={styles.titleLabelDiv} >
                            <p>Title</p>
                        </div>
                    }

                    <div className={cardExpand ? styles.titleTextDivExpand : styles.titleTextDivShrink} >
                        <p>State Bank Credit card</p>
                    </div>
                </div>


                {cardExpand &&
                    <>
                        <div className={styles.categoryWrapper} >
                            <div className={styles.categoryLabelWrapper} >
                                <p>Category</p>
                            </div>
                            <div className={styles.categoryTextWrapper} >
                                <div className={styles.categoryTextDiv} >
                                    <p>Bank</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardHolderWrapper} >
                            <div className={styles.cardHolderIconWrapper} >
                                <Icon
                                    className={styles.cardHolderIcon}
                                    icon="prime:user" color="#002a9a"
                                />
                            </div>
                            <div className={styles.cardHolderLabelWrapper} >
                                <p>CARDHOLDER</p>
                            </div>
                            <div className={styles.cardHolderTextWrapper} >
                                <p>Anthony Stark</p>
                            </div>
                        </div>

                        <div className={styles.expiryWrapper} >
                            <div className={styles.cardExpiryIconWrapper}>
                                <Icon
                                    className={styles.expiryDateIcon}
                                    icon="prime:calendar-times" color="#002a9a" />
                            </div>
                            <div className={styles.cardExpiryLabelWrapper} >
                                <p>EXPIRY</p>
                            </div>
                            <div className={styles.cardExpiryTextWrapper} >
                                <p>
                                    23/05
                                </p>
                            </div>
                        </div>
                        <div className={styles.cvvWrapper} >
                            <div className={styles.cardCvvIconWrapper} >
                                <Icon
                                    className={styles.cvvIcon}
                                    icon="ph:password-bold" color="#002a9a" />
                            </div>
                            <div className={styles.cardCvvLabelWrapper} >
                                <p>CVV</p>
                            </div>
                            <div className={styles.cardCvvTextWrapper} >
                                <p>856</p>
                            </div>
                        </div>
                    </>
                }
                <div className={cardExpand ? styles.cardNoWrapperExpand : styles.cardNoWrapperShrink} >
                    {cardExpand &&
                        <>
                            <div className={styles.cardNoIconWrapper} >
                                <Icon className={styles.cardNumIcon} icon="vaadin:password" color="#002a9a" />
                            </div>
                            <div className={styles.cardNoLabelWrapper} >
                                <p>
                                    CARDNUMBER
                                </p>
                            </div>
                        </>
                    }

                    <div className={cardExpand ? styles.cardNoTextWrapper : styles.cardNoTextWrapperShrink} >
                        <p>524272001139452</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card
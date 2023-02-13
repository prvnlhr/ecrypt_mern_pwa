import React, { useState } from 'react'
import styles from "./styles/loginIdCardStyle.module.css"
import { logosArray } from "../../logoComponents/logosData"
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion"

const LoginId = ({ item }) => {

    // console.log(item)

    const [cardExpand, setCardExpand] = useState(false);
    const changeCardView = () => {
        setCardExpand(!cardExpand)
    }
    return (
        <AnimatePresence>
            <div layout
                className={cardExpand ? styles.cardWrapperExpand : styles.cardWrapperShrink} onClick={changeCardView} >
                <div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout="position" className={cardExpand ? styles.cardContainerExpand : styles.cardContainerShrink} >


                    <div layout="position" className={styles.logoWrapper} >
                        <div layout="position"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className={cardExpand ? styles.logoDiv : styles.logoDivShrink} >
                            {
                                logosArray[item.logoIndex].logo
                            }
                        </div>
                    </div>

                    <div layout="position" className={styles.titleWrapper} >
                        {cardExpand &&
                            <div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                layout="position" className={styles.titleLabelDiv}>
                                <p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    layout="position" >Title</p>
                            </div>
                        }
                        <div layout="position" className={cardExpand ? styles.titleTextDiv : styles.titleTextDivShrink} >
                            <p initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }} >{item.title}</p>
                        </div>
                    </div>
                    {
                        cardExpand &&
                        <>

                            <div

                                className={styles.categoryLabelWrapper} >
                                <div className={styles.categoryLabelDiv} >
                                    <p>Category</p>
                                </div>
                            </div>
                            <div className={styles.categroryTextWrapper} >
                                <div className={styles.categoryTextDiv} >
                                    <p>{item.category}</p>
                                </div>
                            </div>


                            <div className={styles.appWebsiteLabelWrapper} >
                                <div className={styles.appWebsiteLabelDiv} >
                                    <p>App / Website</p>
                                </div>
                            </div>
                            <div className={styles.appWebsiteTextWrapper} >
                                <div className={styles.appWebsiteTextDiv} >
                                    <p>{item.app}</p>
                                </div>
                            </div>


                            <div className={styles.passwordWrapper} >
                                <div className={styles.passwordIconWrapper} >
                                    <Icon
                                        className={styles.fieldIcons}
                                        icon="fluent:password-20-regular"  />
                                </div>
                                <div className={styles.passwordLabelWrapper} >
                                    <p>PASSWORD</p>
                                </div>
                                <div className={styles.passwordTextWrapper} >
                                    <p>{item.password}</p>
                                </div>
                            </div>
                        </>
                    }
                    <div className={cardExpand ? styles.usernameWrapper : styles.usernameWrapperShrink} >
                        {
                            cardExpand &&
                            <>
                                <div className={styles.usernameIconWrapper} >
                                    <Icon className={styles.fieldIcons}
                                        icon="prime:user" 
                                    />
                                </div>
                                <div className={styles.usernameLabelWrapper} >
                                    <p>USERNAME / EMAIL</p>
                                </div>
                            </>
                        }

                        <div className={styles.usernameTextWrapper} >
                            <p className={cardExpand ? styles.usernameText : styles.usernameTextShrink} >{item.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    )
}

export default LoginId
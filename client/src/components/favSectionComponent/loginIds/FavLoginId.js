import React, { useState } from 'react'
import styles from "./styles/favLoginId.module.css"
import { logosArray } from "../../logoComponents/logosData"
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion"
import BookmarksIcon from "../../icons/BookmarksIcon"
import BookmarksIconFill from "../../icons/BookmarksIconFill"

const FavLoginId = ({ favItem }) => {
    const [cardExpand, setCardExpand] = useState(false);
    const changeCardView = () => {
        setCardExpand(!cardExpand)
    }

    const favBtnClicked = () => {
        console.log("favBtns")
    }
    return (
        <AnimatePresence>
            <div layout className={cardExpand ? styles.cardWrapperExpand : styles.cardWrapperShrink} onClick={changeCardView} >
                <div className={cardExpand ? styles.cardOpenCloseIconDivExpand : styles.cardOpenCloseIconDivShrink}>
                    <svg
                        className={styles.openCloseIcon}
                        width="24" height="24"
                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L11.2191 14.3306C11.6684 14.7158 12.3316 14.7158 12.7809 14.3306L19 9" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                    </svg>

                </div>
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
                                logosArray[favItem.logoIndex].logo
                            }
                        </div>
                    </div>

                    {cardExpand &&
                        <div className={styles.favBtnDiv} onClick={favBtnClicked}>
                            <BookmarksIconFill />
                        </div>
                    }

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
                                    layout="position" >Title
                                </p>
                            </div>
                        }
                        <div layout="position" className={cardExpand ? styles.titleTextDiv : styles.titleTextDivShrink} >
                            <p initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }} >
                                {favItem.title}
                            </p>
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
                                    <p>{favItem.category}</p>
                                </div>
                            </div>


                            <div className={styles.appWebsiteLabelWrapper} >
                                <div className={styles.appWebsiteLabelDiv} >
                                    <p>App / Website</p>
                                </div>
                            </div>
                            <div className={styles.appWebsiteTextWrapper} >
                                <div className={styles.appWebsiteTextDiv} >
                                    <p>{favItem.app}</p>
                                </div>
                            </div>


                            <div className={styles.passwordWrapper} >
                                <div className={styles.passwordIconWrapper} >
                                    <Icon
                                        className={styles.iconsStyles}
                                        icon="fluent:password-20-regular" color="#002a9a" />
                                </div>
                                <div className={styles.passwordLabelWrapper} >
                                    <p>PASSWORD</p>
                                </div>
                                <div className={styles.passwordTextWrapper} >
                                    <p>{favItem.password}</p>
                                </div>
                            </div>
                        </>
                    }
                    <div className={cardExpand ? styles.usernameWrapper : styles.usernameWrapperShrink} >
                        {
                            cardExpand &&
                            <>
                                <div className={styles.usernameIconWrapper} >
                                    <Icon className={styles.iconsStyles}
                                        icon="prime:user" color="#002a9a"
                                    />
                                </div>
                                <div className={styles.usernameLabelWrapper} >
                                    <p>USERNAME / EMAIL</p>
                                </div>
                            </>
                        }

                        <div className={styles.usernameTextWrapper} >
                            <p className={cardExpand ? styles.usernameText : styles.usernameTextShrink} >{favItem.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    )
}

export default FavLoginId
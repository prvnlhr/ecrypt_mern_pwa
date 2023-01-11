import React, { useState } from 'react'
import styles from "./styles/loginIdCardStyle.module.css"
import { logosArray } from "../../logoComponents/logosData"
import { Icon } from '@iconify/react';

const LoginId = () => {

    const [cardExpand, setCardExpand] = useState(false);
    const changeCardView = () => {
        setCardExpand(!cardExpand)
    }
    return (
        <div className={cardExpand ? styles.cardWrapperExpand : styles.cardWrapperShrink} onClick={changeCardView} >

            <div className={cardExpand ? styles.cardContainerExpand : styles.cardContainerShrink} >


                <div className={styles.logoWrapper} >
                    <div className={cardExpand ? styles.logoDiv : styles.logoDivShrink} >
                        {
                            logosArray[42].logo
                        }
                    </div>
                </div>

                <div className={styles.titleWrapper} >
                    {cardExpand &&
                        <div className={styles.titleLabelDiv}>
                            <p>Title</p>
                        </div>
                    }
                    <div className={cardExpand ? styles.titleTextDiv : styles.titleTextDivShrink} >
                        <p>Google pay</p>
                    </div>
                </div>
                {
                    cardExpand &&
                    <>

                        <div className={styles.categoryLabelWrapper} >
                            <div className={styles.categoryLabelDiv} >
                                <p>Category</p>
                            </div>
                        </div>
                        <div className={styles.categroryTextWrapper} >
                            <div className={styles.categoryTextDiv} >
                                <p>Finance</p>
                            </div>
                        </div>


                        <div className={styles.appWebsiteLabelWrapper} >
                            <div className={styles.appWebsiteLabelDiv} >
                                <p>App / Website</p>
                            </div>
                        </div>
                        <div className={styles.appWebsiteTextWrapper} >
                            <div className={styles.appWebsiteTextDiv} >
                                <p>GPay</p>
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
                                <p>prvn@22342</p>
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
                        <p className={cardExpand ? styles.usernameText : styles.usernameTextShrink} >prvnlhr007@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginId
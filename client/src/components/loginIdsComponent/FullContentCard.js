import React from 'react'
import { useState, useEffect } from 'react';
import styles from "./styles/fullContentCard.module.css"
import BackBtnIcon from "../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import { logosArray } from "../logoComponents/logosData"
import LogoComponentWrapper from "../logoComponents/LogoComponentWrapper"
const FullContentCard = ({ fullContentCardData, showContentCard, handleFullContentBackBtnClicked }) => {


    const [currData, setCurrData] = useState({
        // app: "",
        // category: "",
        // title: "",
        // username: "",
        // password: "",
        // logoIndex: "",
    });
    const [popUpOpen, setPopUpOpen] = useState(false);

    const [logoIndx, setLogoIndx] = useState(undefined);

    const [logoComponentShow, setLogoComponentShow] = useState(false);

    useEffect(() => {
        setCurrData({
            app: fullContentCardData.app,
            category: fullContentCardData.category,
            title: fullContentCardData.title,
            username: fullContentCardData.username,
            password: fullContentCardData.password,
            logoIndex: fullContentCardData.logoIndex,
        })
        setLogoIndx(fullContentCardData.logoIndex)
    }, [fullContentCardData]);

    useEffect(() => {
        // console.log(logoIndx, logosArray[logoIndx])
    }, [logoIndx]);

    console.log(currData);

    const handleOpClick = (op) => {
        setCurrData({
            ...currData,
            category: op
        })
        setPopUpOpen(!popUpOpen)
    }
    const logoclicked = () => {
        setLogoComponentShow(true);
    }
    return (
        <div className={showContentCard ? styles.cardWrapper : styles.cardWrapperClose}>
            {logoComponentShow &&
                <LogoComponentWrapper
                    setLogoComponentShow={setLogoComponentShow}
                    logoIndx={logoIndx}
                    setLogoIndx={setLogoIndx}
                />
            }
            <div className={styles.cardContainer}>

                <div className={styles.cardHeader}>
                    <div className={styles.backBtnContainer} >
                        <div className={styles.backBtnDiv}
                            onClick={() => handleFullContentBackBtnClicked()}
                        >
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.editBtnContainer} >

                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >

                    <div className={styles.logoTitleContainer} >
                        <div className={styles.logoContainer} onClick={logoclicked} >
                            <div className={styles.logoDiv}>
                                {logoIndx !== undefined &&
                                    logosArray[logoIndx].logo
                                }
                            </div>
                        </div>

                        <div className={styles.titleContainer} >
                            <div className={styles.titleTitleDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleTextDiv}>
                                <p className={styles.titleText}>{currData.title}</p>
                            </div>
                        </div>


                    </div>

                </div>


                <div className={styles.categoryWrapper} >
                    <div className={styles.categoryContainer} >
                        <div className={styles.catergoryTitleDiv} >
                            <p>Category</p>
                        </div>
                        <div className={styles.catergoryInputDiv} >
                            <input
                                list="websites"
                                className={styles.categoryInput}
                                value={currData.category}
                                readOnly={true}

                            />
                            <div
                                className={styles.popUpBtnIconDiv}

                            >
                                <Icon
                                    onClick={() =>
                                        setPopUpOpen(!popUpOpen)
                                    }
                                    className={styles.popUpIcon}
                                    icon="tabler:chevron-down" color="black" />
                            </div>

                            {
                                popUpOpen ? (
                                    <div className={styles.inputPopUpDiv}>
                                        <p className={styles.inputPopUpText}
                                            onClick={() => {
                                                handleOpClick("Finance")
                                            }}>
                                            Finance
                                        </p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Personal")
                                        }}>Personal</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Work")
                                        }}>Work</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Social")
                                        }}>Social</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Shopping")
                                        }}>Shopping</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Travel")
                                        }}>Travel</p>

                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.appWebSiteWrapper} >
                    <div className={styles.appWebSiteContainer} >
                        <div className={styles.appWebSiteIconDiv} >
                            <Icon
                                className={styles.websiteIcon}
                                icon="tabler:app-window" color="#002a9a" />
                        </div>
                        <div className={styles.appWebSiteTitleDiv} >
                            <p>App / Website</p>
                        </div>
                        <div className={styles.appWebSiteTextDiv} ></div>
                    </div>

                </div>

                <div className={styles.usernameWrapper} >
                    <div className={styles.usernameContainer} >
                        <div className={styles.usernameIconDiv} >
                            <Icon
                                className={styles.usernameIcon}
                                icon="prime:user" color="#002a9a"
                            />
                        </div>
                        <div className={styles.usernameLabelDiv} >
                            <p>USERNAME / EMAIL</p>
                        </div>
                        <div className={styles.usernameInputDiv} >
                            <input className={styles.usernameInput} value={currData.username} />
                        </div>
                    </div>
                </div>


                <div className={styles.passwordWrapper} >
                    <div className={styles.passwordContainer} >
                        <div className={styles.passwordIconDiv} >
                            <Icon
                                className={styles.passwordIcon}
                                icon="fluent:password-20-regular" color="#002a9a" /></div>
                        <div className={styles.passwordLabelDiv} >
                            <p>PASSWORD</p>
                        </div>
                        <div className={styles.passwordInputDiv} >
                            <input className={styles.usernameInput} value={currData.password} />
                        </div>
                    </div></div>
            </div>
        </div>

    )
}

export default FullContentCard
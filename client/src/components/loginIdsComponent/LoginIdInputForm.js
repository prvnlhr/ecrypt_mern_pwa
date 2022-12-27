import React from 'react'
import { useState, useEffect } from 'react';
import BackBtnIcon from "../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import { logosArray } from "../logoComponents/logosData"
import LogoComponentWrapper from "../logoComponents/LogoComponentWrapper"
import styles from "./styles/loginIdInputForm.module.css"
const LoginIdInputForm = ({ formToggle, showInputForm, setShowInputForm }) => {

    const [formData, setformData] = useState({
        app: "",
        category: "",
        title: "",
        username: "",
        password: "",
        logoIndex: "",
    });

    const [popUpOpen, setPopUpOpen] = useState(false);

    const [logoIndx, setLogoIndx] = useState(undefined);

    const [logoComponentShow, setLogoComponentShow] = useState(false);




    const handleInputValueChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }


    const saveBtnClicked = () => {
        console.table(formData);

    }

    useEffect(() => {
        setLogoIndx(logoIndx)
        setformData({
            ...formData,
            logoIndex: logoIndx
        })
    }, [logoIndx])

    const handleOpClick = (op) => {
        setformData({
            ...formData,
            category: op
        })
        setPopUpOpen(!popUpOpen)
    }

    const handleLogoClicked = () => {
        setLogoComponentShow(true);
    }
    return (
        <div className={styles.cardWrapper}>
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
                        <div className={styles.backBtnDiv} onClick={() => formToggle()}>
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.crudBtnContainer}   >
                        <div className={styles.saveBtnDiv} onClick={saveBtnClicked}>
                            <p>Save</p>
                        </div>
                    </div>
                </div>

                <div className={styles.logoTitleWrapper} >

                    <div className={styles.logoTitleContainer} >
                        <div className={styles.logoContainer} onClick={handleLogoClicked} >
                            <div className={styles.logoDiv}>
                                {logoIndx !== undefined &&
                                    logosArray[logoIndx].logo
                                }
                            </div>
                        </div>

                        <div className={styles.titleContainer} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleLabelText}>TITLE</p>
                            </div>
                            <div className={styles.titleInputDiv}>
                                <input onChange={handleInputValueChange}
                                    value={formData.title}
                                    name={"title"}
                                />
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
                                value={formData.category}
                                onChange={handleInputValueChange}

                            />
                            <div className={styles.popUpBtnIconDiv}>
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
                        <div className={styles.appWebsiteInputDiv} >
                            <input
                                value={formData.app}
                                onChange={handleInputValueChange}
                                name={"app"}
                            />
                        </div>
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
                            <input className={styles.usernameInput}
                                onChange={(e) => setformData({ ...formData, username: e.target.value })}
                                // onChange={(e) => handleInputValueChange(e)}
                                value={formData.username}
                                name={"username"}

                            />
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
                            <input className={styles.usernameInput}
                                onChange={handleInputValueChange}
                                value={formData.password}
                                name={"password"}

                            />
                        </div>
                    </div></div>
            </div>
        </div>
    )
}

export default LoginIdInputForm
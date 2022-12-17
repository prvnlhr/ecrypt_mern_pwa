import React from 'react'
import { useState, useEffect } from 'react';
import styles from "../styles/fullCardComponent.module.css"
import BackBtnIcon from "../../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import BankCardSubComponent from './BankCardSubComponent';
import IdentityCardSubComponent from './IdentityCardSubComponent';
import LicenseCardSubComponent from './LicenseCardSubComponent';
import LogoComponent from "../../logoComponents/LogoComponent"

const FullCardComponent = ({ showContentCard, handleFullContentBackBtnClicked,
    fullContentCardData, setLogoComponentShow

}) => {
    const [popUpOpen, setPopUpOpen] = useState(false);


    // console.log(fullContentCardData)



    // const [bankCardData, setBankCardData] = useState({
    //     title: "",
    //     category: "",
    //     cardHolder: "",
    //     cardNumber: "",
    //     expiry: "",
    //     cvv: "",
    // })
    // const [identityCardData, setIdentityCardData] = useState({
    //     title: "",
    //     category: "",
    //     cardHolder: "",
    //     cardNumber: "",
    //     issueDate: "",
    //     dob: "",
    // })
    // const [licenseCardData, setLicenseCardData] = useState({
    //     title: "",
    //     category: "",
    //     cardHolder: "",
    //     licenseNumber: "",
    //     expiry: "",
    //     dob: "",
    // })

    const handleOpClick = (op) => {

        // switch (op) {
        //     case "Identity":
        //         setIdentityCardData({
        //             ...identityCardData,
        //             category: op
        //         })
        //         break;

        //     case "License":
        //         setLicenseCardData({
        //             ...licenseCardData,
        //             category: op
        //         })
        //         break;

        //     case "Bank":
        //         setBankCardData({
        //             ...bankCardData,
        //             category: op
        //         })
        //         break;

        //     default:
        //         break;
        // }

        // setCurrData({
        //     ...currData,
        //     category: op
        // })
        setPopUpOpen(!popUpOpen)
    }

    const logoclicked = () => {
        setLogoComponentShow(true);
    }

    return (
        <div className={showContentCard ? styles.cardWrapper : styles.cardWrapperClose}>

            <div className={styles.cardContainer}>

                <div className={styles.cardHeader} >
                    <div className={styles.backBtnContainer} >
                        <div className={styles.backBtnDiv}
                            onClick={() => handleFullContentBackBtnClicked()}
                        >
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.editBtnContainer} ></div>
                </div>


                <div className={styles.logoTitleWrapper} >

                    <div className={styles.logoTitleContainer} >

                        <div className={styles.logoContainer} onClick={logoclicked} >
                            <div className={styles.logoDiv}>
                                <Icon
                                    className={styles.logoIcon}
                                    icon="logos:google-pay-icon" color="#0473ff" />
                            </div>

                        </div>


                        <div className={styles.titleContainer} >
                            <div className={styles.titleTitleDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleTextDiv}>
                                <p className={styles.titleText}>{fullContentCardData.title}</p>
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
                                className={styles.categoryInput}
                                value={fullContentCardData.category}
                                readOnly={true}

                            />
                            <div className={styles.popUpBtnIconDiv}>
                                <Icon
                                    className={styles.popUpIcon}
                                    icon="tabler:chevron-down" color="black" />
                            </div>

                            {
                                popUpOpen ? (
                                    <div className={styles.inputPopUpDiv}>
                                        <p className={styles.inputPopUpText}
                                            onClick={() => {
                                                handleOpClick("Identity")
                                            }}>
                                            Identity
                                        </p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("License")
                                        }}>License</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Bank")
                                        }}>Bank</p>

                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.subCardWrapper}>


                    {fullContentCardData.category === "Bank" ?
                        <BankCardSubComponent /> : fullContentCardData.category === "Identity" ?
                            <IdentityCardSubComponent /> : fullContentCardData.category === "License" ?
                                <LicenseCardSubComponent /> : null
                    }

                </div>



            </div>
        </div>
    )
}

export default FullCardComponent
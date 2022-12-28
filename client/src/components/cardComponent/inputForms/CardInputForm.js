import React from 'react'
import { useState, useEffect } from 'react';
import BackBtnIcon from "../../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import { logosArray, logosData } from "../../logoComponents/logosData";
import BankCardSubComponent from './BankCardSubComponent';
import IdentityCardSubComponent from './IdentityCardSubComponent';
import LicenseCardSubComponent from './LicenseCardSubComponent';
import LogoComponentWrapper from "../../logoComponents/LogoComponentWrapper"
import styles from "../styles/cardInputForm.module.css"
import bankCardFormstyles from "../styles/bankCardSubComponent.module.css"
import CardLogo, { getCardType } from "../CardLogo"
const CardInputForm = ({ formToggle }) => {


    const [popUpOpen, setPopUpOpen] = useState(false);

    const [logoIndx, setLogoIndx] = useState(undefined);

    const [formCategory, setFormCategory] = useState("Bank");

    const [logoComponentShow, setLogoComponentShow] = useState(false);

    const [currCardVender, setCurrCardVender] = useState(undefined);


    const [bankCardData, setBankCardData] = useState({
        title: "",
        category: "Bank",
        cardHolder: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        logoIndex: ""
    })
    const [identityCardData, setIdentityCardData] = useState({
        title: "",
        category: "Identity",
        cardHolder: "",
        cardNumber: "",
        issueDate: "",
        dob: "",
        logoIndex: ""
    })
    const [licenseCardData, setLicenseCardData] = useState({
        title: "",
        category: ":License",
        cardHolder: "",
        licenseNumber: "",
        expiry: "",
        dob: "",
        logoIndex: ""
    })

    useEffect(() => {
        setLogoIndx(logoIndx)
        switch (formCategory) {
            case "Identity":
                setIdentityCardData({
                    ...identityCardData,
                    logoIndex: logoIndx
                })
                break;

            case "License":
                setFormCategory("License")
                setLicenseCardData({
                    ...licenseCardData,
                    logoIndex: logoIndx
                })
                break;

            case "Bank":
                setFormCategory("Bank")
                setBankCardData({
                    ...bankCardData,
                    logoIndex: logoIndx
                })
                break;


            default:
                break;
        }
    }, [logoIndx])

    const handleOpClick = (op) => {
        setIdentityCardData({
            ...identityCardData,
            logoIndex: undefined
        })
        setLicenseCardData({
            ...licenseCardData,
            logoIndex: undefined
        })
        setBankCardData({
            ...bankCardData,
            logoIndex: undefined
        })
        setLogoIndx(undefined)

        switch (op) {
            case "Identity":
                setFormCategory("Identity")
                setIdentityCardData({
                    ...identityCardData,
                    category: op
                })
                break;

            case "License":
                setFormCategory("License")
                setLicenseCardData({
                    ...licenseCardData,
                    category: op
                })
                break;

            case "Bank":
                setFormCategory("Bank")
                setBankCardData({
                    ...bankCardData,
                    category: op
                })
                break;

            default:
                break;
        }

        setPopUpOpen(!popUpOpen)
    }

    const formLogoClicked = () => {
        setLogoComponentShow(true);
    }

    const handleFormDataChange = (e) => {

        switch (formCategory) {
            case "Identity":

                setIdentityCardData({
                    ...identityCardData,
                    [e.target.name]: e.target.value,
                })

                break;

            case "License":
                setLicenseCardData({
                    ...licenseCardData,
                    [e.target.name]: e.target.value,
                })

                break;

            case "Bank":
                setBankCardData({
                    ...bankCardData,
                    [e.target.name]: e.target.value,
                })
                break;

            default:
                break;
        }

    }
    const saveBtnClicked = () => {
        switch (formCategory) {
            case "Identity":
                console.table(identityCardData);
                break;

            case "License":
                console.table(licenseCardData);
                break;

            case "Bank":
                console.table(bankCardData);
                break;

            default:
                break;
        }

    }

    //> For setting cardVender logo Dynamically
    useEffect(() => {
        if (bankCardData.cardNumber.length >= 16) {
            let cardVenderLogo = <CardLogo className={bankCardFormstyles.cardVenderLogo} cardNo={bankCardData.cardNumber} />
            setCurrCardVender(cardVenderLogo)
        }

    }, [bankCardData.cardNumber])


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

                <div className={styles.cardHeader} >
                    <div className={styles.backBtnContainer} >
                        <div className={styles.backBtnDiv}
                            onClick={() => formToggle()}
                        >
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.crudBtnContainer} >
                        <div className={styles.saveBtnDiv} onClick={saveBtnClicked}>
                            <p>Save</p>
                        </div>
                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >

                    <div className={styles.logoTitleContainer} >

                        <div className={styles.logoContainer} onClick={formLogoClicked} >
                            <div className={styles.logoDiv}>
                                {logoIndx !== undefined &&
                                    logosArray[logoIndx].logo
                                }
                            </div>

                        </div>


                        <div className={styles.titleContainer} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleInputDiv}>
                                <input value={
                                    formCategory === "Bank" ? bankCardData.title
                                        : formCategory === "Identity" ? identityCardData.title :
                                            formCategory === "License" ? licenseCardData.title : ""
                                }
                                    onChange={handleFormDataChange}
                                    name="title"
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
                                className={styles.categoryInput}
                                value={formCategory}
                                readOnly={true}

                            />
                            <div className={styles.popUpBtnIconDiv} onClick={() => setPopUpOpen(true)}>
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

                    {
                        formCategory === "Bank" ? <BankCardSubComponent bankCardData={bankCardData} setBankCardData={setBankCardData} handleFormDataChange={handleFormDataChange} currCardVender={currCardVender} />
                            : formCategory === "Identity" ? <IdentityCardSubComponent identityCardData={identityCardData} setIdentityCardData={setIdentityCardData} handleFormDataChange={handleFormDataChange} />
                                : formCategory === "License" ? <LicenseCardSubComponent licenseCardData={licenseCardData} setLicenseCardData={licenseCardData} handleFormDataChange={handleFormDataChange} /> : null
                    }

                </div>



            </div>
        </div>
    )
}

export default CardInputForm
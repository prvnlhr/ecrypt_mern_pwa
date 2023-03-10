import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect, useRef } from 'react';
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
import { generateActivityData } from "../../utils/ActivityDataChangeFuction"
import { addNewCardData } from "../../../redux/features/cards/cardsSlice"
import { Oval } from "react-loader-spinner"
import DatePicker from "../../datePickerComponent/DatePicker"
const spinnerWrapper = {
    height: `100%`,
    with: `100%`,
}
const CardInputForm = ({ formToggle, showInputForm, setShowInputForm }) => {

    const dispatch = useDispatch();

    const ddSlotRef = useRef();
    const mmSlotRef = useRef();
    const yySlotRef = useRef();


    const userId = useSelector((state) => state.user._id);
    const cardsState = useSelector((state) => state.cards);

    const { isLoading, action, success } = cardsState;

    const [currFocusField, setCurrFocusField] = useState(undefined);

    const [showDatePicker, setShowDatePicker] = useState({
        visibility: false,
        key: '',
    });

    const onFocus = (val) => {
        setCurrFocusField(val)
    }

    const [popUpOpen, setPopUpOpen] = useState(false);

    const [logoIndx, setLogoIndx] = useState(undefined);

    const [formCategory, setFormCategory] = useState("Bank");

    const [logoComponentShow, setLogoComponentShow] = useState(false);

    const [currCardVender, setCurrCardVender] = useState(undefined);


    //> Initial Form States________________________________________
    const [bankCardData, setBankCardData] = useState({
        title: "",
        category: "Bank",
        cardHolder: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        logoIndex: "",
        isFavourite: false
    })

    const [identityCardData, setIdentityCardData] = useState({
        title: "",
        category: "Identity",
        cardHolder: "",
        cardNumber: "",
        issueDate: "",
        dob: "",
        logoIndex: "",
        isFavourite: false
    })
    const [licenseCardData, setLicenseCardData] = useState({
        title: "",
        category: ":License",
        cardHolder: "",
        licenseNumber: "",
        expiry: "",
        dob: "",
        logoIndex: "",
        isFavourite: false
    })




    //> _______________________________________________________________


    //> For setting cardVender logo Dynamically________
    useEffect(() => {
        if (bankCardData.cardNumber.length >= 16) {
            let cardVenderLogo = <CardLogo className={bankCardFormstyles.cardVenderLogo} cardNo={bankCardData.cardNumber} />
            setCurrCardVender(cardVenderLogo)
        }

    }, [bankCardData.cardNumber])


    //>  handle form logo Index change______________
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


    //> Handle category input value change_______________
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

    const handleKeyDown = event => {
        console.log('User pressed: ', event.key);

        // console.log(message);

        if (event.key === 'Backspace') {
            // 👇️ your logic here
            if (mmSlotRef.current.value.length === 0) {
                ddSlotRef.current.focus();
            }
            console.log('Backspace key pressed ✅');
        }
    };

    //> Handle input form Data change_____________________________
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


    //> form logo clicked_____
    const formLogoClicked = () => {
        setLogoComponentShow(true);
    }

    //> Save Btn clicked_______
    const saveBtnClicked = async () => {

        let cardDataToEdit = {};
        switch (formCategory) {
            case "Bank":
                Object.assign(cardDataToEdit, bankCardData);
                break;

            case "Identity":
                Object.assign(cardDataToEdit, identityCardData);
                break;

            case "License":
                Object.assign(cardDataToEdit, licenseCardData);
                break;

            default:
                break;
        }



        let activity_data = await generateActivityData(1, 'Card', cardDataToEdit, '');
        console.log(activity_data);
        await dispatch(addNewCardData({
            data: cardDataToEdit,
            user_id: userId,
            activityData: activity_data
        })).then(res => {
            if (res.type === 'cards/add/fulfilled') {
                // console.log('card added', res.type);
                setShowInputForm(false);
            }
        })

    }


    //> Clearing form on back btn clicked
    const clearForm = () => {
        switch (formCategory) {
            case "Bank":
                setBankCardData({
                    title: "",
                    category: "Bank",
                    cardHolder: "",
                    cardNumber: "",
                    expiry: "",
                    cvv: "",
                    logoIndex: "",
                    isFavourite: false
                })

                break;
            case "Identity":
                setIdentityCardData({
                    title: "",
                    category: "Identity",
                    cardHolder: "",
                    cardNumber: "",
                    issueDate: "",
                    dob: "",
                    logoIndex: "",
                    isFavourite: false
                })
                break;
            case "License":
                setLicenseCardData({
                    title: "",
                    category: ":License",
                    cardHolder: "",
                    licenseNumber: "",
                    expiry: "",
                    dob: "",
                    logoIndex: "",
                    isFavourite: false
                })
                break;

            default:
                break;
        }
        setLogoIndx(undefined);
        setCurrFocusField(undefined);
    }

    const ifLogoSelected = () => {
        if (formCategory === 'Bank') {
            return bankCardData.logoIndex !== "";

        } else if (formCategory === 'Identity') {
            return identityCardData.logoIndex !== "";
        }
        else if (formCategory === 'License') {
            return licenseCardData.logoIndex !== "";
        }
    }

    const toggleDatePicker = (e) => {
        // console.log(e.target.name)
        setShowDatePicker({
            visibility: !showDatePicker.visibility,
            key: e.target.name
        });
    }
    return (
        <div className={showInputForm ? styles.cardWrapper : styles.cardWrapperClose}>

            <DatePicker showDatePicker={showDatePicker} setShowDatePicker={setShowDatePicker} toggleDatePicker={toggleDatePicker}
                handleFormDataChange={handleFormDataChange}
                cardData={formCategory === 'Bank' ? bankCardData : formCategory === 'Identity' ? identityCardData : formCategory === 'License' && licenseCardData}
            />

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
                            onClick={() => {
                                formToggle();
                                clearForm();
                                setPopUpOpen(false);
                            }

                            }>
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.crudBtnContainer} >
                        <div className={styles.saveBtnDiv} onClick={saveBtnClicked}>

                            {
                                isLoading && action === 'add' ?
                                    <Oval
                                        height={`90%`}
                                        width={`90%`}
                                        color="white"
                                        wrapperStyle={spinnerWrapper}
                                        wrapperClass={styles.spinner}
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#E6E6E6"
                                        strokeWidth={5}
                                        strokeWidthSecondary={5}
                                        className={styles.spinner}
                                    />
                                    :
                                    <>
                                        <Icon className={styles.crudIcons} icon="charm:tick-double" color="white" />
                                        <p>Save</p>
                                    </>
                            }

                        </div>
                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >

                    <div className={styles.logoTitleContainer} >

                        <div className={styles.logoContainer} onClick={formLogoClicked} >
                            <div className={`${styles.logoDiv} ${logoIndx !== undefined && styles.logoSelectedBg}`}>
                                {logoIndx !== undefined &&
                                    logosArray[logoIndx].logo
                                }
                            </div>

                        </div>

                        <div className={`${styles.titleContainer} ${(currFocusField === 1) && styles.focusFieldStyle}`} >
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
                                    onFocus={() => onFocus(1)}
                                />
                            </div>
                        </div>


                    </div>

                </div>

                <div className={styles.categoryWrapper} >
                    <div className={`${styles.categoryContainer} ${(currFocusField === 2) && styles.focusFieldStyle}`} >
                        <div className={styles.categoryLabelDiv} >
                            <p>Category</p>
                        </div>
                        <div className={styles.catergoryInputDiv} >
                            <input
                                className={styles.categoryInput}
                                value={formCategory}
                                readOnly={true}
                                onFocus={() => onFocus(2)}
                            />

                            <div className={styles.popUpBtnIconDiv} onClick={() => setPopUpOpen(!popUpOpen)}>
                                <Icon
                                    className={styles.popUpIcon}
                                    icon="tabler:chevron-down" />
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
                        formCategory === "Bank" ? <BankCardSubComponent currFocusField={currFocusField} onFocus={onFocus} bankCardData={bankCardData} setBankCardData={setBankCardData} handleFormDataChange={handleFormDataChange} currCardVender={currCardVender} showDatePicker={showDatePicker} setShowDatePicker={setShowDatePicker} toggleDatePicker={toggleDatePicker} />
                            : formCategory === "Identity" ? <IdentityCardSubComponent currFocusField={currFocusField} onFocus={onFocus} identityCardData={identityCardData} setIdentityCardData={setIdentityCardData} handleFormDataChange={handleFormDataChange} showDatePicker={showDatePicker} setShowDatePicker={setShowDatePicker} toggleDatePicker={toggleDatePicker} />
                                : formCategory === "License" ? <LicenseCardSubComponent currFocusField={currFocusField} onFocus={onFocus} licenseCardData={licenseCardData} setLicenseCardData={licenseCardData} handleFormDataChange={handleFormDataChange} toggleDatePicker={toggleDatePicker} /> : null
                    }

                </div>



            </div>
        </div>
    )
}

export default CardInputForm
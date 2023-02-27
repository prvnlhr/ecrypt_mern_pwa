import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import BackBtnIcon from "../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import { logosArray } from "../logoComponents/logosData"
import LogoComponentWrapper from "../logoComponents/LogoComponentWrapper"
import styles from "./styles/loginIdInputForm.module.css"
import { addNewLoginIdData } from "../../redux/features/loginsId/loginsIdSlice"
import { generateActivityData } from "../utils/ActivityDataChangeFuction"
import { Oval } from "react-loader-spinner"
import { motion } from "framer-motion"

const spinnerWrapper = {
    height: `100%`,
    with: `100%`,
}
const LoginIdInputForm = ({ formToggle, showInputForm, setShowInputForm }) => {


    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);

    const loginIdsState = useSelector((state) => state.loginIds)
    const { isLoading, action } = loginIdsState;

    const [currFocusField, setCurrFocusField] = useState(undefined);
    const onFocus = (val) => {
        setCurrFocusField(val)
    }


    const [formData, setformData] = useState({
        app: "",
        category: "",
        title: "",
        username: "",
        password: "",
        logoIndex: undefined,
    });

    const [popUpOpen, setPopUpOpen] = useState(false);

    const [logoIndx, setLogoIndx] = useState(undefined);

    const [logoComponentShow, setLogoComponentShow] = useState(false);

    const [passVisible, setPassVisible] = useState(false);
    const togglePassVisibility = () => {
        setPassVisible(!passVisible);
    }


    const generatePassword = async () => {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 12;
        let password = "";
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        await setformData({
            ...formData,
            password: password,
        })
    }



    const handleInputValueChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const clearForm = () => {
        setformData({
            id_: "",
            app: "",
            category: "",
            title: "",
            username: "",
            password: "",
            logoIndex: undefined,
        })
        setCurrFocusField(undefined);
    }

    const saveBtnClicked = () => {
        const activity_data = generateActivityData(1, 'Login', formData, '')
        // console.log(activity_data)
        // console.table(formData);
        dispatch(addNewLoginIdData({
            data: formData,
            user_id: userId,
            activityData: activity_data
        })).then(res => {
            console.log(res.type);
            if (res.type === 'loginIds/add/fulfilled') {
                clearForm();
                setShowInputForm(false);
            }
        })
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
        <div className={showInputForm ? styles.cardWrapper : styles.cardWrapperClose}>
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
                            onClick={() => {
                                formToggle();
                                clearForm();
                            }
                            }>
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.crudBtnContainer}   >
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

                    <div className={`${styles.logoTitleContainer}  ${currFocusField === 0 && styles.focusFieldStyle} `} >
                        <div className={styles.logoContainer} onClick={handleLogoClicked} >
                            <div className={styles.logoDiv}>
                                {formData.logoIndex !== undefined &&
                                    logosArray[formData.logoIndex].logo
                                }
                            </div>
                        </div>

                        <div className={`${styles.titleContainer} ${(currFocusField === 1) && styles.focusFieldStyle}`} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleLabelText}>TITLE</p>
                            </div>
                            <div className={styles.titleInputDiv}>
                                <input onChange={handleInputValueChange}
                                    value={formData.title}
                                    name={"title"}
                                    onFocus={() => onFocus(1)}
                                />
                            </div>
                        </div>


                    </div>

                </div>


                <div className={styles.categoryWrapper} >
                    <div className={`${styles.categoryContainer} ${(currFocusField === 2) && styles.focusFieldStyle} `} >
                        <div className={styles.categoryLabelContainer} >
                            <p>Category</p>
                        </div>
                        <div className={styles.catergoryInputDiv} >
                            <input
                                list="websites"
                                className={styles.categoryInput}
                                value={formData.category}
                                onChange={handleInputValueChange}
                                readOnly={true}
                                onFocus={() => onFocus(2)}

                            />
                            <div className={styles.popUpBtnIconDiv}>
                                <Icon
                                    onClick={() =>
                                        setPopUpOpen(!popUpOpen)
                                    }
                                    className={styles.popUpIcon}
                                    icon="tabler:chevron-down" />
                            </div>

                            {
                                popUpOpen ? (
                                    <div className={styles.categoryInputPopDiv}>
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
                    <div className={`${styles.appWebSiteContainer} ${(currFocusField === 3) && styles.focusFieldStyle}`} >
                        <div className={styles.appWebSiteIconDiv} >
                            <Icon
                                className={styles.websiteIcon}
                                icon="tabler:app-window" />
                        </div>
                        <div className={styles.appWebsiteLabelDiv} >
                            <p>App / Website</p>
                        </div>
                        <div className={styles.appWebsiteInputDiv} >
                            <input
                                value={formData.app}
                                onChange={handleInputValueChange}
                                name={"app"}
                                onFocus={() => onFocus(3)}
                            />
                        </div>
                    </div>

                </div>

                <div className={styles.usernameWrapper} >
                    <div className={`${styles.usernameContainer} ${(currFocusField === 4) && styles.focusFieldStyle}`} >
                        <div className={styles.usernameIconDiv} >
                            <Icon
                                className={styles.usernameIcon}
                                icon="prime:user"
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
                                onFocus={() => onFocus(4)}

                            />
                        </div>
                    </div>
                </div>


                <div className={styles.passwordWrapper} >
                    <div className={` ${styles.passwordContainer} ${(currFocusField === 5) && styles.focusFieldStyle}`} >
                        <div className={styles.passwordIconDiv} >
                            <Icon
                                className={styles.passwordIcon}
                                icon="fluent:password-20-regular" /></div>
                        <div className={styles.passwordLabelDiv} >
                            <p>PASSWORD</p>
                        </div>
                        <div className={styles.passwordInputDiv} >
                            <input className={styles.usernameInput}
                                onChange={handleInputValueChange}
                                value={formData.password}
                                name={"password"}
                                onFocus={() => onFocus(5)}
                            />
                            <motion.div
                                className={`${styles.passwordGeneratorIconContainer}`}>
                                <motion.div
                                    className={styles.passwordGeneratorIconDiv}
                                    whileTap={{
                                        rotate: 360,
                                        transition: {
                                            ease: "easeInOut",
                                        }
                                    }}
                                    onClick={generatePassword}
                                >
                                    <svg
                                        className={styles.passGeneratorIcon}
                                        viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#2B3F6C" stroke-width="1.5" />
                                        <circle opacity="0.3" cx="7.25" cy="16.75" r="1.25" fill="#2B3F6C" />
                                        <circle opacity="0.3" cx="7.25" cy="7.25" r="1.25" fill="#2B3F6C" />
                                        <circle opacity="0.3" cx="16.75" cy="16.75" r="1.25" fill="#2B3F6C" />
                                        <circle opacity="0.3" cx="12" cy="12" r="1.25" fill="#2B3F6C" />
                                        <circle opacity="0.3" cx="16.75" cy="7.25" r="1.25" fill="#2B3F6C" />
                                    </svg>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div></div>
            </div>
        </div >
    )
}

export default LoginIdInputForm
import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./styles/fullContentCard.module.css"
import BackBtnIcon from "../icons/BackBtnIcon"
import BookmarksIcon from "../icons/BookmarksIcon"
import BookmarksIconFill from "../icons/BookmarksIconFill"
import { Icon } from '@iconify/react';
import { logosArray } from "../logoComponents/logosData"
import LogoComponentWrapper from "../logoComponents/LogoComponentWrapper"
import { Oval } from 'react-loader-spinner'
import { diff, generateActivityData } from "../utils/ActivityDataChangeFuction"
import { motion } from "framer-motion"

//> Redux
import { editLoginIdData, deleteLoginData, toggleIsFav } from "../../redux/features/loginsId/loginsIdSlice"
import PassGeneratorIcon from '../icons/PassGeneratorIcon';
import EyeIconClose from '../icons/EyeIconClose';
import EyeIconOpen from '../icons/EyeIconOpen';
const spinnerWrapper = {
    height: `100%`,
    with: `100%`,
}
const FullContentCard = ({ fullContentCardData, setFullContentCardData, showContentCard, setShowContentCard, handleFullContentBackBtnClicked, editMode, setEditMode, handleLoginIdClicked,
    setDeleteMode,
    deleteMode,
    currFocusField,
    setCurrFocusField,
    onFocus
}) => {

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);


    const isDarkMode = useSelector((state) => state.ui.darkMode);

    const loginsIdState = useSelector((state => state.loginIds));

    const { isLoading, action } = loginsIdState;

    const [popUpOpen, setPopUpOpen] = useState(false);

    const [logoIndx, setLogoIndx] = useState(undefined);

    const [oldCardData, setOldCardData] = useState('');


    const [passVisible, setPassVisible] = useState(false);
    const togglePassVisibility = () => {
        setPassVisible(!passVisible);
    }



    const [logoComponentShow, setLogoComponentShow] = useState(false);


    useEffect(() => {
        if (logoIndx !== undefined) {
            console.log(fullContentCardData, logoIndx)
            setFullContentCardData({
                ...fullContentCardData,
                logoIndex: logoIndx
            })
        }
    }, [logoIndx])

    const generatePassword = async () => {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 12;
        let password = "";
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        await setFullContentCardData({
            ...fullContentCardData,
            password: password,
        })
    }


    //> Handling Category change field______
    const handleOpClick = (op) => {
        setFullContentCardData({
            ...fullContentCardData,
            category: op
        })
        setPopUpOpen(!popUpOpen)
    }

    //> Handling form logoClicked ______
    const logoclicked = () => {
        if (editMode) {
            setLogoComponentShow(true);
        }
    }

    //> Input val Change_________
    const handleInputValueChange = (e) => {

        setFullContentCardData({
            ...fullContentCardData,
            [e.target.name]: e.target.value,
        })
    }

    //> Edit Btn Cicked__________
    const editBtnClicked = () => {
        setOldCardData(fullContentCardData);
        setEditMode(true);
    }

    //> Cancel Btn clicked______
    const cancelBtnClicked = () => {
        //> setting back oldCardData
        setFullContentCardData(oldCardData);
        setEditMode(false);
        setCurrFocusField(undefined);
        setPassVisible(false);
    }
    //> Save Btn clicked_________
    const saveBtnClicked = () => {
        const activity_data = generateActivityData(3, 'Login', fullContentCardData, oldCardData);
        dispatch(editLoginIdData({
            updatedData: fullContentCardData,
            login_id: fullContentCardData._id,
            activityData: activity_data,
            userId: userId
        })).then(res => {
            if (res.type === 'loginIds/edit/fulfilled') {
                setEditMode(false);
            }
        })

    }
    //> Delete Btn clicked________
    const deleteBtnClicked = () => {
        //> this open delete modal
        setDeleteMode(true);
    }

    //> Handle fav btn Clicked
    const favBtnClicked = () => {
        dispatch(toggleIsFav({
            loginId_id: fullContentCardData._id,
            isFav: !fullContentCardData.isFavourite
        }))
    }
    // __________________________________________________________________________________________________________
    return (
        <div className={
            showContentCard ? styles.cardWrapper : styles.cardWrapperClose
        }>
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
                        ><BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.curdBtnContainer} >

                        {editMode ?
                            <>
                                <div className={styles.saveBtnDiv} onClick={saveBtnClicked}  >

                                    {
                                        isLoading && action === 'edit' ?
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

                                <div className={styles.cancelBtnDiv} onClick={cancelBtnClicked}>
                                    {/* <Icon className={styles.crudIcons} icon="tabler:x" color="#5B5A68" /> */}
                                    <Icon className={styles.crudIcons} icon="tabler:x" color="white" />
                                    <p>Cancel</p>
                                </div>
                            </>
                            :
                            <>

                                {
                                    !deleteMode &&
                                    <div className={styles.deleteBtnDiv} onClick={deleteBtnClicked}  >
                                        {
                                            isLoading && action === 'delete' ?
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
                                                    <Icon className={styles.crudIcons} icon="gg:trash-empty" color="white" />
                                                    <p>Delete</p>
                                                </>
                                        }

                                    </div>
                                }
                                <div className={styles.editBtnDiv} onClick={editBtnClicked}  >
                                    <Icon className={styles.crudIcons} icon="ph:pencil-simple-line" color="#002A9A" />
                                    <p>Edit</p>
                                </div>
                            </>
                        }
                        <div className={styles.favBtnDiv} onClick={favBtnClicked} >

                            {
                                (isLoading === true && action === 'toggleFav') ?
                                    <Oval
                                        height={`80%`}
                                        width={`80%`}
                                        color={isDarkMode ? 'white' : '#002A9A'}
                                        wrapperStyle={spinnerWrapper}
                                        wrapperClass={styles.spinner}
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#E6E6E6"
                                        strokeWidth={5}
                                        strokeWidthSecondary={5}
                                        className={styles.spinner}
                                    /> :
                                    <>
                                        {
                                            fullContentCardData && fullContentCardData?.isFavourite === true ?
                                                < BookmarksIconFill />
                                                :
                                                <BookmarksIcon />
                                        }
                                    </>
                            }
                        </div>

                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >

                    <div
                        onFocus={() => onFocus(1)}
                        className={`${styles.logoTitleContainer} ${currFocusField === 0 && styles.focusFieldStyle} `} >
                        <div className={styles.logoContainer} onClick={logoclicked} >
                            <div className={
                                `${styles.logoDiv} ${editMode && styles.logoDivActive}`
                            }>
                                {fullContentCardData?.logoIndex !== undefined &&
                                    logosArray[fullContentCardData.logoIndex].logo
                                }
                            </div>
                            {/* </div> */}
                        </div>

                        <div className={`${styles.titleContainer} ${(currFocusField === 1 && editMode) && styles.focusFieldStyle}`} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleInputDiv}>
                                <input
                                    className={editMode ? styles.titleInputActive : styles.titleInputNotActive}
                                    value={fullContentCardData?.title}
                                    name={"title"}
                                    onChange={handleInputValueChange}
                                    onFocus={() => onFocus(1)}
                                    readOnly={editMode ? false : true} />
                            </div>
                        </div>


                    </div>

                </div>


                <div className={styles.categoryWrapper} >
                    <div className={`${styles.categoryContainer} ${(currFocusField === 2 && editMode) && styles.focusFieldStyle} `} >
                        <div className={styles.categoryLabelDiv} >
                            <p>Category</p>
                        </div>
                        <div className={styles.catergoryInputDiv} >
                            <input
                                list="websites"
                                className={styles.categoryInput}
                                value={fullContentCardData?.category}
                                readOnly={editMode ? false : true}
                                onFocus={() => onFocus(2)}

                            />
                            <div className={styles.popUpBtnIconDiv}>
                                {editMode &&
                                    <Icon onClick={() => setPopUpOpen(!popUpOpen)}
                                        className={styles.popUpIcon}
                                        icon="tabler:chevron-down" color="black"
                                    />
                                }
                            </div>

                            {
                                popUpOpen ? (
                                    <div className={styles.inputPopUpDiv}>
                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Finance")
                                        }}>Finance</p>

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
                    <div className={`${styles.appWebSiteContainer} ${(currFocusField === 3 && editMode) && styles.focusFieldStyle}`} >
                        <div className={styles.appWebSiteIconDiv} >
                            <Icon
                                className={styles.websiteIcon}
                                icon="tabler:app-window" />
                        </div>
                        <div className={styles.appWebsiteLabelDiv} >
                            <p>App / Website</p>
                        </div>
                        <div className={styles.appWebSiteInputDiv} >
                            <input
                                className={editMode ? styles.appWebSiteInputActive : styles.appWebSiteInputNotActive}
                                value={fullContentCardData?.app} readOnly={editMode ? false : true}
                                name={"app"}
                                onChange={handleInputValueChange}
                                onFocus={() => onFocus(3)}
                            />
                        </div>
                    </div>

                </div>

                <div className={styles.usernameWrapper} >
                    <div className={`${styles.usernameContainer} ${(currFocusField === 4 && editMode) && styles.focusFieldStyle}`} >
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
                            <input
                                className={
                                    // styles.userNameInputNotActive
                                    editMode ? styles.userNameInputActive : styles.userNameInputNotActive
                                }
                                value={fullContentCardData?.username} readOnly={editMode ? false : true}
                                name={"username"}
                                onChange={handleInputValueChange}
                                onFocus={() => onFocus(4)}
                            />
                        </div>
                    </div>
                </div>


                <div className={styles.passwordWrapper} >
                    <div className={` ${styles.passwordContainer} ${(currFocusField === 5 && editMode) && styles.focusFieldStyle}`} >
                        <div className={styles.passwordIconDiv} >
                            <Icon
                                className={styles.passwordIcon}
                                icon="fluent:password-20-regular" />
                        </div>
                        <div className={styles.passwordLabelDiv} >
                            <p>PASSWORD</p>
                        </div>

                        <div className={styles.passwordInputDiv} >
                            <input
                                className={`${styles.passwordInput} ${editMode && styles.passInputEditMode} `}
                                name={"password"}
                                onFocus={() => onFocus(5)}
                                onChange={handleInputValueChange}
                                type={(passVisible || editMode) ? "text" : "password"}
                                value={fullContentCardData?.password} readOnly={editMode ? false : true} />

                            <div className={` ${styles.passwordVisibilityIconDiv}  ${editMode && styles.passwordVisibilityIconDivEditMode}`} >
                                {(passVisible || editMode) ?
                                    <EyeIconClose styles={styles} togglePassVisibility={togglePassVisibility} />

                                    :
                                    <EyeIconOpen styles={styles} togglePassVisibility={togglePassVisibility} />

                                }

                            </div>

                            <motion.div
                                className={`${styles.passwordGeneratorIconContainer} ${editMode && styles.passwordGeneratorIconContainerEditMode}`}>
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
                                    <PassGeneratorIcon styles={styles} />

                                </motion.div>
                            </motion.div>

                        </div>
                    </div></div>
            </div>
        </div >

    )
}

export default FullContentCard

{/* <svg
                                        //  width="24" height="24" 
                                        className={styles.passGeneratorIcon}
                                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#5294E2" stroke-width="1.5" />
                                        <circle cx="7.25" cy="16.75" r="1.25" fill="#4D6090" />
                                        <circle cx="7.25" cy="7.25" r="1.25" fill="#4D6090" />
                                        <circle cx="16.75" cy="16.75" r="1.25" fill="#4D6090" />
                                        <circle cx="12" cy="12" r="1.25" fill="#4D6090" />
                                        <circle cx="16.75" cy="7.25" r="1.25" fill="#4D6090" />
                                    </svg> */}


{/* <svg
                                        className={styles.passGeneratorIcon}
                                        viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#2B3F6C" stroke-width="1.5" />
                                        <circle opacity="0.3" cx="7.25" cy="16.75" r="1.25" fill="#2B3F6C" />
                                        <circle opacity="0.3" cx="7.25" cy="7.25" r="1.25" fill="#2B3F6C" />
                                        <circle opacity="0.3" cx="16.75" cy="16.75" r="1.25" fill="#2B3F6C" />
                                        <circle opacity="0.3" cx="12" cy="12" r="1.25" fill="#2B3F6C" />
                                        <circle opacity="0.3" cx="16.75" cy="7.25" r="1.25" fill="#2B3F6C" />
                                    </svg> */}

                                       // <svg
                                    //     className={styles.passVisibilityIcon}
                                    //     //  width="24" height="24"
                                    //     onClick={togglePassVisibility}
                                    //     viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    //     <path d="M3.20057 12.7844C2.93314 12.2954 2.93314 11.7045 3.20058 11.2154C4.9 8.10803 8.20336 6 12 6C15.7966 6 19.1 8.10809 20.7994 11.2156C21.0669 11.7046 21.0669 12.2956 20.7994 12.7846C19.1 15.892 15.7966 18 12 18C8.20336 18 4.89997 15.8919 3.20057 12.7844Z" stroke="#5294E2" stroke-width="1.5" />
                                    //     <circle cx="12" cy="12" r="3" stroke="#4D6090" stroke-width="1.5" />
                                    // </svg>
                                    // <svg
                                    //     className={styles.passVisibilityIcon}
                                    //     onClick={togglePassVisibility}
                                    //     viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    //     <path d="M3.20057 12.7844C2.93314 12.2954 2.93314 11.7045 3.20058 11.2154C4.9 8.10803 8.20336 6 12 6C15.7966 6 19.1 8.10809 20.7994 11.2156C21.0669 11.7046 21.0669 12.2956 20.7994 12.7846C19.1 15.892 15.7966 18 12 18C8.20336 18 4.89997 15.8919 3.20057 12.7844Z" stroke="#2B3F6C" stroke-width="1.5" />
                                    //     <circle opacity="0.3" cx="12" cy="12" r="3" stroke="#2B3F6C" stroke-width="1.5" />
                                    // </svg>

                                            // <svg
                                    //     className={styles.passVisibilityIcon}
                                    //     onClick={togglePassVisibility}
                                    //     viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    //     <path d="M19.4644 4.46436L4.46436 19.4644" stroke="#4D6090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    //     <path fill-rule="evenodd" clip-rule="evenodd" d="M5.9642 16.9036C5.60982 16.6638 5.27058 16.4034 4.94816 16.1243C3.97944 15.2857 3.16202 14.2769 2.54254 13.1442C2.15248 12.4309 2.15249 11.5687 2.54256 10.8555C4.36847 7.51674 7.91882 5.24988 12 5.24988C12.9668 5.24988 13.905 5.37727 14.7981 5.61657C15.4207 5.78339 16.0209 6.00447 16.5934 6.27439L15.4543 7.41348C15.1156 7.27761 14.767 7.16115 14.4099 7.06546C13.6423 6.85978 12.8346 6.74988 12 6.74988C8.4879 6.74988 5.43153 8.69907 3.8586 11.5752C3.7138 11.84 3.7138 12.1597 3.8586 12.4244C4.38561 13.3881 5.07974 14.2484 5.9023 14.9662L7.07499 15.7928L5.9642 16.9036ZM19.5236 8.30894C19.227 8.01977 18.7522 8.02577 18.463 8.32234C18.1738 8.61891 18.1798 9.09375 18.4764 9.38292C19.1347 10.0248 19.6974 10.7633 20.1414 11.5753C20.2862 11.8401 20.2862 12.1598 20.1414 12.4246C18.5685 15.3007 15.5121 17.2499 12 17.2499C11.2002 17.2499 10.4251 17.1489 9.68628 16.9595C9.28505 16.8566 8.87638 17.0985 8.7735 17.4997C8.67062 17.901 8.91249 18.3096 9.31372 18.4125C10.1732 18.6329 11.0735 18.7499 12 18.7499C16.0812 18.7499 19.6315 16.483 21.4574 13.1443C21.8475 12.4311 21.8475 11.5689 21.4575 10.8556C20.9413 9.91167 20.2876 9.05391 19.5236 8.30894Z" fill="#5294E2" />
                                    //     <path d="M9 12C9 10.3431 10.3431 9 12 9" stroke="#4D6090" stroke-width="1.5" stroke-linecap="round" />
                                    // </svg>

                                    // <svg
                                    //     className={styles.passVisibilityIcon}
                                    //     onClick={togglePassVisibility}
                                    //     viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    //     <path opacity="0.3" d="M19.4644 4.46436L4.46436 19.4644" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    //     <path fill-rule="evenodd" clip-rule="evenodd" d="M5.9642 16.9037C5.60982 16.6639 5.27058 16.4036 4.94816 16.1244C3.97944 15.2858 3.16202 14.2771 2.54254 13.1443C2.15248 12.431 2.15249 11.5688 2.54256 10.8556C4.36847 7.51686 7.91882 5.25 12 5.25C12.9668 5.25 13.905 5.37739 14.7981 5.6167C15.4207 5.78351 16.0209 6.0046 16.5934 6.27451L15.4543 7.4136C15.1156 7.27773 14.767 7.16127 14.4099 7.06559C13.6423 6.85991 12.8346 6.75 12 6.75C8.4879 6.75 5.43153 8.69919 3.8586 11.5753C3.7138 11.8401 3.7138 12.1598 3.8586 12.4246C4.38561 13.3883 5.07974 14.2485 5.9023 14.9663L7.07499 15.7929L5.9642 16.9037ZM19.5236 8.30907C19.227 8.0199 18.7522 8.0259 18.463 8.32247C18.1738 8.61904 18.1798 9.09387 18.4764 9.38304C19.1347 10.0249 19.6974 10.7635 20.1414 11.5754C20.2862 11.8402 20.2862 12.1599 20.1414 12.4247C18.5685 15.3008 15.5121 17.25 12 17.25C11.2002 17.25 10.4251 17.1491 9.68628 16.9596C9.28505 16.8567 8.87638 17.0986 8.7735 17.4998C8.67062 17.9011 8.91249 18.3097 9.31372 18.4126C10.1732 18.633 11.0735 18.75 12 18.75C16.0812 18.75 19.6315 16.4831 21.4574 13.1444C21.8475 12.4312 21.8475 11.569 21.4575 10.8557C20.9413 9.91179 20.2876 9.05403 19.5236 8.30907Z" fill="#2B3F6C" />
                                    //     <path opacity="0.3" d="M9 12C9 10.3431 10.3431 9 12 9" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                                    // </svg>
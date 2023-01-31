import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./styles/fullContentCard.module.css"
import BackBtnIcon from "../icons/BackBtnIcon"
import BookmarksIcon from "../icons/BookmarksIcon"
import BookmarksIconFill from "../icons/BookmarksIconFill"
import { Icon } from '@iconify/react';
import moment from "moment";

import { logosArray } from "../logoComponents/logosData"
import LogoComponentWrapper from "../logoComponents/LogoComponentWrapper"
import { useSelector } from 'react-redux';

import { diff, generateActivityData } from "../utils/ActivityDataChangeFuction"

//> Redux
import { editLoginIdData, deleteLoginData, toggleIsFav } from "../../redux/features/loginsId/loginsIdSlice"

const FullContentCard = ({ fullContentCardData, setFullContentCardData, showContentCard, setShowContentCard, handleFullContentBackBtnClicked, editMode, setEditMode, handleLoginIdClicked,
    setDeleteMode,
    deleteMode
}) => {

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const [currFocusField, setCurrFocusField] = useState(undefined);
    const onFocus = (val) => {
        setCurrFocusField(val)
    }


    const [popUpOpen, setPopUpOpen] = useState(false);

    const [logoIndx, setLogoIndx] = useState(undefined);

    const [oldCardData, setOldCardData] = useState('');


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
    }
    //> Save Btn clicked_________
    const saveBtnClicked = () => {
        const activity_data = generateActivityData(3, 'Login', fullContentCardData, oldCardData);

        console.log(activity_data)
        dispatch(editLoginIdData({
            updatedData: fullContentCardData,
            login_id: fullContentCardData._id,
            activityData: activity_data,
            userId: userId
        }))
        // setShowContentCard(false);
        setEditMode(false);

    }
    //> Delete Btn clicked________
    const deleteBtnClicked = () => {
        //> this open delete modal
        setDeleteMode(true);
    }

    //> Handle fav btn Clicked
    const favBtnClicked = () => {
        // console.log(fullContentCardData.isFavourite)
        dispatch(toggleIsFav({
            loginId_id: fullContentCardData._id,
            isFav: !fullContentCardData.isFavourite
        }))
    }
    // __________________________________________________________________________________________________________
    return (
        <div className={
            // styles.cardWrapper
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
                                    <Icon className={styles.crudIcons} icon="charm:tick-double" color="white" />
                                    <p>Save</p>
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
                                        <Icon className={styles.crudIcons} icon="gg:trash-empty" color="white" />
                                        <p>Delete</p>
                                    </div>
                                }
                                <div className={styles.editBtnDiv} onClick={editBtnClicked}  >
                                    <Icon className={styles.crudIcons} icon="ph:pencil-simple-line" color="#002A9A" />
                                    <p>Edit</p>
                                </div>
                            </>
                        }
                        <div className={styles.favBtnDiv} onClick={favBtnClicked} >

                            {fullContentCardData.isFavourite === true ?
                                < BookmarksIconFill />
                                :
                                <BookmarksIcon />
                            }
                        </div>

                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >

                    <div
                        onFocus={() => onFocus(1)}
                        className={`${styles.logoTitleContainer} ${currFocusField === 0 && styles.focusFieldStyle} `} >
                        <div className={styles.logoContainer} onClick={logoclicked} >
                            <div className={styles.logoDiv}>
                                <div className={
                                    editMode ? styles.logoDivActive : styles.logoDiv
                                }>
                                    {fullContentCardData.logoIndex != undefined &&
                                        logosArray[fullContentCardData.logoIndex].logo
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.titleContainer} ${(currFocusField === 1 && editMode) && styles.focusFieldStyle}`} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleInputDiv}>
                                <input
                                    className={editMode ? styles.titleInputActive : styles.titleInputNotActive}
                                    value={fullContentCardData.title}
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
                                value={fullContentCardData.category}
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
                                value={fullContentCardData.app} readOnly={editMode ? false : true}
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
                                className={editMode ? styles.userNameInputActive : styles.userNameInputNotActive}
                                value={fullContentCardData.username} readOnly={editMode ? false : true}
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
                            <input className={editMode ? styles.passwordInputActive : styles.passwordInputNotActive}
                                name={"password"}
                                onFocus={() => onFocus(5)}
                                onChange={handleInputValueChange}
                                value={fullContentCardData.password} readOnly={editMode ? false : true} />
                        </div>
                    </div></div>
            </div>
        </div>

    )
}

export default FullContentCard
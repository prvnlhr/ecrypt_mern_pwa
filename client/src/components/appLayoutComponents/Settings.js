import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import styles from "./styles/settingsComponent.module.css";
import { Icon } from '@iconify/react';
import DeleteModal from "../modal/DeleteModal"
import { validateChangePassForm } from "../authComponent/helperFunctions/formValidation"
import { editUserProfile, changeUserPass } from "../../redux/features/user/userSlice"
import axios from "axios";
import { changeProfilePicture } from "../../redux/features/user/userSlice"
import { Oval } from 'react-loader-spinner'
import { SpinnerCircular } from 'spinners-react';

const spinnerStyle = {
    position: `absolute`,
    width: `112%`,
    height: `112%`,
}

const spinnerStyleBtn = {
    position: `relative`,
    width: `100%`,
    height: `100%`,
}
const spinnerWrapper = {
    height: `100%`,
    with: `100%`,
}
const Settings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();



    //> USESTATES________________________________________________________
    const authState = useSelector((state => state.auth));
    const userState = useSelector((state => state.user));
    const isDarkMode = useSelector((state) => state.ui.darkMode);

    // useEffect(() => {
    //     console.log(useState.action, useState.pending);
    // }, [useState.action])

    //> Profile Pic
    const [profilePicImg, setProfilePicImg] = useState(undefined);
    const [oldProfilePic, setOldProfilePic] = useState(undefined);

    //> form Mesaage && error
    const [formMessage, setFormMessage] = useState({
        message: undefined,
        error: false
    });
    const { message, error } = formMessage;

    //> field Focus
    const [currFocusField, setCurrFocusField] = useState(undefined);
    const [deleteMode, setDeleteMode] = useState(false);

    //> Edit mode
    const [editMode, setEditMode] = useState({
        isEditMode: false,
        section: undefined
    });

    //> profile data
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [oldProfileData, setOldProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    })

    //> Password Data
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        oldPassword: '',
    });

    //> _USE_EFFECTS________________________________________________________
    useEffect(() => {
        setProfileData({
            ...profileData,
            firstName: userState.firstName,
            lastName: userState.lastName,
            email: userState.email,
            updateDate: userState.updateDate
        })
    }, [userState.firstName, userState.lastName, userState.email, userState.updateDate])

    useEffect(() => {
        setProfilePicImg(userState?.profilePic.picUrl);
        return () => {
            setFormMessage({
                error: false,
                message: '',
            })
        }
    }, [userState.profilePic])


    //**---------------CLICKED HANDLERS_________________________________________

    const handleProfileInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleDeleteBtnClicked = () => {
        setDeleteMode(true);
    }

    const onFocus = (val) => {
        setCurrFocusField(val)
    }

    const formFieldEditable = (SECTION) => {
        const { isEditMode, section } = editMode;
        return (isEditMode && section === SECTION);
    }

    // > _HANDLE SAVE BUTTON CLICKED________________________________________________________________________________________________________
    const handleSaveBtnClicked = async (SECTION) => {

        if (SECTION === 'PASS') {   //> PASSWORD SECTION__________________________________________________
            const res = validateChangePassForm({ password: passwordData.oldPassword, newPassword: passwordData.newPassword });
            if (res.error) {
                setFormMessage({
                    message: res.message,
                    error: res.error
                })
                return;
            }
            else {
                setFormMessage({
                    message: undefined,
                    error: false
                })

                await dispatch(changeUserPass({
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword,
                    token: authState.token
                })).then((res) => {
                    if (res.type === 'user/changeProfilePass/fulfilled') {
                        console.log(res);
                        setFormMessage({
                            ...formMessage,
                            message: res?.payload,
                            error: false
                        })
                        setEditMode({
                            isEditMode: false,
                            section: undefined,
                        })
                    } else if (res.type === 'user/changeProfilePass/rejected') {
                        setFormMessage({
                            ...formMessage,
                            message: res?.payload,
                            error: true
                        })
                    }
                })
            }

            // > _________________________________________________________________________________________________________
        } else if (SECTION === 'PROFILE') {   //> PROFILE SECTION_____________________________________________

            await dispatch(editUserProfile({
                token: authState.token,
                profileData: profileData,
            })).then((res) => {
                if (res.type === 'user/editProfile/fulfilled') {

                    setEditMode({
                        isEditMode: false,
                        section: undefined,
                    })
                    // console.log(res.payload.msg);
                    setFormMessage({
                        ...formMessage,
                        message: res?.payload.msg,
                        error: false
                    })
                    setCurrFocusField(undefined);
                } else if (res.type === 'user/editProfile/rejected') {
                    setFormMessage({
                        ...formMessage,
                        message: res?.payload.msg,
                        error: true
                    })
                }
            })
        }
    }

    // > __HANDLE EDIT BUTTON CLICLKED, HANDLE CHANGE PASS BTN CLCIKED________________________________________________________
    const handleEditChangeDeleteBtnClicked = (currSection) => {

        setEditMode({
            isEditMode: true,
            section: currSection
        })

        if (currSection === 'PROFILE') {
            setCurrFocusField(1);
            setOldProfileData({
                ...oldProfileData,
                firstName: userState.firstName,
                lastName: userState.lastName,
                email: userState.email,
                updateDate: userState.updateDate
            })

        } else if (currSection === 'PASS') {
            setCurrFocusField(4);
        }
        else if (currSection === 'PROFILEPIC') {
            setOldProfilePic(userState.profilePic.picUrl)
        }
    }

    //> __HANDLE PASSWORD  INPUT CHANGE______________________________________________
    const handlePassInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    //> __HANDLE CANCEL  BUTTON CLICKED________________________________________________
    const handleCancelBtnClicked = () => {

        if (editMode.section === 'PASS') {
            setPasswordData({
                newPassword: '',
                oldPassword: '',
            })
        }
        setEditMode({
            isEditMode: false,
            section: undefined,
        })

        //> Image, SECTION == PROFILEPIC, reverting back old Profile Pic
        if (editMode.section === 'PROFILEPIC') {
            setProfilePicImg(oldProfilePic);
        }

        if (editMode.section === 'PROFILE') {
            setProfileData(oldProfileData);
        }
        setCurrFocusField(undefined);
        setFormMessage({
            error: false,
            message: ""
        })
    }



    //> ___PROFILE PIC SECTION_________________________________________________
    const [file, setFile] = useState();

    const previewFile = (file) => {
        // console.log(file)
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = () => {
            setProfilePicImg(reader.result);
        };
    };

    const confirmEditProfilePic = async () => {
        // console.log("confirm pic change")

        const data = new FormData();
        data.append("userId", userState?._id);
        data.append("name", 'avatar');
        data.append("file", file);

        // for (var pair of data.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        axios
            .post("https://httpbin.org/anything", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        await dispatch(changeProfilePicture({
            data: data,
            token: authState?.token,

        })).then((res) => {
            console.log(res);
            if (res.type === 'user/changeProfilePic/fulfilled') {
                setEditMode({
                    isEditMode: false,
                    section: undefined,
                })
                setFormMessage({
                    error: false,
                    message: userState?.responseMessage
                })
            } else if (res.type === 'user/changeProfilePic/rejected') {
                setFormMessage({
                    error: true,
                    message: userState?.responseMessage
                })
            }

        })

    }

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        previewFile(file);
    };

    //> handle confirm Delete_________________________________
    const confirmDeleteBtnClicked = () => {
    }

    //> _______________________________________________

    return (
        <div className={styles.SetttingsComponent}>

            <DeleteModal
                setDeleteMode={setDeleteMode}
                deleteMode={deleteMode}
                confirmDeleteBtnClicked={confirmDeleteBtnClicked}
                modalStyles={styles}
            />

            <div className={styles.profilePicSection} >
                <div className={styles.headingWrapper} >
                    <div className={styles.headingContainer}  >
                        <div className={styles.backBtnDiv} onClick={() => navigate(-1)}>
                            <Icon className={styles.backBtnIcon} icon="material-symbols:keyboard-arrow-up-rounded" rotate={3} />
                        </div>
                        <div className={styles.headingDiv}>
                            <p>Settings</p>
                        </div>
                    </div>
                </div>
                <div className={styles.profilePicWrapper} >
                    <form className={styles.profilePicformTag}>
                        <div
                            className={
                                `${styles.profilePicContainer}
                         ${(formFieldEditable('PROFILEPIC') && userState?.pending === false) && styles.profilePicformTagEditMode} `}>

                            {userState?.pending === true && userState.action === 'editProfilePic' &&
                                <SpinnerCircular style={spinnerStyle} thickness={50} speed={100} color="rgba(199, 186, 253, 1)" secondaryColor={isDarkMode === true ? "#2F343E" : "#D6D6D6"} />
                            }
                            <label htmlFor="file">
                                <img src={profilePicImg} />
                            </label>

                            <input
                                type="file"
                                id="file"
                                onChange={handleProfilePicChange}
                                className={styles.imgFileInput}
                                disabled={!formFieldEditable('PROFILEPIC')}
                            />
                        </div>

                        <div className={styles.profilePicEditBtnContainer} >
                            {formFieldEditable('PROFILEPIC') ?
                                <>
                                    <div className={styles.iconDivSave} onClick={confirmEditProfilePic} >
                                        <Icon className={styles.profilePicCancelIcon} icon="charm:tick-double" />
                                    </div>
                                    <div className={styles.iconDivCancel} onClick={handleCancelBtnClicked} >
                                        <Icon className={styles.profilePicSaveIcon} icon="ph:x-bold" />
                                    </div>
                                </>
                                :
                                <div className={styles.iconDivEdit} onClick={() => handleEditChangeDeleteBtnClicked('PROFILEPIC')} >
                                    <Icon className={styles.profilePicEditIcon} icon="ph:pencil-simple-line-light" />
                                </div>
                            }

                        </div>
                    </form>
                </div>


                <div className={styles.joinedUpdateDateWrapper} >

                    <div className={styles.joinedUpadateDateContainer} >
                        <div className={styles.joinedDateDiv} >
                            <p className={styles.joinedDateLabelText}>Joined</p>
                            <p className={styles.joinedDateText}>{userState.joinedDate}</p>
                        </div>
                        <div className={styles.updatedDateDiv} >
                            <p className={styles.joinedDateLabelText}>Last Updated</p>
                            <p className={styles.joinedDateText}>{profileData.updateDate}</p>
                        </div>
                    </div>

                </div>

            </div>

            <div className={styles.profileFormSection} >
                <div className={styles.formWrapper}>
                    <div className={styles.formMessageWrapper} >
                        {
                            message &&
                            <div className={`${styles.messageDiv} ${error ? styles.messageDivError : styles.messageDivSuccess}`} >
                                {
                                    error &&
                                    <div className={styles.errorMessageIconDiv} >
                                        <Icon className={styles.warningIconMsg} icon="ph:warning" />
                                    </div>
                                }
                                <p>{formMessage.message}
                                </p>
                            </div>
                        }


                        {/* {(userState.responseMessage || message) &&
                            <div className={`${styles.messageDiv} ${(error || userState.error) ? styles.messageDivError : styles.messageDivSuccess}`} >
                                {
                                    (error || userState.error) &&
                                    <div className={styles.errorMessageIconDiv} >
                                        <Icon className={styles.warningIcon} icon="ph:warning" />
                                    </div>
                                }
                                <p>{
                                    formMessage.message !== undefined ? formMessage.message
                                        : userState.responseMessage !== undefined && userState.responseMessage
                                }</p>
                            </div>
                        } */}


                    </div>

                    <div className={styles.profileNameWrapper} >
                        <div className={styles.profileHeadingContainer} >
                            <div className={styles.formSectionHeadingDiv} >
                                <p>Profile</p>
                            </div>
                        </div>
                        <div className={styles.profileFirstNameContainer} >
                            <div className={`${styles.profileFirstNameDiv} ${currFocusField === 1 && styles.focusFieldStyle}`} >
                                <div className={styles.nameLabelDiv}>
                                    <p>FIRST NAME</p>
                                </div>
                                <div className={styles.nameInputDiv}>
                                    <input
                                        name='firstName'
                                        className={`${styles.nameInput}  ${styles.nameInputText}`}
                                        value={profileData.firstName}
                                        onChange={handleProfileInputChange}
                                        disabled={!formFieldEditable('PROFILE')}
                                        onFocus={() => onFocus(1)} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.profileLastNameContainer} >
                            <div className={`${styles.profileLastNameDiv} ${currFocusField === 2 && styles.focusFieldStyle}`} >
                                <div className={styles.nameLabelDiv}>
                                    <p>LAST NAME</p>
                                </div>
                                <div className={styles.nameInputDiv}>
                                    <input
                                        value={profileData.lastName}
                                        className={`${styles.nameInput}  ${styles.nameInputText}`}
                                        name='lastName'
                                        onChange={handleProfileInputChange}
                                        disabled={!formFieldEditable('PROFILE')}
                                        onFocus={() => onFocus(2)} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.profileEmailNameContainer} >
                            <div className={`${styles.profileEmailNameDiv} ${currFocusField === 3 && styles.focusFieldStyle}`} >
                                <div className={`${styles.emailLabelDiv}`}>
                                    <p>
                                        EMAIL ADDRESS
                                    </p>
                                </div>
                                <div className={styles.emailInputDiv}>
                                    <input
                                        disabled={true}
                                        className={`${styles.emailInput} ${styles.emailInputText}`}
                                        value={profileData.email} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.profileEditBtnContainer} >

                            {
                                formFieldEditable('PROFILE') ?
                                    <>
                                        <button className={`${styles.formBtnCancelProfile} ${styles.formBtnCommon} `} onClick={handleCancelBtnClicked}>
                                            <p className={styles.btnText} >
                                                Cancel
                                            </p>
                                        </button>
                                        <button className={`${styles.formBtnSaveProfile}   ${styles.formBtnCommon} `} onClick={() => handleSaveBtnClicked('PROFILE')}>
                                            {
                                                (userState.action === 'editProfile' && userState.pending === true) ?
                                                    <SpinnerCircular style={spinnerStyleBtn} thickness={200} speed={100} color="white" secondaryColor="#7AC87F" />
                                                    :
                                                    <p className={styles.btnText} >
                                                        Save
                                                    </p>
                                            }
                                        </button>
                                    </>
                                    :
                                    <button className={`${styles.formBtnEditProfile} ${styles.formBtnCommon} `} onClick={() => handleEditChangeDeleteBtnClicked("PROFILE")}>
                                        <p className={styles.btnText} >
                                            Edit  Profile
                                        </p>
                                    </button>
                            }

                        </div>
                    </div>
                    <div className={styles.profilePassWrapper}>

                        <div className={styles.passHeadingContainer} >
                            <div className={styles.formSectionHeadingDiv}>
                                <p>Password</p>
                            </div>
                        </div>

                        <div className={formFieldEditable('PASS') ? styles.passFieldWrapperOpen : styles.passFieldWrapperClose} >
                            <div className={`${styles.passOldInputContainer}  ${currFocusField === 4 && styles.focusFieldStyle}`} >
                                <div className={styles.passInputDiv}>
                                    <input className={`${styles.passInputField}  ${styles.passInputFieldText}`} name='oldPassword' onChange={handlePassInputChange} placeholder='New Password' onFocus={() => onFocus(4)} value={passwordData.oldPassword} autoComplete={false} />
                                </div>
                            </div>

                            <div className={`${styles.passNewInputContainer}  ${currFocusField === 5 && styles.focusFieldStyle}`} >
                                <div className={styles.passInputDiv}>
                                    <input className={`${styles.passInputField}  ${styles.passInputFieldText}`} name='newPassword' onChange={handlePassInputChange} placeholder='Confirm Password' onFocus={() => onFocus(5)} value={passwordData.newPassword} autoComplete={false} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.passChangeBtnContainer} >

                            {
                                formFieldEditable('PASS') ?
                                    <>
                                        <button className={`${styles.formBtnCancelPass} ${styles.formBtnCommon} `} onClick={handleCancelBtnClicked} >
                                            <p className={styles.btnText}>
                                                Cancel
                                            </p>
                                        </button>
                                        <button className={`${styles.formBtnSavePass} ${styles.formBtnCommon} `} onClick={() => handleSaveBtnClicked('PASS')} >
                                            {
                                                (userState.action === 'changePass' && userState.pending === true) ?
                                                    <SpinnerCircular style={spinnerStyleBtn} thickness={200} speed={100} color="white" secondaryColor="#7AC87F" />
                                                    :
                                                    <p className={styles.btnText} >
                                                        Confirm
                                                    </p>
                                            }

                                        </button>
                                    </>
                                    :
                                    <button className={`${styles.formBtnEditPass} ${styles.formBtnCommon} `} onClick={() => handleEditChangeDeleteBtnClicked("PASS")} >
                                        <p className={styles.btnText}>
                                            Change Password
                                        </p>
                                    </button>
                            }
                        </div>
                    </div>
                    <div className={styles.profileDeleteWrapper}>
                        <div className={styles.deleteHeadingContainer} >
                            <div className={styles.formSectionHeadingDiv} >
                                <p>Delete Account</p>
                            </div>
                        </div>
                        <div className={styles.deleteMsgContainer} >

                            <div className={styles.text1Container} >
                                <div className={styles.textIconDiv} >
                                    {/* <Icon className={styles.text1Icon} icon="icon-park-outline:caution" /> */}
                                    <Icon className={styles.warningIconDelete} icon="ph:warning" />

                                </div>
                                <p>Delete account permanently</p>
                            </div>
                            <div className={styles.text2Container} >
                                <div className={styles.textIconDiv} >
                                    <Icon className={styles.dotIcon} icon="ci:dot-03-m" />
                                </div>
                                <p>Deleting account will delete your profile and
                                    all the associated data.
                                </p>
                            </div>
                            <div className={styles.text3Container} >
                                <div className={styles.textIconDiv} >
                                    <Icon className={styles.dotIcon} icon="ci:dot-03-m" />
                                </div>
                                <p>You will be logged out after deleting the
                                    account.
                                </p>
                            </div>

                        </div>
                        <div className={styles.deleteBtnContainer} >
                            <button className={`${styles.formBtnDelete} ${styles.formBtnCommon}`} onClick={handleDeleteBtnClicked}>
                                <p className={styles.btnText}>
                                    Delete Account
                                </p>
                            </button>
                        </div>

                    </div>

                </div>

            </div>



        </div >
    )
}

export default Settings
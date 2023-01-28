import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import styles from "./styles/settingsComponent.module.css";
import { Icon } from '@iconify/react';
import DeleteModal from "../modal/DeleteModal"
import { validateChangePassForm } from "../authComponent/helperFunctions/formValidation"
import { editUserProfile, changeUserPass } from "../../redux/features/user/userSlice"
import axios from "axios";
import avatarImg from "../../img/avatarImg.png"
const Settings = () => {

    const dispatch = useDispatch();

    const authState = useSelector((state => state.auth));
    const userState = useSelector((state => state.user));



    //> Profile Pic
    const [profilePicImg, setProfilePicImg] = useState(undefined);
    const [oldProfilePic, setOldProfilePic] = useState(undefined);

    const [formMessage, setFormMessage] = useState({
        message: undefined,
        error: false
    });

    const { message, error } = formMessage;

    const [currFocusField, setCurrFocusField] = useState(undefined);
    const [deleteMode, setDeleteMode] = useState(false);

    const [editMode, setEditMode] = useState({
        isEditMode: false,
        section: undefined
    });

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        setProfileData({
            ...profileData,
            firstName: userState.firstName,
            lastName: userState.lastName,
            email: userState.email


        })
        setProfilePicImg(avatarImg);
    }, [userState])


    const [passwordData, setPasswordData] = useState({
        newPassword: undefined,
        oldPassword: undefined,
    });


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

    const handleSaveBtnClicked = async (SECTION) => {

        if (SECTION === 'PASS') {
            const res = validateChangePassForm({ password: passwordData.oldPassword, newPassword: passwordData.newPassword });
            console.log(res);
            if (res.error) {
                setFormMessage({
                    message: res.message,
                    error: res.error
                })
                console.log('error');
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
                }));
            }

            if (userState.success) {
                setEditMode({
                    isEditMode: false,
                    section: undefined,
                })
            }

            console.log(passwordData);
        } else if (SECTION === 'PROFILE') {
            await dispatch(editUserProfile({
                token: authState.token,
                profileData: profileData,
            }))
            if (userState.success) {
                setEditMode({
                    isEditMode: false,
                    section: undefined,
                })
            }
        }
    }


    const handleEditChangeDeleteBtnClicked = (currSection) => {
        setEditMode({
            isEditMode: true,
            section: currSection
        })

        if (currSection === 'PROFILE') {
            setCurrFocusField(1);

        } else if (currSection === 'PASS') {
            setCurrFocusField(4);
        }
        else if (currSection === 'PROFILEPIC') {
            setOldProfilePic(avatarImg);
        }
    }

    const handlePassInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleCancelBtnClicked = () => {
        setEditMode({
            isEditMode: false,
            section: undefined,
        })

        //> image SECTION == PROFILEPIC, reverting back old Profile Pic
        if (editMode.section === 'PROFILEPIC') {
            setProfilePicImg(oldProfilePic);
        }
        setCurrFocusField(undefined);
    }

    const confirmDeleteBtnClicked = () => {
    }

    //> Profile Pic _______________________________________________
    const [file, setFile] = useState();

    const previewFile = (file) => {
        console.log(file)
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = () => {
            setProfilePicImg(reader.result);
        };
        // console.log(reader.result);
    };

    const editProfilePic = async () => {
        const data = new FormData();
        axios
            .post("https://httpbin.org/anything", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        data.append("file", file);

    }

    const handleProfilePicChange = (e) => {
        console.log('ss')
        const file = e.target.files[0];
        setFile(file);
        previewFile(file);
    };

    //> _______________________________________________

    const navigate = useNavigate();
    return (
        <div className={styles.SetttingsComponent}>

            <DeleteModal
                setDeleteMode={setDeleteMode}
                deleteMode={deleteMode}
                confirmDeleteBtnClicked={confirmDeleteBtnClicked}
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
                        <div className={`${styles.profilePicContainer} ${formFieldEditable('PROFILEPIC') && styles.profilePicformTagEditMode} `}>
                            <label htmlFor="file">
                                {/* {previewImg ? (
                                    <div className={styles.imgPreviewContainer}>
                                        <img src={previewImg} alt="doc" />
                                    </div>
                                ) : (
                                    <div className={styles.uploadContainer}>
                                        <Icon icon="bi:folder-fill" className={styles.folderIcon} />
                                        <p>Click to choose file</p>
                                    </div>
                                )} */}
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
                                    <div className={styles.iconDivCancel} onClick={handleCancelBtnClicked} >
                                        <Icon className={styles.profilePicSaveIcon} icon="ph:x-bold" />
                                    </div>
                                    <div className={styles.iconDivSave} onClick={() => handleEditChangeDeleteBtnClicked('PROFILEPIC')} >
                                        <Icon className={styles.profilePicCancelIcon} icon="charm:tick-double" />
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
                            <p className={styles.labelText}>Joined</p>
                            <p className={styles.dateText}>12 Dec 2021</p>
                        </div>
                        <div className={styles.updatedDateDiv} >
                            <p className={styles.labelText}>Last Updated</p>
                            <p className={styles.dateText}>09 Feb 2022</p>
                        </div>
                    </div>

                </div>
            </div>


            <div className={styles.profileFromSection} >
                <div className={styles.formWrapper}>
                    <div className={styles.formMessageWrapper} >
                        {(userState.responseMessage || message) &&
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
                        }
                    </div>

                    <div className={styles.profileNameWrapper} >
                        <div className={styles.profileHeadingContainer} >
                            <div className={styles.formSectionHeadingDiv} >
                                <p>Profile</p>
                            </div>
                        </div>
                        <div className={styles.profileFirstNameContainer} >
                            <div className={`${styles.profileFirstNameDiv} ${currFocusField === 1 && styles.focusFieldStyle}`} >
                                <div className={styles.labelDiv}>
                                    <p>FIRST NAME</p>
                                </div>
                                <div className={styles.inputDiv}>
                                    <input
                                        name='firstName'
                                        value={profileData.firstName}
                                        onChange={handleProfileInputChange} disabled={!formFieldEditable('PROFILE')}
                                        onFocus={() => onFocus(1)} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.profileLastNameContainer} >
                            <div className={`${styles.profileLastNameDiv} ${currFocusField === 2 && styles.focusFieldStyle}`} >
                                <div className={styles.labelDiv}>
                                    <p>LAST NAME</p>
                                </div>
                                <div className={styles.inputDiv}>
                                    <input
                                        value={profileData.lastName}
                                        name='lastName'
                                        onChange={handleProfileInputChange}
                                        disabled={!formFieldEditable('PROFILE')}
                                        onFocus={() => onFocus(2)} />
                                </div>
                            </div>

                        </div>
                        <div className={styles.profileEmailNameContainer} >
                            <div className={`${styles.profileEmailNameDiv} ${currFocusField === 3 && styles.focusFieldStyle}`} >
                                <div className={styles.labelDiv}>
                                    <p>
                                        EMAIL ADDRESS
                                    </p>
                                </div>
                                <div className={styles.inputDiv}>
                                    <input
                                        disabled={true}
                                        // onFocus={() => onFocus(3)}
                                        value={profileData.email} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.profileEditBtnContainer} >


                            {
                                formFieldEditable('PROFILE') ?
                                    <>
                                        <button className={styles.formBtnCancel} onClick={handleCancelBtnClicked}>
                                            <p className={styles.btnText} >
                                                Cancel
                                            </p>
                                        </button>
                                        <button className={styles.formBtnSave} onClick={() => handleSaveBtnClicked('PROFILE')}>
                                            <p className={styles.btnText} >
                                                Save
                                            </p>
                                        </button>
                                    </>

                                    :
                                    <button className={styles.formBtnEdit} onClick={() => handleEditChangeDeleteBtnClicked("PROFILE")}>
                                        <p className={styles.btnText} >
                                            Edit  Profile
                                        </p>
                                    </button>
                            }

                        </div>
                    </div>
                    <div className={styles.profilePassWrapper}>

                        <div className={styles.passHeadingContainer} >
                            <div className={styles.formSectionHeadingDiv} >
                                <p>Password</p>
                            </div>


                        </div>
                        <div className={formFieldEditable('PASS') ? styles.passFieldWrapperOpen : styles.passFieldWrapperClose} >
                            <div className={`${styles.passOldInputContainer}  ${currFocusField === 4 && styles.focusFieldStyle}`} >
                                <div className={styles.inputDiv}>
                                    <input name='oldPassword' onChange={handlePassInputChange} placeholder='New Password' onFocus={() => onFocus(4)} value={passwordData.oldPassword} />
                                </div>
                            </div>
                            <div className={`${styles.passNewInputContainer}  ${currFocusField === 5 && styles.focusFieldStyle}`} >
                                <div className={styles.inputDiv}>
                                    <input name='newPassword' onChange={handlePassInputChange} placeholder='Confirm Password' onFocus={() => onFocus(5)} value={passwordData.newPassword} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.passChangeBtnContainer} >

                            {
                                formFieldEditable('PASS') ?

                                    <>
                                        <button className={styles.formBtnCancel} onClick={handleCancelBtnClicked} >
                                            <p className={styles.btnText}>
                                                Cancel
                                            </p>
                                        </button>
                                        <button className={styles.formBtnSave} onClick={() => handleSaveBtnClicked('PASS')} >
                                            <p className={styles.btnText}>
                                                Confirm
                                            </p>
                                        </button>
                                    </>
                                    :
                                    <button className={styles.formBtnEdit} onClick={() => handleEditChangeDeleteBtnClicked("PASS")} >
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
                                    <Icon className={styles.text1Icon} icon="icon-park-outline:caution" color="#f3212d" />
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
                            <button className={styles.formBtnEdit} onClick={handleDeleteBtnClicked}>
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
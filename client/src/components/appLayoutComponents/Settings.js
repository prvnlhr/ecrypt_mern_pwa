import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./styles/settingsComponent.module.css";
import { Icon } from '@iconify/react';
const Settings = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.SetttingsComponent}>

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
                    <div className={styles.profileContainer}>
                        <div className={styles.profilePicDiv}></div>
                        <div className={styles.profilePicEditBtnDiv}>
                            <Icon className={styles.editBtnIcon} icon="mingcute:pencil-line" />
                        </div>
                    </div>
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
                    <div className={styles.profileNameWrapper} >
                        <div className={styles.profileHeadingContainer} >
                            <div className={styles.formSectionHeadingDiv} >
                                <p>Profile</p>
                            </div>
                        </div>
                        <div className={styles.profileFirstNameContainer} >
                            <div className={styles.profileFirstNameDiv} >
                                <div className={styles.labelDiv}>
                                    <p>FIRST NAME</p>
                                </div>
                                <div className={styles.inputDiv}>
                                    <input value={"William"} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.profileLastNameContainer} >
                            <div className={styles.profileLastNameDiv} >
                                <div className={styles.labelDiv}>
                                    <p>LAST NAME</p>
                                </div>
                                <div className={styles.inputDiv}>
                                    <input value={"Butcher"} />
                                </div>
                            </div>

                        </div>
                        <div className={styles.profileEmailNameContainer} >
                            <div className={styles.profileEmailNameDiv} >
                                <div className={styles.labelDiv}>
                                    <p>
                                        EMAIL ADDRESS
                                    </p>
                                </div>
                                <div className={styles.inputDiv}>
                                    <input value={"will.iam.butcher@gmail.com"} />
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.profileEditBtnContainer} >
                            <button className={styles.formBtns}>
                                <p className={styles.btnText}>
                                    Edit  Profile
                                </p>
                            </button>
                        </div>
                    </div>
                    <div className={styles.profilePassWrapper}>
                        <div className={styles.passHeadingContainer} >
                            <div className={styles.formSectionHeadingDiv} >
                                <p>Password</p>
                            </div>
                        </div>
                        <div className={styles.passOldInputContainer} >
                            <div className={styles.inputDiv}>
                                <input value={""} />
                            </div>
                        </div>
                        <div className={styles.passNewInputContainer} >
                            <div className={styles.inputDiv}>
                                <input value={""} />
                            </div>
                        </div>
                        <div className={styles.passChangeBtnContainer} >
                            <button className={styles.formBtns} >
                                <p className={styles.btnText}>
                                    Change Password
                                </p>
                            </button>
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
                            <button className={styles.formBtns}>
                                <p className={styles.btnText}>
                                    Delete Account
                                </p>
                            </button>
                        </div>

                    </div>

                </div>

            </div>



        </div>
    )
}

export default Settings
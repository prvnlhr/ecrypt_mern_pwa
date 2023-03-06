import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./styles/fullContentCard.module.css"
import BackBtnIcon from "../../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import moment from "moment";
import { toggleIsFav } from "../../../redux/features/loginsId/loginsIdSlice"
import { logosArray } from "../../logoComponents/logosData"
import LogoComponentWrapper from "../../logoComponents/LogoComponentWrapper"
import BookmarksIcon from "../../icons/BookmarksIcon"
import BookmarksIconFill from "../../icons/BookmarksIconFill"
import { Oval } from 'react-loader-spinner'

const spinnerWrapper = {
    height: `100%`,
    with: `100%`,
}
const FullContentCard = ({ showFullFavCard, setShowFullFavCard, favFullCardData }) => {

    const dispatch = useDispatch();
    const favItemClicked = () => {
        dispatch(toggleIsFav({
            loginId_id: favFullCardData._id,
            isFav: !favFullCardData.isFavourite
        })).then((res) => {
            if (res.type === 'loginIds/toggleFav/fulfilled') {
                setShowFullFavCard(false);
            }
        })
    }

    const isDarkMode = useSelector((state) => state.ui.darkMode);

    const loginsIdState = useSelector((state => state.loginIds));

    const { isLoading, action } = loginsIdState;

    const handleFullContentBackBtnClicked = () => {
        setShowFullFavCard(!showFullFavCard);
    }

    return (
        <div className={
            showFullFavCard ? styles.cardWrapper : styles.cardWrapperClose
        }>

            <div className={styles.cardContainer}>

                <div className={styles.cardHeader}>
                    <div className={styles.backBtnContainer} >
                        <div className={styles.backBtnDiv}
                            onClick={() => handleFullContentBackBtnClicked()}
                        ><BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.curdBtnContainer} >
                        <div className={styles.favBtnDiv} onClick={favItemClicked}  >
                            {
                                (isLoading === true && action === 'toggleFav') ?
                                    <Oval
                                        height={`75%`}
                                        width={`75%`}
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
                                    // <BookmarksIconFill />
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
                                    />
                            }
                        </div>

                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >

                    <div className={styles.logoTitleContainer} >
                        <div className={styles.logoContainer}
                        >
                            <div className={styles.logoDiv}>
                                <div className={styles.logoDiv}>
                                    {favFullCardData.logoIndex !== undefined &&
                                        logosArray[favFullCardData.logoIndex].logo
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={styles.titleContainer} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleInputDiv}>
                                <input className={`${styles.textInputCommonStyle} ${styles.titleTextField}  ${styles.titleTextFieldFont}`} value={favFullCardData.title} readOnly={true} />
                            </div>
                        </div>

                    </div>

                </div>


                <div className={styles.categoryWrapper} >
                    <div className={styles.categoryContainer} >
                        <div className={styles.categoryLabelDiv} >
                            <p>Category</p>
                        </div>
                        <div className={styles.categoryInputDiv} >
                            <input className={`${styles.textInputCommonStyle}  ${styles.categoryTextField}  ${styles.categoryTextFieldFont}`} value={favFullCardData.category} readOnly={true} />
                        </div>
                    </div>
                </div>

                <div className={styles.appWebSiteWrapper} >
                    <div className={styles.appWebSiteContainer} >
                        <div className={styles.appWebSiteIconDiv} >
                            <Icon
                                className={styles.websiteIcon}
                                icon="tabler:app-window" />
                        </div>
                        <div className={styles.appWebsiteLabelDiv} >
                            <p>App / Website</p>
                        </div>
                        <div className={styles.appWebsiteInputDiv}>
                            <input className={`${styles.textInputCommonStyle} ${styles.appWebsiteTextField}  ${styles.appWebsiteTextFieldFont}`} value={favFullCardData.app} readOnly={true} />
                        </div>
                    </div>

                </div>

                <div className={styles.usernameWrapper} >
                    <div className={styles.usernameContainer} >
                        <div className={styles.usernameIconDiv} >
                            <Icon
                                className={styles.usernameIcon}
                                icon="prime:user"
                            />
                        </div>
                        <div className={styles.usernameLabelDiv} >
                            <p>USERNAME / EMAIL</p>
                        </div>
                        <div className={styles.usernameInputDiv}>
                            <input className={` ${styles.textInputCommonStyle}  ${styles.usernameTextField}  ${styles.usernameTextFieldFont}`} value={favFullCardData.username} readOnly={true} />
                        </div>
                    </div>
                </div>


                <div className={styles.passwordWrapper} >
                    <div className={styles.passwordContainer} >
                        <div className={styles.passwordIconDiv} >
                            <Icon
                                className={styles.passwordIcon}
                                icon="fluent:password-20-regular" />
                        </div>
                        <div className={styles.passwordLabelDiv} >
                            <p>PASSWORD</p>
                        </div>
                        <div className={styles.passwordInputDiv} >
                            <input className={`${styles.textInputCommonStyle} ${styles.passwordTextField}  ${styles.passwordTextFieldFont}`} value={favFullCardData.password} readOnly={true} />
                        </div>
                    </div></div>
            </div>
        </div>

    )
}

export default FullContentCard
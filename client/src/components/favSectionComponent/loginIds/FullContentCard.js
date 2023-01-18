import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from "./styles/fullContentCard.module.css"
import BackBtnIcon from "../../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import moment from "moment";
import { toggleIsFav } from "../../../redux/features/loginsId/loginsIdSlice"
import { logosArray } from "../../logoComponents/logosData"
import LogoComponentWrapper from "../../logoComponents/LogoComponentWrapper"
import BookmarksIcon from "../../icons/BookmarksIcon"
import BookmarksIconFill from "../../icons/BookmarksIconFill"

const FullContentCard = ({ showFullFavCard, setShowFullFavCard, favFullCardData }) => {

    const dispatch = useDispatch();
    const favItemClicked = () => {
        dispatch(toggleIsFav({
            loginId_id: favFullCardData._id,
            isFav: !favFullCardData.isFavourite
        }))
        setShowFullFavCard(false);
    }


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
                            <BookmarksIconFill />
                        </div>

                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >

                    <div className={styles.logoTitleContainer} >
                        <div className={styles.logoContainer}
                        >
                            <div className={styles.logoDiv}>
                                <div className={styles.logoDiv}>
                                    {favFullCardData.logoIndex != undefined &&
                                        logosArray[favFullCardData.logoIndex].logo
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={styles.titleContainer} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleTextDiv}>
                                <p>{favFullCardData.title}</p>
                            </div>
                        </div>

                    </div>

                </div>


                <div className={styles.categoryWrapper} >
                    <div className={styles.categoryContainer} >
                        <div className={styles.categoryLabelDiv} >
                            <p>Category</p>
                        </div>
                        <div className={styles.categoryTextDiv} >
                            <div className={styles.categoryTextBox} >
                                <p>{favFullCardData.category}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.appWebSiteWrapper} >
                    <div className={styles.appWebSiteContainer} >
                        <div className={styles.appWebSiteIconDiv} >
                            <Icon
                                className={styles.websiteIcon}
                                icon="tabler:app-window" color="#002a9a" />
                        </div>
                        <div className={styles.appWebsiteLabelDiv} >
                            <p>App / Website</p>
                        </div>
                        <div className={styles.appWebsiteTextDiv} >
                            <p>{favFullCardData.app}</p>
                        </div>
                    </div>

                </div>

                <div className={styles.usernameWrapper} >
                    <div className={styles.usernameContainer} >
                        <div className={styles.usernameIconDiv} >
                            <Icon
                                className={styles.usernameIcon}
                                icon="prime:user" color="#002a9a"
                            />
                        </div>
                        <div className={styles.usernameLabelDiv} >
                            <p>USERNAME / EMAIL</p>
                        </div>
                        <div className={styles.usernameTextDiv} >
                            <p>{favFullCardData.username}</p>
                        </div>
                    </div>
                </div>


                <div className={styles.passwordWrapper} >
                    <div className={styles.passwordContainer} >
                        <div className={styles.passwordIconDiv} >
                            <Icon
                                className={styles.passwordIcon}
                                icon="fluent:password-20-regular" color="#002a9a" />
                        </div>
                        <div className={styles.passwordLabelDiv} >
                            <p>PASSWORD</p>
                        </div>
                        <div className={styles.passwordTextDiv} >
                            <p>{favFullCardData.password}</p>
                        </div>
                    </div></div>
            </div>
        </div>

    )
}

export default FullContentCard
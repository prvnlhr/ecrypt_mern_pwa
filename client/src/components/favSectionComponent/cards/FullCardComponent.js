import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles/fullCardComponent.module.css"
import BackBtnIcon from "../../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import { logosArray, logosData } from "../../logoComponents/logosData";
import BankCardSubComponent from './BankCardSubComponent';
import IdentityCardSubComponent from './IdentityCardSubComponent';
import LicenseCardSubComponent from './LicenseCardSubComponent';
import LogoComponentWrapper from "../../logoComponents/LogoComponentWrapper"
import BookmarksIconFill from "../../icons/BookmarksIconFill"
import { toggleIsFav } from '../../../redux/features/cards/cardsSlice';
// import { editCardData, deleteCardData } from "../../../redux/features/cards/cardsSlice"
// import { generateActivityData } from "../../utils/ActivityDataChangeFuction"
import { Oval } from 'react-loader-spinner'
const spinnerWrapper = {
    height: `100%`,
    with: `100%`,
}
const FullCardComponent = ({
    showFullFavCard,
    setShowFullFavCard,
    handleFavLoginIdClick,
    favFullCardData,
    setFavFullCardData
}) => {

    const dispatch = useDispatch();

    const isDarkMode = useSelector((state) => state.ui.darkMode);
    const cardState = useSelector((state => state.cards));
    const { isLoading, action } = cardState;
    const favItemClicked = () => {

        dispatch(toggleIsFav({
            card_id: favFullCardData._id,
            isFav: !favFullCardData.isFavourite,
            category: favFullCardData.category
        })).then((res) => {
            // console.log(res)
            if (res.type === 'cards/toggleFav/fulfilled') {
                setShowFullFavCard(false);
            }
        })
    }
    const handleFullContentBackBtnClicked = () => {
        setShowFullFavCard(!showFullFavCard);
    }



    return (
        <div className={showFullFavCard ? styles.cardWrapper : styles.cardWrapperClose}>

            <div className={styles.cardContainer}>

                <div className={styles.cardHeader} >
                    <div className={styles.backBtnContainer} >
                        <div className={styles.backBtnDiv}
                            onClick={() => handleFullContentBackBtnClicked()}
                        >
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.curdBtnContainer} >
                        <div className={styles.favBtnDiv} onClick={favItemClicked}  >
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
                                    />
                                    :
                                    <BookmarksIconFill />
                            }
                        </div>
                    </div>
                </div>


                <div className={styles.logoTitleWrapper} >
                    <div className={styles.logoTitleContainer} >

                        <div className={styles.logoContainer}>
                            <div className={styles.logoDiv}>
                                {favFullCardData.logoIndex !== undefined &&
                                    logosArray[favFullCardData.logoIndex].logo
                                }
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
                        <div className={styles.categoryInputDiv}>
                            <input className={`${styles.textInputCommonStyle}  ${styles.categoryTextField}  ${styles.categoryTextFieldFont}`} value={favFullCardData.category} readOnly={true} />
                        </div>

                    </div>
                </div>

                <div className={styles.subCardWrapper}>

                    {
                        favFullCardData.category === "Bank" ?
                            <BankCardSubComponent
                                favFullCardData={favFullCardData}
                                setFavFullCardData={setFavFullCardData}
                            />


                            : favFullCardData.category === "Identity" ?
                                <IdentityCardSubComponent
                                    favFullCardData={favFullCardData}
                                    setFavFullCardData={setFavFullCardData}
                                />


                                : favFullCardData.category === "License" ?
                                    <LicenseCardSubComponent
                                        favFullCardData={favFullCardData}
                                        setFavFullCardData={setFavFullCardData}
                                    /> :

                                    null
                    }

                </div>



            </div>
        </div>
    )
}

export default FullCardComponent
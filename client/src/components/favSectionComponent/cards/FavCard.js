import React, { useEffect, useState } from 'react'
import styles from "./styles/favCard.module.css"
import BookmarksIconFill from "../../icons/BookmarksIconFill"
import { logosArray } from '../../logoComponents/logosData'
import CardLogo from "../../cardComponent/CardLogo"
const FavCard = ({ favItem, handleFavCardClick }) => {

    const [venderLogo, setVenderLogo] = useState();
    useEffect(() => {
        if (favItem.category === 'Bank') {
            setVenderLogo(
                < CardLogo cardNo={favItem.cardNumber} />
            )
        }

    }, [favItem])
    return (
        <div className={
            // styles.cardComponentBank
            favItem.category === "Bank" ? styles.cardComponentBank : styles.cardComponent
        }
            onClick={() => {
                handleFavCardClick(favItem);
            }}
        >
            <div className={styles.logoWrapper} >
                <div className={styles.logoDiv}>
                    {favItem.logoIndex !== undefined && logosArray[favItem.logoIndex].logo}
                </div>
            </div>
            <div className={styles.titleWrapper} >
                <p className={styles.titleText}>
                    {favItem.title}
                </p>
            </div>
            <div className={styles.usernameWrapper} >
                <p className={styles.userNameText}>
                    {
                        favItem.category === "License" ? favItem.licenseNumber : favItem.cardNumber
                    }
                </p>
            </div>
            <div className={
                styles.bankCardLogoWrapperShow
                // favItem.category === "Bank" ? styles.bankCardLogoWrapperShow : styles.bankCardLogoWrapperHide
            } >
                <div className={styles.bankCardVenderLogoDiv}>
                    {venderLogo}
                </div>
            </div>
            <div className={styles.favBtnWrapper} >
                {/* <Icon className={styles.favBtnIcon} icon="ion:bookmark-outline" color="#7e8da4" /> */}

                <div className={styles.favBtnIconDiv}>
                    <BookmarksIconFill />
                </div>

            </div>
        </div>
    )
}

export default FavCard
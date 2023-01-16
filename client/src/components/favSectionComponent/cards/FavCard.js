import React from 'react'
import styles from "./styles/favCard.module.css"
import BookmarksIcon from "../../icons/BookmarksIcon"
const FavCard = () => {
    return (
        <div className={
            styles.cardComponentBank
            // cardData.category === "Bank" ? styles.cardComponentBank : styles.cardComponent
        }
        // onClick={() => {
        //     handleCardClicked(cardData);
        // }}
        >
            <div className={styles.logoWrapper} >
                <div className={styles.logoDiv}>
                    {/* {logosArray[cardData.logoIndex].logo} */}
                </div>
            </div>
            <div className={styles.titleWrapper} >
                <p className={styles.titleText}>
                    {/* {cardData.title} */}
                </p>
            </div>
            <div className={styles.usernameWrapper} >
                <p className={styles.userNameText}>
                    {/* {
                        cardData.category === "License" ? cardData.licenseNumber : cardData.cardNumber
                    } */}
                </p>
            </div>
            <div className={
                styles.bankCardLogoWrapperShow
                // cardData.category === "Bank" ? styles.bankCardLogoWrapperShow : styles.bankCardLogoWrapperHide
            } >
                <div className={styles.bankCardVenderLogoDiv}>
                    {/* {venderLogo} */}
                </div>
            </div>
            <div className={styles.favBtnWrapper} >
                {/* <Icon className={styles.favBtnIcon} icon="ion:bookmark-outline" color="#7e8da4" /> */}

                <div className={styles.favBtnIconDiv}>
                    <BookmarksIcon />
                </div>

            </div>
        </div>
    )
}

export default FavCard
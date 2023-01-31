import React, { forwardRef } from 'react'
import styles from "./styles/searchCard.module.css"
import { useState, useEffect } from "react";
import CardLogo, { getCardType } from "../cardComponent/CardLogo";
import BookmarksIcon from "../icons/BookmarksIcon"
import BookmarksIconFill from "../icons/BookmarksIconFill"
import { logosArray } from "../logoComponents/logosData"

const SearchCard = ({ item, setClickedSearchItem, handleSearchItemClicked }) => {

    const [venderLogo, setVenderLogo] = useState();
    useEffect(() => {
        if (item.category === 'Bank') {
            setVenderLogo(
                < CardLogo cardNo={item.cardNumber} />
            )
        }

    }, [item])
    return (
        <div className={
            item.category === "Bank" ? styles.cardComponentBank : styles.cardComponent
        }
            id={item._id}
            onClick={() => handleSearchItemClicked(item)}
        >
            <div className={styles.logoWrapper} >
                <div className={styles.logoDiv}>
                    {logosArray[item.logoIndex].logo}
                </div>
            </div>
            <div className={styles.titleWrapper} >
                <p className={styles.titleText}>
                    {item.title}
                </p>
            </div>
            <div className={styles.usernameWrapper} >
                <p className={styles.userNameText}>
                    {
                        item.category === "License" ? item.licenseNumber : item.cardNumber
                    }
                </p>
            </div>
            <div className={
                item.category === "Bank" ? styles.bankCardLogoWrapperShow : styles.bankCardLogoWrapperHide
            } >
                <div className={styles.bankCardVenderLogoDiv}>
                    {venderLogo}
                </div>
            </div>
            <div className={styles.favBtnWrapper} >
                <div className={styles.favBtnIconDiv}>
                    {item.isFavourite === true ?
                        <BookmarksIconFill />
                        :
                        <BookmarksIcon />
                    }
                </div>

            </div>
        </div>
    )
}

export default SearchCard
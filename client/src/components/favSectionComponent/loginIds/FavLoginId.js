import React, { useState } from 'react'
import styles from "./styles/favLoginId.module.css"
import { logosArray } from "../../logoComponents/logosData"
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion"
import BookmarksIcon from "../../icons/BookmarksIcon"
import BookmarksIconFill from "../../icons/BookmarksIconFill"

const FavLoginId = ({ favItem, handleFavLoginIdClick }) => {
    const [cardExpand, setCardExpand] = useState(false);
    const changeCardView = () => {
        setCardExpand(!cardExpand)
    }

    const favBtnClicked = () => {
        console.log("favBtns")
    }
    return (
        <div className={styles.loginInWrapper}
            onClick={() => handleFavLoginIdClick(favItem)
            }
        >
            <div className={styles.logoWrapper} >
                <div className={styles.logoDiv}>
                    {favItem.logoIndex && logosArray[favItem.logoIndex].logo}
                </div>
            </div>
            <div className={styles.titleWrapper} >
                <p className={styles.titleText}>
                    {favItem.title}
                </p>
            </div>
            <div className={styles.usernameWrapper} >
                <p className={styles.userNameText}>
                    {favItem.username}
                </p>
            </div>
            <div className={styles.favBtnWrapper} >
                <div className={styles.favBtnDiv} >
                    {
                        favItem.isFavourite === true ?
                            <BookmarksIconFill /> :
                            <BookmarksIcon />
                    }
                </div>
            </div>
        </div>
    )
}

export default FavLoginId
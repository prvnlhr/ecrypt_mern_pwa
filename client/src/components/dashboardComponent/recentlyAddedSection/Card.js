import React, { useState, useEffect } from 'react'
import styles from "./styles/rectCard.module.css"
import { logosArray } from "../../logoComponents/logosData"
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion"
import CardLogo from "../../cardComponent/CardLogo"

const Card = ({ item, clickedSearchItem, handleItemClicked }) => {

    const [venderLogo, setVenderLogo] = useState();
    useEffect(() => {
        if (item.category === 'Bank') {
            setVenderLogo(
                < CardLogo cardNo={item.cardNumber} />
            )
        }

        console.log(item)
    }, [item])

    return (
        <div
            className={`${item.category === "Bank" ? styles.cardComponentBank : styles.cardComponent} `}
            onClick={() => {
                handleItemClicked(item);
            }}
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
            <div className={item.category === "Bank" ? styles.bankCardLogoWrapperShow : styles.bankCardLogoWrapperHide} >
                <div className={styles.bankCardVenderLogoDiv}>
                    {venderLogo}
                </div>
            </div>
            <div className={styles.favBtnWrapper} >
            </div>
        </div>

    )
}

export default Card
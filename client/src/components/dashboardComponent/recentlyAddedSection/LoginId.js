import React, { useState } from 'react'
import styles from "./styles/rectLoginId.module.css"
import { logosArray } from "../../logoComponents/logosData"
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion"

const LoginId = ({ item,
    clickedSearchItem,
    setClickedSearchItem,
    handleItemClicked
}) => {
    return (

        <div className={`${styles.loginInWrapper} `}
            id={item._id}
            onClick={() => {
                handleItemClicked(item);
            }}
        >
            <div className={styles.dateWrapper}>
                <div className={styles.dateDiv}>
                    <p>{item.createdAt}</p>
                </div>
            </div>
            <div className={styles.logoWrapper} >
                <div className={styles.logoDiv}>
                    {item.logoIndex !== undefined && logosArray[item.logoIndex].logo}
                </div>
            </div>
            <div className={styles.titleWrapper} >
                <p className={styles.titleText}>
                    {item.title}
                </p>
            </div>
            <div className={styles.usernameWrapper} >
                <p className={styles.userNameText}>
                    {item.username}
                </p>
            </div>
            <div className={styles.favBtnWrapper} >
            </div>
        </div>

    )
}

export default LoginId
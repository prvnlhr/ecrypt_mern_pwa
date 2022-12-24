import React, { useState } from 'react'
import styles from "./styles/logoSearchComponent.module.css"
import { Icon } from '@iconify/react';

const LogoSearchComponent = ({ searchQuery, setSearchQuery }) => {


    const handleClearBtnClick = () => {
        setSearchQuery("");
    }
    return (
        <div className={styles.logoSearchWrapper} >
            <div className={styles.inputContainer} >
                <div className={styles.inputDiv} >
                    < input className={styles.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className={styles.inputClearIconDiv} >
                    <Icon className={styles.inputClearIcon} icon="ph:x-bold" onClick={handleClearBtnClick} />
                </div>
            </div>
        </div>
    )
}

export default LogoSearchComponent  
import React, { useEffect } from 'react'
import { Icon } from '@iconify/react';
import styles from "./styles/addbtn.module.css"
const AddBtn = ({ formToggle, isScrolling }) => {
    return (
        <div className={`${styles.addBtnWrapper} ${isScrolling && styles.addBtnWrapperShrink}`} onClick={() => formToggle()} >

            <div className={styles.iconDiv} >
                <Icon className={styles.plusIcon} icon="ic:round-plus" color="#002a9a" />
            </div>

            <div className={`${styles.addTextDiv} ${isScrolling && styles.addTextDivHide}`} >
                <p>Add</p>
            </div>

        </div>
    )
}

export default AddBtn
import React, { useEffect } from 'react'
import { Icon } from '@iconify/react';
import styles from "./styles/addbtn.module.css"
const AddBtn = ({ formToggle, isSrolling }) => {

    useEffect(() => {
        console.log('xskjkjk')
    }, [isSrolling])

    return (
        <div className={`${styles.addBtnWrapper} ${isSrolling && styles.addBtnWrapperHide}`} onClick={() => formToggle()} >
            <Icon className={styles.plusIcon} icon="ic:round-plus" color="#002a9a" />
            <p>Add</p>
        </div>
    )
}

export default AddBtn
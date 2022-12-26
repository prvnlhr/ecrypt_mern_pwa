import React from 'react'
import { Icon } from '@iconify/react';
import styles from "./styles/addbtn.module.css"
import AddBtnIcon from "../icons/AddBtnIcon"
const AddBtn = ({ formToggle }) => {
    return (
        <div className={styles.addBtnWrapper} onClick={() => formToggle()} >
            <Icon className={styles.plusIcon} icon="ic:round-plus" color="#002a9a" />
            <p>Add</p>
        </div>
    )
}

export default AddBtn
import React from 'react'
import styles from "./styles/logoComponents.module.css"
import { Icon } from '@iconify/react';
import LogoSearchComponent from "./LogoSearchComponent"
import LogoListComponent from "./LogoListComponent"
const LogoComponentWrapper = ({ setLogoComponentShow }) => {
    const closeBtnClicked = () => {
        setLogoComponentShow(false);
    }
    return (
        <div className={styles.componentWrapper}>
            <div className={styles.closeWrapper} >
                <div className={styles.closeIconDiv} onClick={closeBtnClicked}>
                    <Icon className={styles.closeIcon} icon="ph:x-bold" />
                </div>
            </div>
            <LogoSearchComponent />
            <LogoListComponent />
        </div>
    )
}

export default LogoComponentWrapper
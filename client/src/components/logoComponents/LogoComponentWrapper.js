import React, { useState } from 'react'
import styles from "./styles/logoComponents.module.css"
import { Icon } from '@iconify/react';
import LogoSearchComponent from "./LogoSearchComponent"
import LogoListComponent from "./LogoListComponent"
const LogoComponentWrapper = ({ setLogoComponentShow, logoIndx, setLogoIndx }) => {
    const closeBtnClicked = () => {
        setLogoComponentShow(false);
    }
    console.table(logoIndx);
    const [searchQuery, setSearchQuery] = useState();
    return (
        <div className={styles.componentWrapper}>
            <div className={styles.closeWrapper} >
                <div className={styles.closeIconDiv} onClick={closeBtnClicked}>
                    <Icon className={styles.closeIcon} icon="ph:x-bold" />
                </div>
            </div>
            <LogoSearchComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <LogoListComponent
                logoIndx={logoIndx}
                setLogoIndx={setLogoIndx}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        </div>
    )
}

export default LogoComponentWrapper
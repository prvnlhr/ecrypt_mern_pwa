import React, { useState } from 'react'
import styles from "./styles/logoComponents.module.css"
import { Icon } from '@iconify/react';
import LogoSearchComponent from "./LogoSearchComponent"
import LogoListComponent from "./LogoListComponent"
const LogoComponentWrapper = ({ setLogoComponentShow, logoIndx, setLogoIndx }) => {



    //> State for temporary saving logo till confirmed
    const [logoIndexUntilSaved, setLogoIndexUntilSaved] = useState(undefined);


    //> confirm selected logo
    const saveBtnClicked = () => {
        setLogoIndx(logoIndexUntilSaved)
        setLogoComponentShow(false);

        //> clearing state on closing logo form
        setLogoIndexUntilSaved(undefined);
    }
    const closeBtnClicked = () => {
        setLogoComponentShow(false);
        setLogoIndexUntilSaved(undefined);
    }

    const [searchQuery, setSearchQuery] = useState();
    return (
        <div className={styles.componentWrapper}>
            <div className={styles.closeWrapper} >


                {logoIndexUntilSaved !== undefined &&
                    <div className={styles.saveIconDiv} onClick={saveBtnClicked}>
                        <Icon className={styles.saveIcon} icon="charm:tick" />
                    </div>
                }
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
                logoIndexUntilSaved={logoIndexUntilSaved}
                setLogoIndexUntilSaved={setLogoIndexUntilSaved}
            />
        </div>
    )
}

export default LogoComponentWrapper
import React from 'react';
import { useState } from 'react';
import BackBtnIcon from '../icons/BackBtnIcon';
import styles from "./styles/documentFullScreen.module.css"
import { Icon } from '@iconify/react';

const DocFullScreen = ({ setDocFullScreen, docFullScreen, fullScreenData }) => {

    const [headerFooterShow, setHeaderFooterShow] = useState(true);

    const handleHeaderFooterShowHide = () => {
        setHeaderFooterShow(!headerFooterShow);
    }

    const docMinimises = () => {
        setDocFullScreen(false);
    }
    return (
        <div className={docFullScreen ? styles.documentFullScreenWrapper : styles.documentFullScreenWrapperClose} >

            <div className={styles.imageContainer}
                onClick={handleHeaderFooterShowHide}
            ></div>

            <div className={headerFooterShow ? styles.headerContainer : styles.headerContainerClose} >
                <div className={styles.backBtnContainer} >
                    <div className={styles.backBtnDiv} onClick={docMinimises}>
                        <BackBtnIcon />
                    </div>
                </div>
                <div className={styles.deleteBtnContainer} ></div>
                <div className={styles.favBtnContainer} ></div>
            </div>
            <div className={headerFooterShow ? styles.footerContainer : styles.footerContainerClose}  >
                <div className={styles.titleDiv} >
                    <p>{fullScreenData.title}</p>
                </div>
                <div className={styles.titleEditBtnIconDiv} >
                    <Icon className={styles.titleEditIcon} icon="lucide:edit" />
                </div>
            </div>
        </div>
    )
}

export default DocFullScreen
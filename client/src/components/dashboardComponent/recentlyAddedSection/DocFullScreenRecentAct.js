import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import BackBtnIcon from '../../icons/BackBtnIcon';
import styles from "./styles/docFullScreenStyles.module.css"
import { Icon } from '@iconify/react';
// import { deleteDocData, editDocData } from "../../redux/features/docs/docsSlice"
// import { generateActivityData } from ".././utils/ActivityDataChangeFuction"

const DocFullScreenRecentAct = ({ setRecAddDocFullScreen, recAddDocFullScreen,
    recAddDocFullScreenData,
    setRecAddDocFullScreenData
}) => {
    const dispatch = useDispatch();
    const [headerFooterShow, setHeaderFooterShow] = useState(true);

    // console.log(recAddDocFullScreenData);


    // const [imageName, setImageName] = useState("");
    // const [editMode, setEditMode] = useState(false);

    // const [oldTitle, setOldTitle] = useState('');


    const handleHeaderFooterShowHide = () => {
        setHeaderFooterShow(!headerFooterShow);
    }

    const docMinimises = () => {
        setRecAddDocFullScreen(false);
    }

  
    return (
        <div className={recAddDocFullScreen ? styles.documentFullScreenWrapper : styles.documentFullScreenWrapperClose} >

            <div className={styles.imageContainer} onClick={handleHeaderFooterShowHide}>
                <img src={recAddDocFullScreenData.imageUrl} />
            </div>

            <div className={headerFooterShow ? styles.headerContainer : styles.headerContainerClose} >
                <div className={styles.backBtnContainer} >
                    <div className={styles.backBtnDiv} onClick={docMinimises}>
                        <BackBtnIcon />
                    </div>
                </div>

            </div>

            <div className={headerFooterShow ? styles.footerContainer : styles.footerContainerClose}  >
                <div className={styles.titleInputDiv} >
                    <p>{recAddDocFullScreenData.imageName}</p>
                </div>
                {/* <div className={styles.titleEditBtnIconContainer} >
                    {!editMode ?
                        <div className={styles.titleCrudIconDiv} onClick={editBtnClicked} >
                            <Icon className={styles.titleCrudIcon} icon="ph:pencil-simple-line" color="#002A9A" />
                        </div> :
                        <>
                            <div className={styles.titleCrudIconDiv} onClick={cancelBtnClicked} >
                                <Icon className={styles.titleCrudIcon} icon="ph:x-bold" color="#5B5966" />
                            </div>
                            <div className={styles.titleCrudIconDiv} onClick={saveBtnClicked} >
                                <Icon className={styles.titleCrudIcon} icon="charm:tick-double" color="#58BF6F" />
                            </div>
                        </>
                    }
                </div> */}
            </div>
        </div>
    )
}

export default DocFullScreenRecentAct
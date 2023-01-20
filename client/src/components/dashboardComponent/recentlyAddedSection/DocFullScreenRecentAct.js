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

    // const [imageName, setImageName] = useState("");
    // const [editMode, setEditMode] = useState(false);

    // const [oldTitle, setOldTitle] = useState('');


    const handleHeaderFooterShowHide = () => {
        setHeaderFooterShow(!headerFooterShow);
    }

    const docMinimises = () => {
        setRecAddDocFullScreen(false);
    }

    // const editBtnClicked = () => {
    //     setOldTitle(fullScreenData.imageName)
    //     setEditMode(true);
    // }
    // const cancelBtnClicked = () => {
    //     setFullScreenDocData({
    //         ...fullScreenData,
    //         imageName: oldTitle
    //     })
    //     setEditMode(false);
    // }
    // const saveBtnClicked = () => {
    //     console.log(fullScreenData.imageName)
    //     const oldData = {
    //         title: oldTitle
    //     }
    //     const newData = {
    //         title: fullScreenData.imageName
    //     }
    //     console.log(oldData, newData);
    //     const activity_data = generateActivityData(3, 'Doc', newData, oldData);
    //     console.log(activity_data);
    //     dispatch(editDocData({
    //         docId: fullScreenData._id,
    //         docData: fullScreenData,
    //         activityData: activity_data,
    //         userId: '63b43ab32fc8d3c100cafecc'
    //     }))
    //     setEditMode(false);
    // }

    // const handleDeleteBtnClicked = () => {
    //     const newData = {
    //         title: fullScreenData.imageName
    //     }
    //     const activity_data = generateActivityData(2, 'Doc', newData, '');
    //     console.log(activity_data);
    //     dispatch(deleteDocData({
    //         docId: fullScreenData._id,
    //         cloudId: fullScreenData.cloudinary_id,
    //         userId: '63b43ab32fc8d3c100cafecc',
    //         activityData: activity_data,
    //     }))
    //     setDocFullScreen(false)
    // }
    return (
        <div className={recAddDocFullScreen ? styles.documentFullScreenWrapper : styles.documentFullScreenWrapperClose} >

            <div className={styles.imageContainer} onClick={handleHeaderFooterShowHide}>
                {/* <img src={fullScreenData.imageUrl} /> */}
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
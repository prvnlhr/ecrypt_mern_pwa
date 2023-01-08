import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import BackBtnIcon from '../icons/BackBtnIcon';
import styles from "./styles/documentFullScreen.module.css"
import { Icon } from '@iconify/react';
import { deleteDocData, editDocData } from "../../redux/features/docs/docsSlice"

const DocFullScreen = ({ setDocFullScreen, setFullScreenDocData, docFullScreen, fullScreenData }) => {
    const dispatch = useDispatch();
    const [headerFooterShow, setHeaderFooterShow] = useState(true);

    const [imageName, setImageName] = useState("");
    const [editMode, setEditMode] = useState(false);


    const handleHeaderFooterShowHide = () => {
        setHeaderFooterShow(!headerFooterShow);
    }

    const docMinimises = () => {
        setDocFullScreen(false);
    }

    const editBtnClicked = () => {
        setEditMode(true);
    }
    const cancelBtnClicked = () => {
        setEditMode(true);
    }
    const saveBtnClicked = () => {
        dispatch(editDocData({
            docId: fullScreenData._id,
            docData: fullScreenData
        }))
        setEditMode(false);
    }

    const handleDeleteBtnClicked = () => {
        dispatch(deleteDocData({
            docId: fullScreenData._id,
            cloudId: fullScreenData.cloudinary_id,
            userId: '63b43ab32fc8d3c100cafecc',
        }))
        setDocFullScreen(false)
    }
    return (
        <div className={docFullScreen ? styles.documentFullScreenWrapper : styles.documentFullScreenWrapperClose} >

            <div className={styles.imageContainer} onClick={handleHeaderFooterShowHide}>
                <img src={fullScreenData.imageUrl} />
            </div>

            <div className={headerFooterShow ? styles.headerContainer : styles.headerContainerClose} >
                <div className={styles.backBtnContainer} >
                    <div className={styles.backBtnDiv} onClick={docMinimises}>
                        <BackBtnIcon />
                    </div>
                </div>
                <div className={styles.deleteBtnContainer} >
                    <div className={styles.deleteBtnDiv} onClick={handleDeleteBtnClicked} >
                        <p>Delete</p>
                    </div>
                </div>
                <div className={styles.favBtnContainer} ></div>
            </div>

            <div className={headerFooterShow ? styles.footerContainer : styles.footerContainerClose}  >
                <div className={styles.titleInputDiv} >
                    {
                        editMode ?
                            <input value={fullScreenData.imageName}
                                onChange={(e) =>
                                    setFullScreenDocData({
                                        ...fullScreenData,
                                        imageName: e.target.value,
                                    })}
                            />
                            :
                            <p>{fullScreenData.imageName}</p>
                    }
                </div>
                <div className={styles.titleEditBtnIconContainer} >
                    {!editMode ?
                        <div className={styles.titleCrudIconDiv} onClick={editBtnClicked} >
                            <Icon className={styles.titleCrudIcon} icon="lucide:edit" />
                        </div> :
                        <>
                            <div className={styles.titleCrudIconDiv} onClick={cancelBtnClicked} >
                                <Icon icon="ph:x-bold" />
                            </div>
                            <div className={styles.titleCrudIconDiv} onClick={saveBtnClicked} >
                                <Icon icon="charm:tick" />
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default DocFullScreen
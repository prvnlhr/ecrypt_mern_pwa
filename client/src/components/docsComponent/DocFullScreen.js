import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import BackBtnIcon from '../icons/BackBtnIcon';
import styles from "./styles/documentFullScreen.module.css"
import { Icon } from '@iconify/react';
import { deleteDocData, editDocData, toggleIsFav } from "../../redux/features/docs/docsSlice"
import { generateActivityData } from ".././utils/ActivityDataChangeFuction"
import BookmarksIcon from "../icons/BookmarksIcon"
import BookmarksIconFill from "../icons/BookmarksIconFill"
const DocFullScreen = ({ setDocFullScreen, setFullScreenDocData, docFullScreen, fullScreenData }) => {

    const currDocDataInStore = useSelector((state) =>
        fullScreenData._id ? state.docs.docsData.find((l) => l._id === fullScreenData._id) : null
    );

    const userId = useSelector((state) => state.user._id);

    useEffect(() => {
        if (currDocDataInStore) {
            // console.log(currDocDataInStore);
            setFullScreenDocData({
                ...fullScreenData,
                isFavourite: currDocDataInStore.isFavourite
            })
        }
    }, [currDocDataInStore])

    const dispatch = useDispatch();
    const [headerFooterShow, setHeaderFooterShow] = useState(true);

    const [imageName, setImageName] = useState("");
    const [editMode, setEditMode] = useState(false);

    const [oldTitle, setOldTitle] = useState('');


    const handleHeaderFooterShowHide = () => {
        setHeaderFooterShow(!headerFooterShow);
    }

    const docMinimises = () => {
        setDocFullScreen(false);
    }

    const editBtnClicked = () => {
        // console.log(fullScreenData.imageName);
        setOldTitle(fullScreenData.imageName)
        setEditMode(true);
    }
    const cancelBtnClicked = () => {
        setFullScreenDocData({
            ...fullScreenData,
            imageName: oldTitle
        })
        setEditMode(false);
    }
    const saveBtnClicked = () => {
        console.log(fullScreenData.imageName)
        const oldData = {
            title: oldTitle
        }
        const newData = {
            title: fullScreenData.imageName
        }
        console.log(oldData, newData);
        const activity_data = generateActivityData(3, 'Doc', newData, oldData);
        console.log(activity_data);
        dispatch(editDocData({
            docId: fullScreenData._id,
            docData: fullScreenData,
            activityData: activity_data,
            userId: userId
        }))
        setEditMode(false);
    }

    const handleDeleteBtnClicked = () => {
        const newData = {
            title: fullScreenData.imageName
        }
        const activity_data = generateActivityData(2, 'Doc', newData, '');
        console.log(activity_data);
        dispatch(deleteDocData({
            docId: fullScreenData._id,
            cloudId: fullScreenData.cloudinary_id,
            userId: userId,
            activityData: activity_data,
        }))
        setDocFullScreen(false)
    }
    //> fav btn Clicked
    const handleFavBtnClicked = () => {
        console.log(fullScreenData.isFavourite, !fullScreenData.isFavourite)

        dispatch(toggleIsFav({
            doc_id: fullScreenData._id,
            isFav: !fullScreenData.isFavourite
        }))
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
                        <Icon className={styles.crudIcons} icon="gg:trash-empty" color="white" />
                        <p>Delete</p>
                    </div>
                </div>
                <div className={styles.favBtnContainer} >
                    <div className={styles.favBtnDiv} onClick={handleFavBtnClicked}  >
                        {
                            fullScreenData.isFavourite === true ?
                                <BookmarksIconFill /> :
                                <BookmarksIcon />
                        }
                    </div>

                </div>
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
                <div className={styles.titleCrudBtnContainer} >
                    {!editMode ?
                        <div className={styles.titleEditBtnDiv} onClick={editBtnClicked} >
                            <Icon className={styles.titleCrudIcon} icon="ph:pencil-simple-line" color="#002A9A" />
                        </div> :
                        <>
                            <div className={styles.titleSaveBtnDiv} onClick={saveBtnClicked} >
                                <Icon className={styles.titleCrudIcon} icon="charm:tick-double" color="white" />
                            </div>

                            <div className={styles.titleCancelBtnDiv} onClick={cancelBtnClicked} >
                                <Icon className={styles.titleCrudIcon} icon="ph:x-bold" color="#5B5966" />
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default DocFullScreen
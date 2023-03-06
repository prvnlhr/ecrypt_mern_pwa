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
import DeleteModal from '../modal/DeleteModal';
import { Oval } from 'react-loader-spinner'

const spinnerWrapper = {
    height: `100%`,
    with: `100%`,
}
const DocFullScreen = ({ setDocFullScreen, setFullScreenDocData, docFullScreen, fullScreenData }) => {

    const currDocDataInStore = useSelector((state) =>
        fullScreenData._id ? state.docs.docsData.find((l) => l._id === fullScreenData._id) : null
    );

    const userId = useSelector((state) => state.user._id);
    const docsState = useSelector((state) => state.docs);
    const isDarkMode = useSelector((state) => state.ui.darkMode);

    const { isLoading, action } = docsState;


    useEffect(() => {
        if (currDocDataInStore) {
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
    const [deleteMode, setDeleteMode] = useState(false);

    const [oldTitle, setOldTitle] = useState('');


    const handleHeaderFooterShowHide = () => {
        setHeaderFooterShow(!headerFooterShow);
    }

    const docMinimises = () => {
        setDocFullScreen(false);
    }

    const editBtnClicked = () => {
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
        const oldData = {
            title: oldTitle
        }
        const newData = {
            title: fullScreenData.imageName
        }
        const activity_data = generateActivityData(3, 'Doc', newData, oldData);
        dispatch(editDocData({
            docId: fullScreenData._id,
            docData: fullScreenData,
            activityData: activity_data,
            userId: userId
        })).then(res => {
            if (res.type === 'docs/edit/fulfilled') {
                setEditMode(false);
            }
        })
    }


    //> Confirm Doc delete_______
    const confirmDeleteBtnClicked = () => {
        setDeleteMode(false);
        const newData = {
            title: fullScreenData.imageName,
            isFavourite: fullScreenData.isFavourite
        }

        const activity_data = generateActivityData(2, 'Doc', newData, '');
        dispatch(deleteDocData({
            docId: fullScreenData._id,
            cloudId: fullScreenData.cloudinary_id,
            userId: userId,
            activityData: activity_data,
        })).then(res => {
            // console.log(res.type);
            if (res.type === 'docs/delete/fulfilled') {
                setDocFullScreen(false)
            }
        })

    }

    //> Doc delete btn clicked_______
    const handleDeleteBtnClicked = () => {
        // confirmDeleteBtnClicked();
        setDeleteMode(true);
        // setDocFullScreen(false)
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
        <div className={`${docFullScreen ? styles.documentFullScreenWrapper : styles.documentFullScreenWrapperClose}`} >
            <DeleteModal
                setDeleteMode={setDeleteMode}
                deleteMode={deleteMode}
                confirmDeleteBtnClicked={confirmDeleteBtnClicked}
                modalStyles={styles}
            />
            <div className={styles.imageContainer} onClick={handleHeaderFooterShowHide}>
                <img src={fullScreenData.imageUrl} />
            </div>

            <div className={headerFooterShow ? styles.headerContainer : styles.headerContainerClose} >
                <div className={styles.backBtnContainer} >

                    {!deleteMode &&
                        <div className={styles.backBtnDiv} onClick={docMinimises}>
                            <BackBtnIcon />
                        </div>
                    }
                </div>
                <div className={styles.deleteBtnContainer} >
                    {
                        !deleteMode &&
                        <div className={styles.deleteBtnDiv} onClick={handleDeleteBtnClicked} >
                            {
                                isLoading && action === 'delete' ?
                                    <Oval
                                        height={`90%`}
                                        width={`90%`}
                                        color="white"
                                        wrapperStyle={spinnerWrapper}
                                        wrapperClass={styles.spinner}
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#E6E6E6"
                                        strokeWidth={5}
                                        strokeWidthSecondary={5}
                                        className={styles.spinner}
                                    />
                                    :
                                    <>
                                        <Icon className={styles.crudIcons} icon="gg:trash-empty" color="white" />
                                        <p>Delete</p>
                                    </>
                            }
                        </div>
                    }
                </div>
                <div className={styles.favBtnContainer} >
                    {!deleteMode &&
                        <div className={styles.favBtnDiv} onClick={handleFavBtnClicked}  >
                            {(isLoading === true && action === 'toggleFav') ?
                                <Oval
                                    height={`80%`}
                                    width={`80%`}
                                    color={isDarkMode ? 'white' : '#002A9A'}
                                    wrapperStyle={spinnerWrapper}
                                    wrapperClass={styles.spinner}
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#E6E6E6"
                                    strokeWidth={5}
                                    strokeWidthSecondary={5}
                                    className={styles.spinner}
                                /> :
                                <>
                                    {
                                        fullScreenData.isFavourite === true ?
                                            <BookmarksIconFill /> :
                                            <BookmarksIcon />
                                    }
                                </>
                            }
                        </div>
                    }
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
                        !deleteMode && (
                            <div className={styles.titleEditBtnDiv} onClick={editBtnClicked} >
                                <Icon className={styles.titleCrudIcon} icon="ph:pencil-simple-line" color="#002A9A" />
                            </div>
                        )
                        :
                        <>
                            <div className={styles.titleSaveBtnDiv} onClick={saveBtnClicked} >
                                {
                                    isLoading && action === 'edit' ?
                                        <Oval
                                            height={`100%`}
                                            width={`100%`}
                                            color="white"
                                            wrapperStyle={spinnerWrapper}
                                            wrapperClass={styles.spinner}
                                            visible={true}
                                            ariaLabel='oval-loading'
                                            secondaryColor="#E6E6E6"
                                            strokeWidth={5}
                                            strokeWidthSecondary={5}
                                            className={styles.spinner}
                                        />
                                        :
                                        <>
                                            <Icon className={styles.titleCrudIcon} icon="charm:tick-double" color="white" />
                                        </>
                                }
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
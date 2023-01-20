import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles/favDocFullScreen.module.css"
import BackBtnIcon from '../../icons/BackBtnIcon';
import BookmarksIconFill from "../../icons/BookmarksIconFill"
import BookmarksIcon from "../../icons/BookmarksIcon"
import { toggleIsFav } from "../../../redux/features/docs/docsSlice"
const FavDocFullScreen = ({ setShowFavDocFullScreen, showFavDocFullScreen,
    setFavDocFullScreenData,
    favDocFullScreenData
}) => {

    const docFavDataInStore = useSelector((state) =>
        favDocFullScreenData._id ? state.favorites.favoriteDocs.find((l) => l._id === favDocFullScreenData._id) : null
    );
    const favDocsArray = useSelector((state => state.favorites.favoriteDocs));

    //> if favDocsArray is changed 
    useEffect(() => {
        // console.log(docFavDataInStore);
        if (docFavDataInStore === undefined) {
            setShowFavDocFullScreen(false);
        }
    }, [favDocsArray])

    const dispatch = useDispatch();
    const [headerFooterShow, setHeaderFooterShow] = useState(true);
    const handleHeaderFooterShowHide = () => {
        setHeaderFooterShow(!headerFooterShow);
    }

    const docMinimises = () => {
        setShowFavDocFullScreen(false);
        setFavDocFullScreenData(undefined);
    }

    //> fav btn Clicked
    const handleFavBtnClicked = () => {
        dispatch(toggleIsFav({
            doc_id: favDocFullScreenData._id,
            isFav: !favDocFullScreenData.isFavourite
        }))
    }

    return (

        <div className={showFavDocFullScreen ? styles.documentFullScreenWrapper : styles.documentFullScreenWrapperClose}>

            <div className={styles.imageContainer} onClick={handleHeaderFooterShowHide}>
                <img src={favDocFullScreenData.imageUrl} />
            </div>

            <div className={headerFooterShow ? styles.headerContainer : styles.headerContainerClose} >
                <div className={styles.backBtnContainer} >
                    <div className={styles.backBtnDiv}
                        onClick={docMinimises}
                    >
                        <BackBtnIcon />
                    </div>
                </div>

                <div className={styles.favBtnContainer} >
                    <div className={styles.favBtnDiv} onClick={handleFavBtnClicked}  >
                        {
                            favDocFullScreenData.isFavourite === true ?
                                <BookmarksIconFill /> :
                                <BookmarksIcon />
                        }
                    </div>

                </div>
            </div>

            <div className={headerFooterShow ? styles.footerContainer : styles.footerContainerClose}  >
                <div className={styles.titleInputDiv} >
                    <p>{favDocFullScreenData.imageName}</p>
                </div>

            </div>
        </div>
    )
}

export default FavDocFullScreen
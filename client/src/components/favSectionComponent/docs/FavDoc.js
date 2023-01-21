import React from 'react'
import styles from "./styles/favDoc.module.css"
import BookmarksIconFill from "../../icons/BookmarksIconFill"
import BookmarksIcon from "../../icons/BookmarksIcon"
const FavDoc = ({ favItem,
    setShowFavDocFullScreen,
    showFavDocFullScreen,
    setFavDocFullScreenData,
    favDocFullScreenData
}) => {

    const docClicked = () => {
        setFavDocFullScreenData(favItem);
        setShowFavDocFullScreen(true);
    }
    return (
        <div className={styles.documentComponentWrapper} >
            <div className={styles.documenComponentContainer}>
                <div className={styles.imageContainer}
                    onClick={docClicked}>
                    <img src={favItem.imageUrl} />
                </div>
                <div className={styles.footerContainer}>
                    <div className={styles.titleDiv} >
                        <p className={styles.titleText}>
                            {favItem.imageName}
                        </p>
                    </div>
                    <div className={styles.favBtnContainer} >
                        <div className={styles.favBtnDiv} >
                            {favItem.isFavourite === true ?
                                <BookmarksIconFill /> :
                                <BookmarksIcon />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavDoc
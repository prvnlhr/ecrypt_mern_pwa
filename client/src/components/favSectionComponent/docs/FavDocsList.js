import React from 'react'
import { useSelector } from 'react-redux'
import FavDoc from './FavDoc';
import styles from "./styles/favDocsList.module.css"
const FavDocsList = ({
    setShowFavDocFullScreen,
    showFavDocFullScreen,
    setFavDocFullScreenData,
    favDocFullScreenData
}) => {
    const favDocsArray = useSelector((state => state.favorites.favoriteDocs));
    return (
        <div className={styles.favDocsList}>
            <div className={styles.contentContainer} >
                {
                    favDocsArray.map((item) => (
                        <FavDoc
                            key={item._id}
                            favItem={item}
                            setShowFavDocFullScreen={setShowFavDocFullScreen}
                            showFavDocFullScreen={showFavDocFullScreen}
                            setFavDocFullScreenData={setFavDocFullScreenData}
                            favDocFullScreenData={favDocFullScreenData}

                        />
                    ))
                }
            </div>

        </div>
    )
}

export default FavDocsList
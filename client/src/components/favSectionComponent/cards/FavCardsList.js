import React, { useState } from 'react'
import FavCard from './FavCard'
import { useSelector } from 'react-redux'
import styles from "./styles/favCardsList.module.css"
import FullCardComponent from "./FullCardComponent"
const FavCardsList = () => {

    const favCardsArray = useSelector((state => state.favorites.favoriteCards));
    const [showFullFavCard, setShowFullFavCard] = useState(false);
    const [favFullCardData, setFavFullCardData] = useState({});

    const handleFavCardClick = (favItemData) => {
        setFavFullCardData(favItemData)
        setShowFullFavCard(!showFullFavCard);
    }

    return (
        <div className={styles.favCardsListWrapper} >

            <div className={showFullFavCard ? styles.contentContainerClose : styles.contentContainer} >

                {
                    // !showFullFavCard &&

                    favCardsArray.map((item) => (
                        <FavCard
                            key={item._id}
                            favItem={item}
                            handleFavCardClick={handleFavCardClick}
                        />

                    ))
                }
            </div>
            <FullCardComponent
                showFullFavCard={showFullFavCard}
                setShowFullFavCard={setShowFullFavCard}
                handleFavCardClick={handleFavCardClick}
                favFullCardData={favFullCardData}
                setFavFullCardData={setFavFullCardData}
            />
        </div>
    )
}
export default FavCardsList
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles/favLoginIdsList.module.css"
import FavLoginId from "./FavLoginId"
import FullContentCard from "./FullContentCard"
const FavLoginIdsList = () => {
    const favLoginsArray = useSelector((state => state.favorites.favoriteLoginIds));

    const [showFullFavCard, setShowFullFavCard] = useState(false);

    const [favFullCardData, setFavFullCardData] = useState({});

    const handleFavLoginIdClick = (favItemData) => {
        setFavFullCardData(favItemData)
        setShowFullFavCard(!showFullFavCard);
    }


    return (
        <div className={styles.favLoginListWrapper}  >
            <div
                className={showFullFavCard ? styles.contentContainerClose : styles.contentContainer} >
                {
                    !showFullFavCard &&
                    favLoginsArray.map((item, index) => (
                        <FavLoginId
                            key={item._id}
                            favItem={item}
                            handleFavLoginIdClick={handleFavLoginIdClick}
                        />
                    ))
                }
            </div>

            <FullContentCard
                showFullFavCard={showFullFavCard}
                setShowFullFavCard={setShowFullFavCard}
                handleFavLoginIdClick={handleFavLoginIdClick}
                favFullCardData={favFullCardData}
            />
            {/* {
                showFullFavCard &&
            } */}

        </div>
    )
}

export default FavLoginIdsList
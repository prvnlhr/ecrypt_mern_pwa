import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles/favLoginIdsList.module.css"
import FavLoginId from "./FavLoginId"
import FullContentCard from "./FullContentCard"
const FavLoginIdsList = () => {

    const favLoginsArray = useSelector((state => state.favorites.favoriteLoginIds));

    return (
        <div className={styles.favLoginListWrapper}>
            <div className={styles.contentContainer} >

                {
                    favLoginsArray.map((item, index) => (
                        <FavLoginId
                            key={item._id}
                            favItem={item}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default FavLoginIdsList
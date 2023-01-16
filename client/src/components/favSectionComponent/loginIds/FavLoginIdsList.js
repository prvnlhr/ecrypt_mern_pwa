import React from 'react'
import styles from "./styles/favLoginIdsList.module.css"
import FavLoginId from "./FavLoginId"
import FullContentCard from "./FullContentCard"
const FavLoginIdsList = () => {
    return (
        <div className={styles.favLoginListWrapper}>
            <div className={styles.contentContainer} >
                <FavLoginId />
            </div>
            {/* <FullContentCard /> */}
        </div>
    )
}

export default FavLoginIdsList
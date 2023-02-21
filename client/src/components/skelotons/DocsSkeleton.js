import React from 'react'
import styles from "./styles/docsSkeleton.module.css"
import Shimmer from "../skelotons/Shimmer"

const DocsSkeleton = () => {
    return (
        <div
            className={`${styles.documentComponentWrapper} `} >
            <div className={styles.documenComponentContainer}>
                <div className={styles.imageContainer}>
                    <Shimmer />
                </div>
                <div className={styles.footerContainer}>
                    <div className={styles.titleDiv} >
                        <Shimmer />

                    </div>
                    <div className={styles.favBtnContainer} >
                        <div className={styles.favBtnDiv} >
                            <Shimmer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocsSkeleton
import React from 'react'
import styles from "./styles/skeleton.module.css"
const Shimmer = () => {
    return (
        <div className={styles.shimmerWrapper}>
            <div className={styles.shimmer}></div>
        </div>
    )
}

export default Shimmer
import React from 'react'
import styles from "./styles/skeleton.module.css"
import Shimmer from './Shimmer'
const LoginIdSkeleton = () => {
    return (
        <div className={styles.skeletonWrapper} >
            <div className={styles.logoWrapper}>
                <div className={`${styles.logoDiv}`}>
                    <Shimmer />
                </div>
            </div>
            <div className={styles.titleWrapper}>
                <div className={styles.titleDiv} >
                    <Shimmer />
                </div>
            </div>
            <div className={styles.usernameWrapper}>
                <div className={styles.usernameDiv} >
                    <Shimmer />
                </div>
            </div>
        </div>

    )
}

export default LoginIdSkeleton
import React from 'react'
import styles from "./styles/activityWrapper.module.css"

const ActivityComponentOuter = () => {
    return (
        <div className={styles.activityWrapperOuter}>

            <div className={styles.innerBox} ></div>
            <div className={styles.innerBox} ></div>
            <div className={styles.innerBox} ></div>
        </div>
    )
}

export default ActivityComponentOuter
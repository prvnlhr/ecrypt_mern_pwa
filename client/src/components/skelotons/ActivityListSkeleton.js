import React from 'react'
import styles from "./styles/recentActivitySkeleton.module.css"
import Shimmer from "../skelotons/Shimmer"
const ActivityListSkeleton = () => {
    return (
        <div className={styles.activityWrapperOuter}>

            <div className={styles.dateTimeTaskTypeWrapper} >

                <div className={styles.dateWrapper}>
                    <div className={styles.dateContainer}>
                        <div className={styles.dateDiv} >
                            <Shimmer />
                        </div>
                    </div>
                </div>
                {/* 

                <div className={styles.timeWrapper}>
                    <div className={styles.timeContainer} >
                        <Shimmer />
                    </div>
                </div> */}


                <div className={styles.typeWrapper}>
                    <div className={styles.typeContainer} >
                        <div className={styles.typeDiv}>
                            <Shimmer />
                        </div>
                    </div>
                </div>

                <div className={styles.taskWrapper}>
                    <div className={`${styles.taskContainer}`} >
                        <div className={styles.taskDiv}>
                            <Shimmer />
                        </div>
                    </div>
                </div>

            </div>

            <div className={styles.fieldWrapper} >
                <div className={styles.oldValDiv}>
                    <Shimmer />
                </div>
                <div className={styles.newValDiv}>
                    <Shimmer />
                </div>
                <div></div>

            </div>
        </div >
    )
}

export default ActivityListSkeleton
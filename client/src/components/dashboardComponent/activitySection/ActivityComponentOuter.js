import React from 'react'
import styles from "./styles/activityWrapper.module.css"
import ChangeFieldComponent from "./ChangeFieldComponent"

const ActivityComponentOuter = ({ activity }) => {

    Object.entries(activity).map(([key, val]) => (
        console.log(key, val.oldVal, val.newVal)
    ))

    return (
        <div className={styles.activityWrapperOuter}>

            <div className={styles.dateTimeTaskTypeWrapper} >

                <div className={styles.dateWrapper}>
                    <div className={styles.dateContainer} >

                        <div className={styles.monthDiv} >
                            <p>Oct</p>
                        </div>
                        <div className={styles.dateDiv} >
                            <p>16</p>
                        </div>
                    </div>
                </div>


                <div className={styles.timeWrapper}>
                    <div className={styles.timeContainer} >
                        <p>09 : 12 AM</p>
                    </div>
                </div>


                <div className={styles.typeWrapper}>
                    <div className={styles.typeContainer} >
                        <p>{activity.type}</p>
                    </div>
                </div>


                <div className={styles.taskWrapper}>
                    <div className={styles.taskContainer} >
                        <p>{activity.task}</p>
                    </div>
                </div>

            </div>

            {Object.entries(activity).map(([item, val]) => (

                < ChangeFieldComponent
                    item={item}
                    value={val}
                />

            ))}




        </div>
    )
}

export default ActivityComponentOuter

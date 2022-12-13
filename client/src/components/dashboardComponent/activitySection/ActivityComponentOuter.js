import React from 'react'
import styles from "./styles/activityWrapper.module.css"
import ChangeFieldComponent from "./ChangeFieldComponent"
import NewDeletedField from './NewDeletedField';

const ActivityComponentOuter = ({ activity }) => {




    console.log(activity.type);

    return (
        <div className={styles.activityWrapperOuter}>

            <div className={styles.dateTimeTaskTypeWrapper} >

                <div className={styles.dateWrapper}>
                    <div className={styles.dateContainer} >

                        <div className={styles.monthDiv} >
                            <p>{activity.month}</p>
                        </div>
                        <div className={styles.dateDiv} >
                            <p>{activity.date}</p>
                        </div>
                    </div>
                </div>


                <div className={styles.timeWrapper}>
                    <div className={styles.timeContainer} >
                        <p>{activity.time}</p>
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




            {activity.subType == 2 ?

                Object.entries(activity).map(([item, val]) => (
                    < ChangeFieldComponent
                        item={item}
                        value={val}
                    />

                ))
                :

                Object.entries(activity).map(([item, val]) => (
                    < NewDeletedField
                        item={item}
                        activity={activity}
                    />
                ))

            }





        </div>
    )
}

export default ActivityComponentOuter

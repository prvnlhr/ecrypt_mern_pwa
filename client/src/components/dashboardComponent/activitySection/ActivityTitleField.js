import React from 'react'
import styles from "./styles/activityTitleField.module.css"

const ActivityTitleField = ({ activity }) => {
    // console.log(activity.contentTitle);
    return (
        <>
            < div className={styles.fieldWrapper} >
                <div className={styles.fieldContainer} >
                    <div className={styles.fieldNameLabelWrapper} >
                        <p>Title - </p>
                    </div>
                    <div className={styles.valWrapper} >
                        <p>
                            {
                                activity.contentTitle !== undefined &&
                                activity.contentTitle
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityTitleField
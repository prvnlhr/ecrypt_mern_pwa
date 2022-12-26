import React from 'react'
import styles from "./styles/newDeleteField.module.css"

const NewDeletedField = ({ item, activity }) => {
    // console.log(activity[item])
    return (
        <>
            {
                item == "task" ? null
                    : item == "type" ? null
                        : item == "subType" ? null
                            : item == "date" ? null
                                : item == "time" ? null
                                    : item == "month" ? null
                                        :

                                        <div className={styles.fieldWrapper} >
                                            <div className={styles.fieldContainer} >
                                                <div className={styles.fieldNameLabelWrapper} >
                                                    <p>{item} - </p>
                                                </div>
                                                <div className={styles.valWrapper} >
                                                    <p>
                                                        {activity[item]}
                                                    </p>
                                                </div>
                                            </div>


                                        </div>
            }
        </>

    )
}

export default NewDeletedField
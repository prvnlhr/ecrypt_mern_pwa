import React from 'react'
import styles from "./styles/newDeleteField.module.css"

const NewAddedDeletedField = ({ item, activity }) => {
    // console.log(item, activity[item])
    const key = (item[0].toUpperCase() + item.slice(1));
    // console.log(key)


    return (
        <>
            {
                item == "task" ? null
                    : item == "type" ? null
                        : item == "subType" ? null
                            : item == "date" ? null
                                : item == "time" ? null
                                    : item == "month" ? null
                                        : item == "logoIndex" ? null
                                            : item == "isFavourite" ? null
                                                : item == "_id" ? null
                                                    :
                                                    <div className={styles.fieldWrapper} >
                                                        <div className={styles.fieldContainer} >
                                                            <div className={styles.fieldNameLabelWrapper} >
                                                                <p>{key} - </p>
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

export default NewAddedDeletedField
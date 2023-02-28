import React from 'react'
import styles from "./styles/editField.module.css"
const EditFieldComponent = ({ item, value }) => {
    // console.log(typeof (item), item)
    const key = (item[0].toUpperCase() + item.slice(1));

    return (
        <>
            {
                item == "type" ? null
                    : item == "task" ? null
                        : item == "subType" ? null
                            : item == "date" ? null
                                : item == "time" ? null
                                    : item == "_id" ? null
                                        : item == "month" ? null :

                                            <div className={styles.fieldWrapper} >

                                                <div className={styles.fieldContainer}>

                                                    <div className={styles.upperPartition} >
                                                        <div className={styles.fieldNameLabelWrapper} >
                                                            <p>
                                                                {key} -
                                                            </p>
                                                        </div>
                                                        <div className={styles.oldValueWrapper} >
                                                            <p>
                                                                {value.oldVal}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className={styles.lowerPartition} >
                                                        <div className={styles.arrowElementWrapper}></div>
                                                        <div className={styles.changedToLableWrapper}>
                                                            <p>Changed to - </p>
                                                        </div>
                                                        <div className={styles.newValueWrapper}>
                                                            <p>
                                                                {value.newVal}
                                                            </p>
                                                        </div>
                                                        {/* <div className={styles.angleArrowDiv}></div>
                                                        <div className={styles.changeToLabelWrapper} >
                                                            <div className={styles.changeToLabelDiv}>
                                                                <p className={styles.changeToLabelText}>Changed to - </p>
                                                            </div>
                                                        </div>
                                                        <div className={styles.newValWrapper} >
                                                           
                                                        </div> */}
                                                    </div>

                                                </div>
                                            </div>

            }
        </>
    )

}

export default EditFieldComponent
import React from 'react'
import styles from "./styles/fieldComponent.module.css"
const ChangeFieldComponent = ({ item, value }) => {
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
                                                        <div className={styles.oldValWrapper} >
                                                            <p>
                                                                {value.oldVal}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className={styles.lowerPartition} >
                                                        <div className={styles.changeToLabelWrapper} >
                                                            <p>Changed to - </p>
                                                        </div>
                                                        <div className={styles.newValWrapper} >
                                                            <p>
                                                                {value.newVal}
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

            }
        </>
    )

}

export default ChangeFieldComponent
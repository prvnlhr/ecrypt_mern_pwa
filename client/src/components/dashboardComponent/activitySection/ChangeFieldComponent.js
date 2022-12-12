import React from 'react'
import styles from "./styles/fieldComponent.module.css"
const ChangeFieldComponent = ({ item, value }) => {
    console.log(typeof (item), item)
    return (
        <>
            {
                item == "type" ? (null) : item == "task" ? null :
                    <div className={styles.fieldWrapper} >

                        <div className={styles.fieldContainer}>

                            <div className={styles.upperPartition} >
                                <div className={styles.fieldNameLabelWrapper} >
                                    <p>
                                        {item} -
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
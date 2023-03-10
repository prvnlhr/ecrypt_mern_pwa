import React from 'react'
import styles from "./styles/monthList.module.css"
import { motion } from "framer-motion"

const MonthList = ({ currSelectedDate, setCurrSelectedDate, handleClickedItem, setCurrSelectedList }) => {

    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return (
        <div className={styles.monthList} >

            {monthsArray.map((item, index) => (
                <motion.div className={`${styles.monthDiv} `}
                    initial={{
                        opacity: 0,
                        // translateX: -10,
                        translateY: -5,
                    }}
                    animate={{
                        opacity: 1,
                        // translateX: 0,
                        translateY: 0,
                    }}
                    transition={{
                        duration: 0.2,
                        delay: 0.15
                    }}
                >

                    <div className={`${styles.monthInnerDiv}  ${currSelectedDate.month == item && styles.selectedDivStyle}`}>
                        <p onClick={(e) => {
                            handleClickedItem(e, 'month')
                            setCurrSelectedList('DAYS')
                        }} >{item}</p>
                    </div>
                </motion.div>
            ))}

        </div>
    )
}

export default MonthList
import React from 'react'
import styles from "./styles/monthList.module.css"
const MonthList = ({ currSelectedDate, setCurrSelectedDate, handleClickedItem }) => {

    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return (
        <div className={styles.monthList} >

            {monthsArray.map((item, index) => (
                <div className={`${styles.monthDiv} `} >

                    <div className={`${styles.monthInnerDiv}  ${currSelectedDate.month == item && styles.selectedDivStyle}`}>
                        <p onClick={(e) => { handleClickedItem(e, 'month') }} >{item}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default MonthList
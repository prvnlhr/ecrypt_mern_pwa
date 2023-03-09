import React, { useEffect } from 'react'
import moment from 'moment';
import styles from "./styles/dayList.module.css"
const DayList = ({ currSelectedDate, setCurrSelectedDate, handleClickedItem }) => {

    const { startOfMonth, numDays, date, month, year } = currSelectedDate;

    let daysArray = Array.from(Array(moment('2020-02').daysInMonth()), (_, i) => i + 1)

    //  0 -> Sun 
    //  1 -> Mon 
    //  2 -> Tue
    //  3 -> Wed
    //  4 -> Thu
    //  5 -> Fri  
    //  6 -> Sat

    const weekDaysArray = ['M', 'T', 'W', 'T', 'F', 'S', 'S']


    const getStartOfWeek = (selectedYear, selectedMonth) => {
        const currStartDayOfWeek = moment(`${selectedYear + '-' + selectedMonth}`);
        const dow = currStartDayOfWeek.day();
        return dow;
    }


    const getDataArr = (numDays, startOfMonth) => {
        let monthArr = [];
        let dayNum = 1;

        for (let i = 1; i <= (numDays + startOfMonth - 1); i++) {
            if (i < startOfMonth) {
                monthArr.push(<div className={styles.dateDiv} >
                </div>)
            } else {
                monthArr.push(
                    <div key={i} className={`${styles.dateDiv}  `} >
                        <div className={`${styles.dateInnerDiv} ${currSelectedDate.date == dayNum && styles.selectedDivStyle}  `}>
                            <p onClick={(e) => { handleClickedItem(e, 'date') }}>{dayNum}</p>
                        </div>
                    </div>);
                dayNum++;
            }
        }

        return monthArr;
    }
    const renderCalender = () => {

        const startDayOfWeek = getStartOfWeek(year, month);

        const currMonthNumOfDays = moment(`${year + '-' + month}`).daysInMonth();

        console.log(startDayOfWeek, currMonthNumOfDays);

        const dataToRender = getDataArr(currMonthNumOfDays, startDayOfWeek);
        // console.log(dataToRender);
        return dataToRender;
    }

    return (
        <div className={styles.dayList} >

            <div className={styles.weekDaysContainer} >
                {weekDaysArray.map((item, index) => (
                    <div className={`${styles.weekDayDiv}`} >
                        <p>{item}</p>
                    </div>
                ))}
            </div>
            <div className={styles.dayListContainer} >
                {renderCalender()}
            </div>
        </div>
    )
}

export default DayList
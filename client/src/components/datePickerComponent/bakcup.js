import React, { useState } from 'react'
import styles from "./styles/datePicker.module.css"
import moment from 'moment'
const DatePicker = () => {

    const date = moment().format('DD');
    const month = moment().format('MMM');
    const year = moment().format('YYYY');


    // const input = "04-23";
    // const output = moment(input, "MM-YY");
    // console.log('Start of the month:', output.startOf('month').format('LL'));
    // console.log('End of the month:', output.endOf('month').format('LL'));



    // 0:Sun,   1:Mon,  2:Tue,  3:Wed,  4:Thu,  5:Fri,  6:Sat
    const dates = moment("2023-01"); // Thursday Feb 2015
    const dow = dates.day();
    console.log(dow);


    const [currSeletedDate, setCurrSeletedDate] = useState({
        selectedDate: date,
        selectedMonth: month,
        selectedYear: year,
    });
    const [currSelectedList, setCurrSelectedList] = useState('date')


    const daysArray = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ]
    const monthsArray = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const yearList = () => {
        let items = [];
        for (let i = 1900; i <= 2050; i++) {
            items.push(
                <div key={i} className={`${styles.yearDiv}  ${currSeletedDate.selectedYear == i && styles.selectedDivStyle}`}>
                    <p onClick={handleValueClicked}>{i}</p>
                </div >
            )
        }
        return items;
    }



    const handleValueClicked = (e) => {
        if (currSelectedList === 'date') {
            // console.log('Date:', e.target.innerText);
            setCurrSeletedDate({
                ...currSeletedDate,
                selectedDate: e.target.innerText
            })
        }
        if (currSelectedList === 'month') {
            // console.log('Month:', e.target.innerText);
            setCurrSeletedDate({
                ...currSeletedDate,
                selectedMonth: e.target.innerText.slice(0, 3)
            })
        }
        if (currSelectedList === 'year') {
            // console.log('Year:', e.target.innerText);
            setCurrSeletedDate({
                ...currSeletedDate,
                selectedYear: e.target.innerText
            })
        }
    }

    const handleSelectBtnClicked = () => {
        console.log(currSeletedDate.selectedDate + " " + currSeletedDate.selectedMonth + " " + currSeletedDate.selectedYear)
    }
    return (
        <div className={styles.datePickerWrapper}>

            <div className={styles.topDisplaySection} >
                <div className={styles.displayDateContainer} onClick={() => { setCurrSelectedList('date') }} >
                    <div className={`${styles.displayDateDiv} ${currSelectedList === 'date' && styles.displaySelectedDivStyle}`} >
                        <p className={styles.dateText} >{currSeletedDate.selectedDate}</p>
                    </div>
                </div>

                <div className={styles.displayMonthContainer} onClick={() => { setCurrSelectedList('month') }} >
                    <div className={`${styles.displayMonthDiv} ${currSelectedList === 'month' && styles.displaySelectedDivStyle}`} >
                        <p className={styles.monthText} >{currSeletedDate.selectedMonth}</p>
                    </div>
                </div>
                <div className={styles.displayYearContainer} onClick={() => { setCurrSelectedList('year') }} >
                    <div className={styles.slashDiv}>
                    </div>
                    <div className={`${styles.displayYearDiv} ${currSelectedList === 'year' && styles.displaySelectedDivStyle}`} >
                        <p className={styles.yearText} >{currSeletedDate.selectedYear}</p>
                    </div>
                </div>




            </div>
            <div className={styles.dateWrapper} >
                <div className={styles.listContainer} >






                    {currSelectedList === 'month' ?

                        monthsArray.map((item, index) => (
                            <div className={`${styles.monthDiv} ${currSeletedDate.selectedMonth == item && styles.selectedDivStyle}`}>
                                <p onClick={handleValueClicked}>
                                    {item}
                                </p>
                            </div>
                        ))
                        :
                        currSelectedList === 'date' ?
                            daysArray.map((item, index) => (
                                <div className={`${styles.dateDiv}
                                 ${currSeletedDate.selectedDate == item && styles.selectedDivStyle}`}   >
                                    <p onClick={handleValueClicked}  >{item}</p>
                                </div>
                            ))

                            : currSelectedList === 'year' &&
                            yearList()
                    }
                </div>

            </div>
            <div className={styles.footerWrapper} >
                <div className={styles.cancelDiv} >
                    <p>Cancel</p>
                </div>
                <div className={styles.selectDiv} onClick={handleSelectBtnClicked} >
                    <p>Select</p>
                </div>
            </div>
        </div >
    )
}

export default DatePicker
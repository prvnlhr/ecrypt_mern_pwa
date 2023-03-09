import React, { useState, useEffect } from 'react'
import styles from "./styles/datePicker.module.css"
import DayList from "./DayList"
import MonthList from "./MonthList"
import YearList from "./YearList"
import moment from 'moment'
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion"


const DatePicker = ({ showDatePicker, setShowDatePicker, toggleDatePicker, handleFormDataChange, cardData }) => {

    const momentDate = moment().format('DD');
    const momentMonth = moment().format('MMMM');
    const momentYear = moment().format('YYYY');


    const currStartDayOfWeek = moment(`${momentYear + '-' + momentMonth}`);
    const dow = currStartDayOfWeek.day();

    const currMonthNumOfDays = moment(`${momentYear + '-' + momentMonth}`).daysInMonth();

    const [currSelectedList, setCurrSelectedList] = useState('DAYS');

    const [currSelectedDate, setCurrSelectedDate] = useState({
        startOfMonth: dow,
        numDays: currMonthNumOfDays,
        date: momentDate,
        month: momentMonth,
        year: momentYear,
    })

    // useEffect(() => {
    //     setCurrSelectedDate({
    //         startOfMonth: dow,
    //         numDays: currMonthNumOfDays,
    //         date: momentDate,
    //         month: momentMonth,
    //         year: momentYear,
    //     })
    // }, [])

    const handleChangeCurrList = (clickedList) => {
        setCurrSelectedList(clickedList);
    }

    const handleClickedItem = (e, val) => {
        console.log(e.target.innerText, val);
        setCurrSelectedDate({
            ...currSelectedDate,
            [val]: e.target.innerText,
        })
    }

    const monthMap = {
        January: '01',
        February: '02',
        March: '03',
        April: '04',
        May: '05',
        June: '06',
        July: '07',
        August: '08',
        September: '09',
        October: '10',
        November: '11',
        December: '12',
    }
    const handleSelectBtnClicked = (e) => {
        const DD = currSelectedDate.date;
        const MM = monthMap[currSelectedDate.month];
        const YY = currSelectedDate.year.slice(-2);
        console.log(DD, MM, YY)
        let formattedDate = '';
        switch (cardData.category) {
            case 'Bank':
                formattedDate = MM + '/' + YY;
                cardData[showDatePicker.key] = formattedDate;
                break;
            case 'Identity':
                // console.log(showDatePicker.key);
                if (showDatePicker.key === 'dob') {
                    formattedDate = DD + '/' + MM + '/' + YY;
                } else {
                    formattedDate = MM + '/' + YY;
                }
                cardData[showDatePicker.key] = formattedDate;
                break;

            case 'License':
                if (showDatePicker.key === 'dob') {
                    formattedDate = DD + '/' + MM + '/' + YY;
                } else {
                    formattedDate = MM + '/' + YY;
                }
                cardData[showDatePicker.key] = formattedDate;
                break;

            default:
                break;
        }
        // console.log(formattedDate);
        // console.log(cardData);
        toggleDatePicker(e);
        // console.log(currSelectedDate.date + " " + currSelectedDate.month + " " + currSelectedDate.year);
    }


    return (
        <AnimatePresence>
            {
                showDatePicker.visibility &&
                <motion.div
                    className={`${styles.datePickerWrapper}`}
                    initial={{
                        scaleX: 0,
                        scaleY: 0,
                        // y: -10
                    }}
                    animate={{
                        scaleX: 1,
                        scaleY: 1,
                        y: 0,
                        transition: {
                            duration: 0.05,
                            type: 'spring'
                        },

                    }}
                    exit={{
                        // y: -10,
                        scaleX: 0,
                        scaleY: 0,
                        transition: {
                            duration: 0.1,
                            type: 'spring'

                        },
                    }}
                >

                    <div className={styles.displayDateSection} >
                        <div className={styles.closeIconDiv} onClick={toggleDatePicker}>
                            <Icon className={styles.closeIcon} icon="ph:x-bold" />
                        </div>
                        <div className={`${styles.displayDateDiv} ${currSelectedList === 'DAYS' && styles.displayDateSelectedDiv} `} onClick={() => handleChangeCurrList('DAYS')} >
                            <p className={`${styles.displayDateFont} ${currSelectedList === 'DAYS' && styles.displayDateFontSelected} `}  >{currSelectedDate.date}</p>
                        </div>
                        <div className={`${styles.displayDateDiv} ${currSelectedList === 'MONTH' && styles.displayDateSelectedDiv}`} onClick={() => handleChangeCurrList('MONTH')} >
                            <p className={`${styles.displayDateFont}  ${currSelectedList === 'MONTH' && styles.displayDateFontSelected} `}  >{currSelectedDate.month}</p>
                        </div>
                        <div className={`${styles.displayDateDiv} ${currSelectedList === 'YEAR' && styles.displayDateSelectedDiv}`} onClick={() => handleChangeCurrList('YEAR')} >
                            <p className={`${styles.displayDateFont}  ${currSelectedList === 'YEAR' && styles.displayDateFontSelected} `} >{currSelectedDate.year}</p>
                        </div>
                    </div>

                    <div className={styles.calenderSection} >
                        {currSelectedList === 'MONTH' ?
                            <MonthList currSelectedDate={currSelectedDate} setCurrSelectedDate={setCurrSelectedDate} handleClickedItem={handleClickedItem} />
                            : currSelectedList === 'YEAR' ? <YearList currSelectedDate={currSelectedDate} setCurrSelectedDate={setCurrSelectedDate} handleClickedItem={handleClickedItem} />
                                : currSelectedList === 'DAYS' && <DayList currSelectedDate={currSelectedDate} setCurrSelectedDate={setCurrSelectedDate} handleClickedItem={handleClickedItem} />
                        }
                    </div>
                    <div className={styles.btnSection} >
                        <div className={`${styles.cancelBtnDiv} ${styles.btnDiv} `} >
                            <p>Cancel</p>
                        </div>
                        <div className={`${styles.confirmBtnDiv} ${styles.btnDiv} `} onClick={handleSelectBtnClicked} >
                            <p>Select</p>
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence >

    )
}

export default DatePicker
import React, { useState, useEffect } from "react";
import styles from "./styles/datePicker.module.css";
import DayList from "./DayList";
import MonthList from "./MonthList";
import YearList from "./YearList";
import moment from "moment";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

const DatePicker = ({ showDatePicker, toggleDatePicker, cardData }) => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);

  const momentDate = moment().format("DD");
  const momentMonth = moment().format("MMMM");
  const momentYear = moment().format("YYYY");

  const currStartDayOfWeek = moment(`${momentYear + "-" + momentMonth}`);
  const dow = currStartDayOfWeek.day();

  const currMonthNumOfDays = moment(
    `${momentYear + "-" + momentMonth}`
  ).daysInMonth();

  const [currSelectedList, setCurrSelectedList] = useState("DAYS");

  const [currSelectedDate, setCurrSelectedDate] = useState({
    startOfMonth: dow,
    numDays: currMonthNumOfDays,
    date: momentDate,
    month: momentMonth,
    year: momentYear,
  });

  const handleChangeCurrList = (clickedList) => {
    setCurrSelectedList(clickedList);
  };

  const handleClickedItem = (e, val) => {
    // console.log(e.target.innerText, val);
    setCurrSelectedDate({
      ...currSelectedDate,
      [val]: e.target.innerText,
    });
  };
  const monthIndexMap = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  const handleSelectBtnClicked = (e) => {
    const DD = currSelectedDate.date;
    const MM = monthMap[currSelectedDate.month];
    const YY = currSelectedDate.year.slice(-2);
    console.log(DD, MM, YY);
    let formattedDate = "";
    switch (cardData.category) {
      case "Bank":
        formattedDate = MM + "/" + YY;
        cardData[showDatePicker.key] = formattedDate;
        break;
      case "Identity":
        // console.log(showDatePicker.key);
        if (showDatePicker.key === "dob") {
          formattedDate = DD + "/" + MM + "/" + YY;
        } else {
          formattedDate = MM + "/" + YY;
        }
        cardData[showDatePicker.key] = formattedDate;
        break;

      case "License":
        if (showDatePicker.key === "dob") {
          formattedDate = DD + "/" + MM + "/" + YY;
        } else {
          formattedDate = MM + "/" + YY;
        }
        cardData[showDatePicker.key] = formattedDate;
        break;

      default:
        break;
    }
    toggleDatePicker(e);
  };

  const toggleMonth = (toggleVal) => {
    // const currMonthIndex = monthIndexMap[currSelectedDate.month];
    let currYear = currSelectedDate.year;
    const currMonthIndex = moment().month(currSelectedDate.month).format("M");
    // console.log(currMonthIndex, typeof currMonthIndex);

    let toggleIndex = parseInt(currMonthIndex, 10) + toggleVal;
    if (toggleIndex <= 0) {
      toggleIndex = 12;
      currYear--;
    } else if (toggleIndex >= 12) {
      toggleIndex = 1;
      currYear++;
    }
    setCurrSelectedDate({
      ...currSelectedDate,
      month: monthIndexMap[toggleIndex],
      year: currYear,
    });
  };

  const toggleYear = (toggleVal) => {
    let currYear = currSelectedDate.year;
    // console.log(typeof currYear, currYear);
    let num = parseInt(currYear, 10) + toggleVal;
    let newYear = num.toString(10);
    // console.log(typeof newYear, newYear);
    setCurrSelectedDate({
      ...currSelectedDate,
      year: newYear,
    });
  };

  return (
    <AnimatePresence>
      {showDatePicker.visibility && (
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
              type: "spring",
            },
          }}
          exit={{
            // y: -10,
            scaleX: 0,
            scaleY: 0,
            transition: {
              duration: 0.1,
              type: "spring",
            },
          }}
        >
          <div className={styles.displayDateSection}>
            <div className={styles.monthToggleBtnContainer}>
              <motion.div
                className={styles.monthToggleDiv}
                onClick={() => toggleYear(-1)}
                whileTap={{
                  scale: 0.5,
                  transition: {
                    ease: "easeInOut",
                  },
                }}
              >
                <svg
                  className={styles.monthToggleBtn}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                    fill={isDarkMode ? "#7E8DA4" : "#2B3F6C"}
                    fillOpacity="0.2"
                  />
                  <path
                    d="M14.9998 9L12.7069 11.2929C12.3164 11.6834 12.3164 12.3166 12.7069 12.7071L14.9998 15"
                    stroke={isDarkMode ? "#5294E2" : "#2B3F6C"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.5858 9L8.29287 11.2929C7.90237 11.6834 7.90237 12.3166 8.29287 12.7071L10.5858 15"
                    stroke={isDarkMode ? "#5294E2" : "#2B3F6C"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              <motion.div
                className={styles.monthToggleDiv}
                onClick={() => toggleMonth(-1)}
                whileTap={{
                  scale: 0.5,
                  transition: {
                    ease: "easeInOut",
                  },
                }}
              >
                <svg
                  className={styles.monthToggleBtn}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    fill={isDarkMode ? "#7E8DA4" : "#2B3F6C"}
                    fillOpacity="0.2"
                  />
                  <path
                    d="M13 9L10.7071 11.2929C10.3166 11.6834 10.3166 12.3166 10.7071 12.7071L13 15"
                    stroke={isDarkMode ? "#5294E2" : "#2B3F6C"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            </div>

            <div className={styles.displayDateContainer}>
              <div
                className={`${styles.displayDateDiv} ${
                  currSelectedList === "MONTH" && styles.displayDateSelectedDiv
                }`}
                onClick={() => handleChangeCurrList("MONTH")}
              >
                <p
                  className={`${styles.displayDateMonthFont}  ${
                    currSelectedList === "MONTH" &&
                    styles.displayDateFontSelected
                  } `}
                >
                  {currSelectedDate.month}
                </p>
              </div>
              <div
                className={`${styles.displayDateDiv} ${
                  currSelectedList === "YEAR" && styles.displayDateSelectedDiv
                }`}
                onClick={() => handleChangeCurrList("YEAR")}
              >
                <p
                  className={`${styles.displayDateYearFont}  ${
                    currSelectedList === "YEAR" &&
                    styles.displayDateFontSelected
                  } `}
                >
                  {currSelectedDate.year}
                </p>
              </div>
            </div>

            <div className={styles.monthToggleBtnContainer}>
              <motion.div
                className={styles.monthToggleDiv}
                onClick={() => toggleMonth(1)}
                whileTap={{
                  scale: 0.5,
                  transition: {
                    ease: "easeInOut",
                  },
                }}
              >
                <svg
                  className={styles.monthToggleBtn}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="20"
                    height="20"
                    rx="5"
                    transform="matrix(-1 0 0 1 22 2)"
                    fill={isDarkMode ? "#7E8DA4" : "#2B3F6C"}
                    fillOpacity="0.2"
                  />
                  <path
                    d="M11 9L13.2929 11.2929C13.6834 11.6834 13.6834 12.3166 13.2929 12.7071L11 15"
                    stroke={isDarkMode ? "#5294E2" : "#2B3F6C"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              <motion.div
                className={styles.monthToggleDiv}
                onClick={() => toggleYear(1)}
                whileTap={{
                  scale: 0.5,
                  transition: {
                    ease: "easeInOut",
                  },
                }}
              >
                <svg
                  className={styles.monthToggleBtn}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 22L17 22C19.7614 22 22 19.7614 22 17L22 7C22 4.23858 19.7614 2 17 2L7 2C4.23858 2 2 4.23858 2 7L2 17C2 19.7614 4.23858 22 7 22Z"
                    fill={isDarkMode ? "#7E8DA4" : "#2B3F6C"}
                    fillOpacity="0.2"
                  />
                  <path
                    d="M9.00016 15L11.2931 12.7071C11.6836 12.3166 11.6836 11.6834 11.2931 11.2929L9.00016 9"
                    stroke={isDarkMode ? "#5294E2" : "#2B3F6C"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.4142 15L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L13.4142 9"
                    stroke={isDarkMode ? "#5294E2" : "#2B3F6C"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            </div>
          </div>

          <div className={styles.calenderSection}>
            {currSelectedList === "MONTH" ? (
              <MonthList
                setCurrSelectedList={setCurrSelectedList}
                currSelectedDate={currSelectedDate}
                setCurrSelectedDate={setCurrSelectedDate}
                handleClickedItem={handleClickedItem}
              />
            ) : currSelectedList === "YEAR" ? (
              <YearList
                setCurrSelectedList={setCurrSelectedList}
                currSelectedDate={currSelectedDate}
                setCurrSelectedDate={setCurrSelectedDate}
                handleClickedItem={handleClickedItem}
              />
            ) : (
              currSelectedList === "DAYS" && (
                <DayList
                  currSelectedDate={currSelectedDate}
                  setCurrSelectedDate={setCurrSelectedDate}
                  handleClickedItem={handleClickedItem}
                />
              )
            )}
          </div>
          <div className={styles.btnSection}>
            <div
              className={`${styles.cancelBtnDiv} ${styles.btnDiv} `}
              onClick={toggleDatePicker}
            >
              <p>Cancel</p>
            </div>
            <div
              className={`${styles.confirmBtnDiv} ${styles.btnDiv} `}
              onClick={handleSelectBtnClicked}
            >
              <p>Select</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DatePicker;

import React, { useEffect } from 'react'

import styles from "./styles/yearList.module.css"
import { motion } from "framer-motion"

const YearList = ({ currSelectedDate, setCurrSelectedDate, handleClickedItem, setCurrSelectedList }) => {


  useEffect(() => {
    if (currSelectedDate.year) {
      const element = document.getElementById(currSelectedDate.year);
      //> block : Defines vertical alignment
      //> inline: Defines horizontal alignment
      var target = document.getElementById(currSelectedDate.year);
      // const rect = target.getBoundingClientRect();
      // target.parentNode.scrollTop = 10;
      // target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop
      const h = target?.clientHeight
      // console.log(h);
      target?.parentNode.scrollTo({
        // behavior: 'smooth',
        top: target?.offsetTop - h,
      });
      // element?.scrollIntoView({
      //   behavior: 'auto',
      //   block: 'nearest', inline: 'start'
      // });
    }
  }, [])

  const renderYearList = () => {
    let items = [];
    for (let yr = 1900; yr <= 2050; yr++) {
      items.push(
        <motion.div key={yr} id={yr} className={`${styles.yearDiv} `}
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

          <div className={`${styles.yearInnerDiv} ${currSelectedDate.year == yr && styles.selectedDivStyle}`} >
            <p onClick={(e) => {
              handleClickedItem(e, 'year')
              setCurrSelectedList('DAYS')
            }}  >{yr}</p>
          </div>

        </motion.div >
      )
    }
    return items;
  }
  return (
    <div className={styles.yearList}>
      {renderYearList()}
    </div>
  )
}

export default YearList
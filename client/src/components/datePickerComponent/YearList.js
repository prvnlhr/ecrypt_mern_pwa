import React, { useEffect } from 'react'

import styles from "./styles/yearList.module.css"

const YearList = ({ currSelectedDate, setCurrSelectedDate, handleClickedItem }) => {


  useEffect(() => {
    if (currSelectedDate.year) {
      const element = document.getElementById(currSelectedDate.year);
      //> block : Defines vertical alignment
      //> inline: Defines horizontal alignment
      element?.scrollIntoView({
        behavior: 'auto',
        block: 'center', inline: 'start'
      });
    }
  }, [])

  const renderYearList = () => {
    let items = [];
    for (let yr = 1900; yr <= 2050; yr++) {
      items.push(
        <div key={yr} id={yr} className={`${styles.yearDiv} `}>

          <div className={`${styles.yearInnerDiv} ${currSelectedDate.year == yr && styles.selectedDivStyle}`} >
            <p onClick={(e) => { handleClickedItem(e, 'year') }}  >{yr}</p>
          </div>

        </div >
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
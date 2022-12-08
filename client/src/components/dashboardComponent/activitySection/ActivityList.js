import React from 'react'
import styles from "./styles/activityList.module.css"
const ActivityList = () => {

  // const activitiesData = [

  //   {

  //     type: "bankCard",
  //     task: "edit",
  //     date: 23,
  //     day: "Friday",
  //     Month: "April",
  //     time: "09:12 AM",
  //     title : "State Bank of India"
  //   }

  // ]

  const x = {

    type: "bankCard",
    task: "edit",
    date: 23,
    day: "Friday",
    Month: "April",
    time: "09:12 AM",
    title: "State Bank of India"
  }
  const y = {
    type: "identity",
    task: "edit",
    date: 23,
    day: "Friday",
    Month: "April",
    time: "09:12 AM",
    title: "State Bank of dvd"
  }
  const empty =
    {}

  const isObject = x =>
    Object(x) === x

  const diff1 = (left = {}, right = {}, rel = "left") =>
    Object.entries(left)
      .map
      (([k, v]) =>
        isObject(v) && isObject(right[k])
          ? [k, diff1(v, right[k], rel)]
          : right[k] !== v
            ? [k, { [rel]: v }]
            : [k, empty]
      )
      .reduce
      ((acc, [k, v]) =>
        v === empty
          ? acc
          : { ...acc, [k]: v }
        , empty
      )


  console.log(diff1(x, y));



  return (
    <div className={styles.activityList} >ActivityList</div>
  )
}

export default ActivityList
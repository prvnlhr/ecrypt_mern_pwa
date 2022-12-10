import React from 'react'
import ActivityComponentOuter from './ActivityComponentOuter'
import styles from "./styles/activityList.module.css"
const ActivityList = () => {



  // const oldData = {
  //   category: "bankCard",
  //   title: "State Bank of India",
  //   cardNumber: 5242720011394202,
  //   cardHolder: "Nancy Momoland",
  // }
  // const newData = {
  //   category: "identity",
  //   title: "HDFC",
  //   cardNumber: 5242720011391908,
  //   cardHolder: "Praveen Lohar",
  // }



  // const empty = {}

  // const isObject = x =>
  //   Object(x) === x

  // const diff1 = (oldVal = {}, newVal = {}, rel = "oldVal") =>
  //   Object.entries(oldVal)
  //     .map
  //     (([k, v]) =>
  //       isObject(v) && isObject(newVal[k])
  //         ? [k, diff1(v, newVal[k], rel)]
  //         : newVal[k] !== v
  //           ? [k, { [rel]: v }]
  //           : [k, empty]
  //     )
  //     .reduce
  //     ((acc, [k, v]) =>
  //       v === empty
  //         ? acc
  //         : { ...acc, [k]: v }
  //       , empty
  //     )

  // const merge = (oldVal = {}, newVal = {}) =>
  //   Object.entries(newVal)
  //     .reduce
  //     ((acc, [k, v]) =>
  //       isObject(v) && isObject(oldVal[k])
  //         ? { ...acc, [k]: merge(oldVal[k], v) }
  //         : { ...acc, [k]: v }
  //       , oldVal
  //     )

  // const diff = (x = {}, y = {}) =>
  //   merge(diff1(x, y, "oldVal"), diff1(y, x, "newVal"))



  // const data = diff(oldData, newData);
  // data.type = "bankcard";
  // data.task = "edit";
  // console.log(data);




  return (
    <div className={styles.activityList} >

      <ActivityComponentOuter />
      <ActivityComponentOuter />
      <ActivityComponentOuter />
    </div>
  )
}

export default ActivityList
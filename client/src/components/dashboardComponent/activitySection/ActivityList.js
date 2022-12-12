import React from 'react'
import ActivityComponentOuter from './ActivityComponentOuter'
import styles from "./styles/activityList.module.css"
const ActivityList = () => {



  const oldData = {
    category: "bankCard",
    title: "State Bank of India",
    cardNumber: 5242720011394202,
    cardHolder: "Nancy Momoland",
  }
  const newData = {
    category: "identity",
    title: "HDFC",
    cardNumber: 5242720011391908,
    cardHolder: "Praveen Lohar",
  }

  const activitiesData = [

    {
      "category": {
        "oldVal": "bankCard",
        "newVal": "identity"
      },
      "title": {
        "oldVal": "State Bank of India",
        "newVal": "HDFC"
      },
      "cardNumber": {
        "oldVal": 5242720011394202,
        "newVal": 5242720011391908
      },
      "cardHolder": {
        "oldVal": "Nancy Momoland",
        "newVal": "Praveen Lohar"
      },
      "type": "Card",
      "task": "Edit"
    },
    {
      "Title": {
        "oldVal": "Google Pay",
        "newVal": "Paytm"
      },
      "app": {
        "oldVal": "Gpay",
        "newVal": "payTM"
      },

      "type": "Login",
      "task": "Edit"
    },
    {
      "Title": {
        "oldVal": "SBI debit card ",
        "newVal": "HDFC Debit"
      },
      "app": {
        "CardNumber": 5242720011394203,
        "newVal": 5421785511236420
      },

      "type": "Card",
      "task": "Edit"
    },
    {
      "Firstname": {
        "oldVal": "William",
        "newVal": "Nancy"
      },
      "Email": {
        "oldVal": "will.iam@gmial.com",
        "newVal": "nancymm@gmail.com"
      },
      "type": "Profile",
      "task": "Update"
    }

  ]



  const empty = {}

  const isObject = x =>
    Object(x) === x

  const diff1 = (oldVal = {}, newVal = {}, rel = "oldVal") =>
    Object.entries(oldVal)
      .map
      (([k, v]) =>
        isObject(v) && isObject(newVal[k])
          ? [k, diff1(v, newVal[k], rel)]
          : newVal[k] !== v
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

  const merge = (oldVal = {}, newVal = {}) =>
    Object.entries(newVal)
      .reduce
      ((acc, [k, v]) =>
        isObject(v) && isObject(oldVal[k])
          ? { ...acc, [k]: merge(oldVal[k], v) }
          : { ...acc, [k]: v }
        , oldVal
      )

  const diff = (x = {}, y = {}) =>
    merge(diff1(x, y, "oldVal"), diff1(y, x, "newVal"))



  const data = diff(oldData, newData);
  // data.type = "bankcard";
  // data.task = "edit";
  console.log(data);




  return (
    <div className={styles.activityList} >


      {activitiesData.map((activity, index) => (
        <ActivityComponentOuter
          key={index}
          activity={activity}
        />
      ))}

    </div>
  )
}

export default ActivityList
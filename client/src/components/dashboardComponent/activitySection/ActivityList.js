import React from 'react'
import styles from "./styles/activityList.module.css"
import ActivityComponentWrapper from './ActivityComponentWrapper'
import { useSelector } from 'react-redux';
import ActivityListSkeleton from "../../skelotons/ActivityListSkeleton"
const ActivityList = () => {


  const activitiesArray = useSelector((state => state.activities.activitiesData));
  const activityState = useSelector((state => state.activities));
  const { isLoading, action } = activityState;

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

  // subType for conditional rendering of activity field
  // subType -> 1 for newly added or deleted
  // subType -> 2 for already existing edited, profile update
  /*

   */

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
      "date": "30",
      "month": "Apr",
      "time": "12:53 PM",
      "type": "Card",
      "task": "Edit",
      "subType": 2
    },
    {
      "category": {
        "oldVal": "Social",
        "newVal": "Finance"
      },
      "Title": {
        "oldVal": "Google Pay",
        "newVal": "Paytm"
      },
      "app": {
        "oldVal": "Gpay",
        "newVal": "payTM"
      },
      "date": "15",
      "month": "Jan",
      "time": "01:23 PM",
      "type": "Login",
      "task": "Edit",
      "subType": 2
    }, {
      "Email": "andrew.g@gmail.com",
      "App": "Gpay",
      "Title": "Google pay",
      "Password": "@ndrw123#!garfeild",
      "date": "09",
      "month": "Sep",
      "time": "05:05 PM",
      "type": "Login",
      "task": "Added",
      "subType": 1
    },
    {
      "Email": "andrew.g@gmail.com",
      "App": "Gpay",
      "title": "Google pay",
      "Password": "@ndrw123#!garfeild",
      "date": "24",
      "month": "Mar",
      "time": "08:11 AM",
      "type": "Login",
      "task": "Deleted",
      "subType": 1

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
      "date": "16",
      "month": "Oct",
      "time": "12:07 PM",
      "type": "Card",
      "task": "Edit",
      "subType": 2

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
      "date": "21",
      "month": "Aug",
      "time": "03:00 AM",
      "type": "Profile",
      "task": "Update",
      "subType": 2
    },

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


  return (
    <div className={styles.activityList} >

      {
        isLoading === true && action === 'fetch' ?
          <>
            <ActivityListSkeleton />
            <ActivityListSkeleton />
            <ActivityListSkeleton />
          </>
          :
          activitiesArray.map((activity, index) => (
            <ActivityComponentWrapper
              key={index}
              activity={activity}
            />
          ))
      }




    </div>
  )
}

export default ActivityList
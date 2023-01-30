import React, { useState, useEffect } from 'react'
import styles from "./styles/IdentityCardSubComponent.module.css"
import { Icon } from '@iconify/react';
const IdentityCardSubComponent = ({ favFullCardData, setFavFullCardData, }) => {

  const handleInputValueChange = (e) => {
    setFavFullCardData({
      ...favFullCardData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className={styles.cardWrapper} >
      <div className={styles.cardHolderWrapper}>
        <div className={styles.cardHolderContainer}>
          <div className={styles.cardHolderIconDiv}>
            <Icon
              className={styles.cardHolderIcon}
              icon="prime:user"
            />
          </div>
          <div className={styles.cardHolderLabelTextDiv}>
            <p>CARD HOLDER</p>
          </div>
          <div className={styles.cardHolderTextDiv}>
            <p> {favFullCardData.cardHolder} </p>
          </div>
        </div>
      </div>
      <div className={styles.cardNumberWrapper}>
        <div className={styles.cardNumerContainer}>
          <div className={styles.cardNumberIconDiv}>
            <Icon className={styles.cardNumIcon} icon="vaadin:password" />
          </div>
          <div className={styles.cardNumberLabelTextDiv}>
            <p>CARD NUMBER</p>
          </div>
          <div className={styles.cardNumberTextDiv}>
            <p> {favFullCardData.cardNumber} </p>
          </div>
        </div>
      </div>
      <div className={styles.dobDateWrapper}>
        <div className={styles.dobDateContainer}>
          <div className={styles.dobIconDiv} >
            <Icon className={styles.doBIcon} icon="uil:calender" />
          </div>
          <div className={styles.dobLabelTextDiv} >
            <p>DOB</p>
          </div>
          <div className={styles.dobDateTextDiv} >
            <p> {favFullCardData.dob} </p>
          </div>
        </div>
      </div>
      <div className={styles.issueDateWrapper}>
        <div className={styles.issueDateContainer}>
          <div className={styles.issueIconDiv} >
            <Icon className={styles.issueDateIcon} icon="fluent:notepad-16-regular" />
          </div>
          <div className={styles.issueLabelTextDiv} >
            <p>ISSUE DATE</p>
          </div>
          <div className={styles.issueDateTextDiv} >
            <p> {favFullCardData.issueDate} </p>

          </div>

        </div>
      </div>
    </div>
  )
}

export default IdentityCardSubComponent
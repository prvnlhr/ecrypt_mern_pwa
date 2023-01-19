import React from 'react'
import styles from "./styles/licenseCardSubComponent.module.css"
import { Icon } from '@iconify/react';

const LicenseCardSubComponent = ({ favFullCardData, setFavFullCardData }) => {

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
              icon="prime:user" color="#002a9a"
            />
          </div>
          <div className={styles.cardHolderLabelTextDiv}>
            <p>CARD HOLDER</p>
          </div>
          <div className={styles.cardHolderTextDiv}>
            <p>{favFullCardData.cardHolder}</p>
          </div>
        </div>
      </div>
      <div className={styles.cardNumberWrapper}>
        <div className={styles.cardNumerContainer}>
          <div className={styles.cardNumberIconDiv}>
            <Icon
              className={styles.cardNumIcon}
              icon="vaadin:password" color="#002a9a" />
          </div>
          <div className={styles.cardNumberLabelTextDiv}>
            <p>LICENSE NUMBER</p>
          </div>
          <div className={styles.cardNumberTextDiv}>
            <p>{favFullCardData.licenseNumber}</p>

          </div>
        </div>
      </div>
      <div className={styles.dobDateWrapper}>
        <div className={styles.dobDateContainer}>
          <div className={styles.dobIconDiv} >
            <Icon
              className={styles.doBIcon}
              icon="uil:calender" color="#002a9a" />
          </div>
          <div className={styles.dobLabelTextDiv} >
            <p>DOB</p>
          </div>
          <div className={styles.dobDateTextDiv} >
            <p>{favFullCardData.dob}</p>

          </div>
        </div>
      </div>
      <div className={styles.expiryDateWrapper}>
        <div className={styles.expiryDateContainer}>
          <div className={styles.expiryIconDiv} >
            <Icon
              className={styles.expiryIcon}
              icon="prime:calendar-times" color="#002a9a" />
          </div>
          <div className={styles.expiryLabelTextDiv} >
            <p>EXPIRY</p>
          </div>
          <div className={styles.expiryDateTextDiv} >
            <p>{favFullCardData.expiry}</p>

          </div>

        </div>
      </div>
    </div>
  )
}

export default LicenseCardSubComponent
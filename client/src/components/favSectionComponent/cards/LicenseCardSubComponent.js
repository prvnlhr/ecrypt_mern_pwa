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
    <div className={styles.subCardWrapper} >
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
          <div className={styles.cardHolderInputDiv}>
            <input className={`${styles.textInputCommonStyle} ${styles.cardHolderTextField}  ${styles.cardHolderTextFieldFont}`} value={favFullCardData.cardHolder} readOnly={true} />
          </div>
        </div>
      </div>
      <div className={styles.cardNumberWrapper}>
        <div className={styles.cardNumerContainer}>
          <div className={styles.cardNumberIconDiv}>
            <Icon
              className={styles.cardNumIcon}
              icon="vaadin:password" />
          </div>
          <div className={styles.cardNumberLabelTextDiv}>
            <p>LICENSE NUMBER</p>
          </div>

          {/* <div className={styles.cardNumberTextDiv}>
            <p>{favFullCardData.licenseNumber}</p>
          </div> */}
          <div className={styles.cardNumberInputDiv}>
            <input className={`${styles.textInputCommonStyle} ${styles.cardNumberTextField}  ${styles.cardNumberTextFieldFont}`} value={favFullCardData.licenseNumber} readOnly={true} />
          </div>
        </div>
      </div>
      <div className={styles.dobDateWrapper}>
        <div className={styles.dobDateContainer}>
          <div className={styles.dobDateIconDiv} >
            <Icon
              className={styles.dobDateIcon}
              icon="uil:calender" />
          </div>
          <div className={styles.dobLabelTextDiv} >
            <p>DOB</p>
          </div>
          <div className={styles.dobInputDiv} >
            <input className={`${styles.textInputCommonStyle} ${styles.dobTextField}  ${styles.dobTextFieldFont}`} value={favFullCardData.dob} readOnly={true} />
          </div>
        </div>
      </div>
      <div className={styles.expiryDateWrapper}>
        <div className={styles.expiryDateContainer}>
          <div className={styles.expiryDateIconDiv} >
            <Icon
              className={styles.expiryDateIcon}
              icon="prime:calendar-times" />
          </div>
          <div className={styles.expiryDateLabelTextDiv} >
            <p>EXPIRY</p>
          </div>
          <div className={styles.expiryDateInputDiv} >
            <input className={`${styles.textInputCommonStyle} ${styles.expiryDateTextField}  ${styles.expiryDateTextFieldFont}`} value={favFullCardData.expiry} readOnly={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LicenseCardSubComponent
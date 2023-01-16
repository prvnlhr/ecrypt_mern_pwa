import React from 'react'
import styles from "./styles/licenseCardSubComponent.module.css"
import { Icon } from '@iconify/react';

const LicenseCardSubComponent = ({ fullContentCardData, setFullContentCardData, editMode, setEditMode }) => {

  const handleInputValueChange = (e) => {
    setFullContentCardData({
      ...fullContentCardData,
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
          <div className={styles.cardHolderInputDiv}>
            <input
              className={editMode ? styles.cardHolderInputActive : styles.cardHolderInputNotActive}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"cardHolder"}
              value={fullContentCardData.cardHolder}
            />
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
          <div className={styles.cardNumberInputDiv}>
            <input
              className={editMode ? styles.inputActive : styles.inputNotActive}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"licenseNumber"}
              value={fullContentCardData.licenseNumber}

            />
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
          <div className={styles.dobDateInputDiv} >
            <input
              className={editMode ? styles.inputActive : styles.inputNotActive}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"dob"}
              value={fullContentCardData.dob}
            />
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
          <div className={styles.expiryDateInputDiv} >
            <input
              className={editMode ? styles.inputActive : styles.inputNotActive}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"expiry"}
              value={fullContentCardData.expiry}

            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default LicenseCardSubComponent
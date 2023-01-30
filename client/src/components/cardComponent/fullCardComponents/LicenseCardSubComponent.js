import React from 'react'
import styles from "../styles/licenseCardSubComponent.module.css"
import { Icon } from '@iconify/react';

const LicenseCardSubComponent = ({ fullContentCardData, setFullContentCardData, editMode, setEditMode, onFocus, currFocusField }) => {

  const handleInputValueChange = (e) => {
    setFullContentCardData({
      ...fullContentCardData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className={styles.cardWrapper} >
      <div className={styles.cardHolderWrapper}>
        <div className={`${styles.cardHolderContainer}  ${(currFocusField === 3 && editMode) && styles.focusFieldStyle} `}>
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
            <input
              className={editMode ? styles.cardHolderInputActive : styles.cardHolderInputNotActive}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"cardHolder"}
              value={fullContentCardData.cardHolder}
              onFocus={() => onFocus(3)}

            />
          </div>
        </div>
      </div>
      <div className={styles.cardNumberWrapper}>
        <div className={`${styles.cardNumerContainer} ${(currFocusField === 4 && editMode) && styles.focusFieldStyle} `}>
          <div className={styles.cardNumberIconDiv}>
            <Icon
              className={styles.cardNumIcon}
              icon="vaadin:password" />
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
              onFocus={() => onFocus(4)}


            />
          </div>
        </div>
      </div>
      <div className={styles.dobDateWrapper}>
        <div className={`${styles.dobDateContainer} ${(currFocusField === 5 && editMode) && styles.focusFieldStyle} `}>
          <div className={styles.dobIconDiv} >
            <Icon
              className={styles.doBIcon}
              icon="uil:calender" />
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
              onFocus={() => onFocus(5)}

            />
          </div>
        </div>
      </div>
      <div className={styles.expiryDateWrapper}>
        <div className={`${styles.expiryDateContainer} ${(currFocusField === 6 && editMode) && styles.focusFieldStyle} `}>
          <div className={styles.expiryIconDiv} >
            <Icon
              className={styles.expiryIcon}
              icon="prime:calendar-times" />
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
              onFocus={() => onFocus(6)}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default LicenseCardSubComponent
import React, { useState, useEffect } from 'react'
import styles from "../styles/IdentityCardSubComponent.module.css"
import { Icon } from '@iconify/react';
const IdentityCardSubComponent = ({ fullContentCardData, setFullContentCardData, editMode, setEditMode, onFocus, currFocusField }) => {

  const handleInputValueChange = (e) => {
    setFullContentCardData({
      ...fullContentCardData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className={styles.cardWrapper} >
      <div className={styles.cardHolderWrapper}>
        <div className={`${styles.cardHolderContainer} ${(currFocusField === 3 && editMode) && styles.focusFieldStyle}`}>
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
              value={fullContentCardData.cardHolder}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              onFocus={() => onFocus(3)}
              name={"cardHolder"}
            />
          </div>
        </div>
      </div>
      <div className={styles.cardNumberWrapper}>
        <div className={`${styles.cardNumerContainer} ${(currFocusField === 4 && editMode) && styles.focusFieldStyle}`}>
          <div className={styles.cardNumberIconDiv}>
            <Icon className={styles.cardNumIcon} icon="vaadin:password" />
          </div>
          <div className={styles.cardNumberLabelTextDiv}>
            <p>CARD NUMBER</p>
          </div>
          <div className={styles.cardNumberInputDiv}>
            <input
              className={editMode ? styles.inputActive : styles.inputNotActive}
              value={fullContentCardData.cardNumber}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"cardNumber"}
              onFocus={() => onFocus(4)}
            />
          </div>
        </div>
      </div>
      <div className={styles.dobDateWrapper}>
        <div className={`${styles.dobDateContainer}  ${(currFocusField === 5 && editMode) && styles.focusFieldStyle}`}>
          <div className={styles.dobIconDiv} >
            <Icon className={styles.doBIcon} icon="uil:calender" />

          </div>
          <div className={styles.dobLabelTextDiv} >
            <p>DOB</p>
          </div>
          <div className={styles.dobDateInputDiv} >
            <input
              className={editMode ? styles.inputActive : styles.inputNotActive}
              value={fullContentCardData.dob}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"dob"}
              onFocus={() => onFocus(5)}

            />
          </div>
        </div>
      </div>
      <div className={styles.issueDateWrapper}>
        <div className={`${styles.issueDateContainer} ${(currFocusField === 6 && editMode) && styles.focusFieldStyle}`}>
          <div className={styles.issueIconDiv} >
            <Icon className={styles.issueDateIcon} icon="fluent:notepad-16-regular" />
          </div>
          <div className={styles.issueLabelTextDiv} >
            <p>ISSUE DATE</p>
          </div>
          <div className={styles.issueDateInputDiv} >
            <input
              className={editMode ? styles.inputActive : styles.inputNotActive}
              value={fullContentCardData.issueDate}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"issueDate"}
              onFocus={() => onFocus(6)}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default IdentityCardSubComponent
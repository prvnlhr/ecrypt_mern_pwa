import React from 'react'
import styles from "../styles/IdentityCardSubComponent.module.css"
import { Icon } from '@iconify/react';
const IdentityCardSubComponent = (
  { identityCardData, setIdentityCardData, handleFormDataChange, onFocus, currFocusField, showDatePicker,
    setShowDatePicker,
    toggleDatePicker
  }
) => {
  return (
    <div className={styles.cardWrapper} >
      <div className={styles.cardHolderWrapper}>
        <div className={`${styles.cardHolderContainer} ${(currFocusField === 3) && styles.focusFieldStyle}`}>
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
            <input value={identityCardData.cardHolder}
              className={styles.inputActive}
              name="cardHolder"
              onChange={handleFormDataChange}
              onFocus={() => onFocus(3)}

            />
          </div>
        </div>
      </div>
      <div className={styles.cardNumberWrapper}>
        <div className={`${styles.cardNumberContainer} ${(currFocusField === 4) && styles.focusFieldStyle}`}>
          <div className={styles.cardNumberIconDiv}>
            <Icon className={styles.cardNumIcon} icon="vaadin:password" />
          </div>
          <div className={styles.cardNumberLabelTextDiv}>
            <p>CARD NUMBER</p>
          </div>
          <div className={styles.cardNumberInputDiv}>
            <input value={identityCardData.cardNumber}
              name="cardNumber"
              className={styles.inputActive}
              onChange={handleFormDataChange}
              onFocus={() => onFocus(4)}
            />
          </div>
        </div>
      </div>
      <div className={styles.dobDateWrapper}>
        <div className={`${styles.dobDateContainer}  ${(currFocusField === 5) && styles.focusFieldStyle}`}>
          <div className={styles.dobIconDiv} >
            <Icon className={styles.doBIcon} icon="uil:calender" />

          </div>
          <div className={styles.dobLabelTextDiv} >
            <p>DOB</p>
          </div>
          <div className={styles.dobDateInputDiv} >
            <input value={identityCardData.dob}
              name="dob"
              className={styles.inputActive}
              onChange={handleFormDataChange}
              onFocus={() => onFocus(5)}
              placeholder="DD / MM / YY"
              readOnly={true}
              onClick={(e) => toggleDatePicker(e)}
            />
          </div>
        </div>
      </div>
      <div className={styles.issueDateWrapper}>
        <div className={`${styles.issueDateContainer} ${(currFocusField === 6) && styles.focusFieldStyle}`}>
          <div className={styles.issueIconDiv} >
            <Icon className={styles.issueDateIcon} icon="fluent:notepad-16-regular" />
          </div>
          <div className={styles.issueLabelTextDiv} >
            <p>ISSUE DATE</p>
          </div>
          <div className={styles.issueDateInputDiv} >
            <input value={identityCardData.issueDate}
              name="issueDate"
              className={styles.inputActive}
              onChange={handleFormDataChange}
              onFocus={() => onFocus(6)}
              placeholder="MM / YY"
              readOnly={true}
              onClick={(e) => toggleDatePicker(e)}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default IdentityCardSubComponent
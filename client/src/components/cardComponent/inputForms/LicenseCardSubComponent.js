import React from 'react'
import styles from "../styles/licenseCardSubComponent.module.css"
import { Icon } from '@iconify/react';

const LicenseCardSubComponent = (

  { licenseCardData, setLicenseCardData, handleFormDataChange, onFocus, currFocusField,
    toggleDatePicker
  }
) => {
  return (
    <div className={styles.cardWrapper} >
      <div className={styles.cardHolderWrapper}>
        <div className={`${styles.cardHolderContainer}  ${(currFocusField === 3) && styles.focusFieldStyle} `}>
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
            <input value={licenseCardData.cardHolder}
              onChange={handleFormDataChange}
              className={styles.inputActive}
              name="cardHolder"
              onFocus={() => onFocus(3)}

            />
          </div>
        </div>
      </div>
      <div className={styles.cardNumberWrapper}>
        <div className={`${styles.cardNumberContainer} ${(currFocusField === 4) && styles.focusFieldStyle} `}>
          <div className={styles.cardNumberIconDiv}>
            <Icon
              className={styles.cardNumIcon}
              icon="vaadin:password" />
          </div>
          <div className={styles.cardNumberLabelTextDiv}>
            <p>LICENSE NUMBER</p>
          </div>
          <div className={styles.cardNumberInputDiv}>
            <input value={licenseCardData.licenseNumber}
              name="licenseNumber"
              onChange={handleFormDataChange}
              className={styles.inputActive}
              onFocus={() => onFocus(4)}

            />
          </div>
        </div>
      </div>
      <div className={styles.dobDateWrapper}>
        <div className={`${styles.dobDateContainer} ${(currFocusField === 5) && styles.focusFieldStyle} `}>
          <div className={styles.dobIconDiv} >
            <Icon
              className={styles.doBIcon}
              icon="uil:calender" />
          </div>
          <div className={styles.dobLabelTextDiv} >
            <p>DOB</p>
          </div>
          <div className={styles.dobDateInputDiv} >
            <input value={licenseCardData.dob}
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
      <div className={styles.expiryDateWrapper}>
        <div className={`${styles.expiryDateContainer} ${(currFocusField === 6) && styles.focusFieldStyle} `}>
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
              value={licenseCardData.expiry}
              onChange={handleFormDataChange}
              className={styles.inputActive}
              name="expiry"
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

export default LicenseCardSubComponent
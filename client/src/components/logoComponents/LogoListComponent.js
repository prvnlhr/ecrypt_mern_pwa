import React from 'react'
import styles from "./styles/logoListComponent.module.css"
import GooglePay from "./logos/GooglePay"
import Sbi from './logos/Sbi'
import { logosArray } from "./logosData"
const LogoListComponent = () => {

  return (
    <div className={styles.logoListWrapper}>
      {
        logosArray.map((logo, index) => (
          logo
        ))
      }
    </div>
  )
}

export default LogoListComponent
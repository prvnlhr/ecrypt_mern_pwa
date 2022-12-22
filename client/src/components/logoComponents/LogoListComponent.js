import React from 'react'
import styles from "./styles/logoListComponent.module.css"
import logoStyles from "./styles/logosStyles.module.css"
import { logosArray } from "./logosData"
const LogoListComponent = () => {

  return (
    <div className={styles.logoListWrapper}>
      {
        logosArray.map((logo, index) => (
          // logo
          <div className={logoStyles.logoWrapper}>
            <div className={logoStyles.logoContainer}>
              {logo.logo}
            </div>
            <div className={logoStyles.logoLabelContainer}>
              <p>
                {logo.label}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default LogoListComponent
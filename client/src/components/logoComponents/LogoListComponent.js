import React from 'react'
import styles from "./styles/logoListComponent.module.css"
import { logosArray } from "./logosData"
import Logo from './Logo'
const LogoListComponent = ({ searchQuery, logoIndx, setLogoIndx }) => {




  return (
    <div className={styles.logoListWrapper}>



      {
        // searchQuery ? logosArray.filter(
        //   (item) =>
        //     item.label?.toLowerCase().includes(searchQuery?.toLowerCase())

        // ).map((logo, index) => (
        //   <div className={logoStyles.logoWrapper}>
        //     <div className={logoStyles.logoContainer}>
        //       {logo.logo}
        //     </div>
        //     <div className={logoStyles.logoLabelContainer}>
        //       <p>
        //         {logo.label}
        //       </p>
        //     </div>
        //   </div>
        // )) :
        //   logosArray.map((logo, index) => (
        //     <div className={logoStyles.logoWrapper}>
        //       <div className={logoStyles.logoContainer}>
        //         {logo.logo}
        //       </div>
        //       <div className={logoStyles.logoLabelContainer}>
        //         <p>
        //           {logo.label}
        //         </p>
        //       </div>
        //     </div>
        //   ))
        searchQuery ? logosArray.filter(
          (item) =>
            item.label?.toLowerCase().includes(searchQuery?.toLowerCase())
        ).map((logo, index) => (
          <Logo logo={logo} />
        )) :
          logosArray.map((logo, index) => (
            <Logo
              logo={logo}
              logoIndx={logoIndx}
              setLogoIndx={setLogoIndx}
            />
          ))
      }
    </div>
  )
}

export default LogoListComponent


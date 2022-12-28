import React, { useState } from 'react'
import { logosArray } from './logosData';
import logoStyles from "./styles/logosStyles.module.css"
const Logo = ({ logo, logoIndx, setLogoIndx, selectedLogoIndex, setSelectedLogoIndex,
    logoIndexUntilSaved,
    setLogoIndexUntilSaved
}) => {

    const handleLogoClicked = () => {
        console.log(logo.logoIndex)
        //# for selected Logo styles purpose
        setSelectedLogoIndex(logo.logoIndex);
        setLogoIndexUntilSaved(logo.logoIndex);
    }

    return (
        <div className={
            selectedLogoIndex === logo.logoIndex ? logoStyles.logoWrapperActive :
                logoStyles.logoWrapper
        } onClick={handleLogoClicked} >
            <div className={
                // selectedLogoIndex === logo.logoIndex ? logoStyles.logoContainerActive :
                logoStyles.logoContainer}>
                {logo.logo}
            </div>
            <div className={logoStyles.logoLabelContainer}>
                <p>
                    {logo.label}
                    {/* {logo.logoIndex} */}
                </p>
            </div>
        </div>
    )
}

export default Logo
import React, { useState } from 'react'
import { logosArray } from './logosData';
import logoStyles from "./styles/logosStyles.module.css"
const Logo = ({ logo, logoIndx, setLogoIndx }) => {


    const [active, setActive] = useState(false);
    const handleLogoClicked = () => {
        // console.log(logo, logoIndx, logosArray[logoIndx]);
        setLogoIndx(logo.logoIndex)
    }

    return (
        <div className={logoStyles.logoWrapper} onClick={handleLogoClicked} >
            <div className={active ? logoStyles.logoContainerActive : logoStyles.logoContainer}>
                {logo.logo}
            </div>
            <div className={logoStyles.logoLabelContainer}>
                <p>
                    {logo.label}
                </p>
            </div>
        </div>
    )
}

export default Logo
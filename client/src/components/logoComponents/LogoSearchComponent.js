import React from 'react'
import styles from "./styles/logoSearchComponent.module.css"
const LogoSearchComponent = () => {
    return (
        <div className={styles.logoSearchWrapper} >
            <  input className={styles.searchInput} value={""} />
        </div>
    )
}

export default LogoSearchComponent  
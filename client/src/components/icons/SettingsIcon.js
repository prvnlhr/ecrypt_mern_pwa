import React from 'react'
import styles from "./styles/iconStyles.module.css"
const SettingsIcon = () => {
    return (
        <svg
            // width="24" height="24"
            className={styles.IconStyles}
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M21 7L11 7" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <circle r="2" transform="matrix(-1 0 0 1 5 7)" fill="#2B3F6C" stroke="#2B3F6C" stroke-width="1.5" />
            <path opacity="0.3" d="M3 17L13 17" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="19" cy="17" r="2" fill="#2B3F6C" stroke="#2B3F6C" stroke-width="1.5" />
        </svg>

    )
}

export default SettingsIcon
import React from 'react'
import styles from "../styles/logosStyles.module.css"

const Messenger = () => {
    return (
        <svg
            // width="48" height="48"
            className={styles.svgStyles}
            viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_21_302)">
                <path d="M23.9992 2C11.6084 2 2.00049 11.08 2.00049 23.3387C2.00049 29.7513 4.62933 35.295 8.90807 39.1228C9.26555 39.4418 9.48554 39.8927 9.49654 40.3767L9.61753 44.2925C9.65603 45.5409 10.943 46.3548 12.0869 45.8489L16.4536 43.924C16.8221 43.759 17.2401 43.7315 17.6306 43.836C19.6379 44.386 21.7718 44.6829 23.9992 44.6829C36.3899 44.6829 45.9979 35.603 45.9979 23.3442C45.9979 11.0855 36.3899 2 23.9992 2Z" fill="url(#paint0_radial_21_302)" />
                <path d="M10.7896 29.5806L17.2517 19.3292C18.2801 17.6958 20.48 17.2943 22.0254 18.4493L27.1676 22.3045C27.6405 22.6565 28.2895 22.6565 28.757 22.299L35.6976 17.0304C36.6215 16.3264 37.8314 17.4373 37.2155 18.4218L30.7479 28.6677C29.7194 30.3011 27.5196 30.7025 25.9741 29.5476L20.832 25.6923C20.359 25.3404 19.71 25.3404 19.2426 25.6978L12.302 30.9665C11.378 31.6705 10.1681 30.565 10.7896 29.5806V29.5806Z" fill="white" />
            </g>
            <defs>
                <radialGradient id="paint0_radial_21_302" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.47 45.7534) scale(47.9571 47.957)">
                    <stop stop-color="#0099FF" />
                    <stop offset="0.61" stop-color="#A033FF" />
                    <stop offset="0.935" stop-color="#FF5280" />
                    <stop offset="1" stop-color="#FF7061" />
                </radialGradient>
                <clipPath id="clip0_21_302">
                    <rect width="44" height="44.3548" fill="white" transform="translate(2 2)" />
                </clipPath>
            </defs>
        </svg>


    )
}

export default Messenger
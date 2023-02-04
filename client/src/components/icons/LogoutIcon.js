import React from 'react'
import styles from "./styles/iconStyles.module.css"
import { useSelector, useDispatch } from 'react-redux'

const theme = 'dark';
const LogoutIcon = () => {
    const isDarkMode = useSelector((state) => state.ui.darkMode);

    return (

        <>

            {isDarkMode
                ?
                <svg
                    className={styles.iconsStyles}
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M12 2H7C4.79086 2 3 3.79086 3 6V8V16V18C3 20.2091 4.79086 22 7 22H12C14.2091 22 16 20.2091 16 18V6C16 3.79086 14.2091 2 12 2Z" fill="white" />
                    <path d="M19 15L21.2929 12.7071C21.6834 12.3166 21.6834 11.6834 21.2929 11.2929L19 9M21 12L9 12" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                </svg> :
                <svg
                    //  width="24" height="24" 
                    className={styles.iconsStyles}
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M12 2H7C4.79086 2 3 3.79086 3 6V8V16V18C3 20.2091 4.79086 22 7 22H12C14.2091 22 16 20.2091 16 18V6C16 3.79086 14.2091 2 12 2Z" fill="#2B3F6C" />
                    <path d="M19 15L21.2929 12.7071C21.6834 12.3166 21.6834 11.6834 21.2929 11.2929L19 9M21 12L9 12" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                </svg>


            }
        </>

    )
}

export default LogoutIcon
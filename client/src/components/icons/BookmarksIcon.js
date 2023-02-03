import React from 'react'
import styles from "./styles/bookmarkIcon.module.css"

const theme = 'dark';
const BookmarksIcon = () => {

    return (


        <>
            {theme === 'dark'
                ?
                <svg
                    className={styles.iconStyle}
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z" stroke="white" stroke-width="1.5" />
                    <path opacity="0.3" d="M9 8.5H15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                :

                <svg
                    // width="24" height="24"
                    className={styles.iconStyle}
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V20.1683C19 20.9595 18.1248 21.4373 17.4592 21.0095L13.0815 18.1953C12.4227 17.7717 11.5773 17.7717 10.9185 18.1953L6.54076 21.0095C5.87525 21.4373 5 20.9595 5 20.1683V7Z" stroke="#2B3F6C" stroke-width="1.5" />
                    <path opacity="0.3" d="M9 8.5H15" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            }
        </>
    )
}

export default BookmarksIcon
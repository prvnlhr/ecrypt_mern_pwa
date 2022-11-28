import React from 'react'
import { useState } from 'react'
import styles from "./styles/searchSection.module.css"
import { Icon } from '@iconify/react'

const SearchSection = () => {

    const [searchMode, setSearchMode] = useState(false);

    const searchIconClicked = () => {
        setSearchMode(!searchMode);
    }
    return (
        <div className={styles.searchTitleSection}>
            <div className={styles.listTitleWrapper}>
                <div className={styles.titleTextDiv}>
                    <p>Logins</p>
                </div>
            </div>
            <div className={styles.searchInputWrapper}>

                {!searchMode ?
                    <div className={styles.falseSearchContainer} onClick={() => searchIconClicked()}  >
                        <Icon icon="clarity:search-line" color="#002a9a"
                            className={styles.searchIcon}
                        />
                        <p className={styles.searchIconText}>Search</p>
                    </div>

                    : (
                        <div className={styles.trueSearchContainer}>
                            <div className={styles.searchInputDiv} >
                                <input className={styles.searchInput} />
                            </div>
                            <div className={styles.searchCancelIconDiv}>
                                <Icon className={styles.searchCancelIcon} icon="octicon:x-16" color="#002a9a" onClick={() => searchIconClicked()} />
                            </div>
                        </div>)
                }


            </div>
        </div>
    )
}

export default SearchSection
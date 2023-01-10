import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, Link } from "react-router-dom";
import styles from "./styles/searchSection.module.css"
import { Icon } from '@iconify/react'

const SearchSection = () => {
    const location = useLocation();

    const [searchMode, setSearchMode] = useState(false);

    const [listCount, setListCount] = useState(0);

    const [listTitle, setListTitle] = useState("");


    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setListTitle("Dashboard");
                break;
            case "/user/display_loginIds":
                setListTitle("Logins");
                break;
            case "/user/display_cards":
                setListTitle("Cards");
                break;
            case "/user/diplay_documents":
                setListTitle("Notes");
                break;
            case "/user/favorites/*":
                setListTitle("Favorites");
                break;
            default:
                break;
        }
    }, [location.pathname])


    const searchIconClicked = () => {
        setSearchMode(!searchMode);
    }
    return (
        <div className={styles.searchTitleSection}>
            <div className={styles.listTitleWrapper}>
                <div className={styles.listTitleTextDiv}>
                    <p>{listTitle}</p>
                </div>

                {location.pathname === "/dashboard" || location.pathname === "/user/favorites/*"
                    ? null :
                    <div className={styles.listCountDiv} >
                        <p>16</p>
                    </div>
                }
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
                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default SearchSection
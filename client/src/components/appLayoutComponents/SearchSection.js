import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Link } from "react-router-dom";
import styles from "./styles/searchSection.module.css"
import { searchUserData, clearSearchData } from "../../redux/features/search/searchSlice"
import { Icon } from '@iconify/react'

const SearchSection = ({ searchMode, setSearchMode, searchQuery,
    setSearchQuery,
    clickedSearchItem,
    setClickedSearchItem,
    searchBarRef
}) => {
    const location = useLocation();
    const searchState = useSelector((state) => state.search.searchResults)
    const loginIdsArray = useSelector((state => state.loginIds.loginsIdData));
    const cardsArray = useSelector((state => state.cards.cardsData));
    const docsArray = useSelector((state) => state.docs.docsData);

    const favLoginsArray = useSelector((state => state.favorites.favoriteLoginIds));
    const favDocsArray = useSelector((state => state.favorites.favoriteDocs));
    const favCardsArray = useSelector((state => state.favorites.favoriteCards));

    const dispatch = useDispatch();

    const [listCount, setListCount] = useState(0);

    const [searchResultCount, setsearchResultCount] = useState(0);

    const [listTitle, setListTitle] = useState("");




    const checkListCountDisplayCondition = () => {
        return location.pathname !== '/' && searchQuery.length === 0 && searchState.length === 0;
    }

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setListTitle("Dashboard");
                setListCount(0);
                break;
            case "/user/display_loginIds":
                setListTitle("Logins");
                setListCount(loginIdsArray.length);
                break;
            case "/user/display_cards":
                setListTitle("Cards");
                setListCount(cardsArray.length);
                break;
            case "/user/diplay_documents":
                setListTitle("Notes");
                setListCount(docsArray.length);
                break;
            case "/user/favorites/logins":
                setListTitle("Favorites");
                setListCount(favLoginsArray.length);
                break;
            case "/user/favorites/cards":
                setListTitle("Favorites");
                setListCount(favCardsArray.length);
                break;
            case "/user/favorites/docs":
                setListTitle("Favorites");
                setListCount(favDocsArray.length);
                break;
            default:
                break;
        }
    }, [location?.pathname,
        loginIdsArray, docsArray, cardsArray
    ])

    const searchItem = (searckKey) => {
        dispatch(searchUserData({
            query: searckKey
        }));
    }

    useEffect(() => {
        if (searchQuery.length == 0) {
            dispatch(clearSearchData());

        } else if (searchQuery.length > 2) {
            searchItem(searchQuery);
            if (searchState.length > 0) {
                setsearchResultCount(searchState.length);
            } else {
                setsearchResultCount(0);
            }
        }
    }, [searchQuery]);

    const searchIconClicked = () => {
        setSearchMode(true);
    }

    const searchCancelIconClicked = () => {
        dispatch(clearSearchData());
        setSearchMode(false);
        setSearchQuery('');
        setClickedSearchItem(undefined);
        setsearchResultCount(0);
    }

    return (
        <div className={styles.searchTitleSection}>
            <div className={styles.listTitleWrapper}>

                {searchQuery.length > 0 ?
                    <>
                        <div className={styles.listTitleTextDiv}>
                            <p className={styles.searchResultText}>Search Result</p>
                        </div>
                        <div className={styles.listCountDiv}>
                            <p >
                                {searchState.length}
                            </p>
                        </div>
                    </>
                    :
                    <>
                        <div className={styles.listTitleTextDiv}>
                            <p className={styles.listTitleText} >{listTitle}</p>
                        </div>
                        {
                            location.pathname !== '/' &&
                            <div className={styles.listCountDiv}>
                                <p>{listCount}</p>
                            </div>
                        }
                    </>

                }
            </div>
            <div className={styles.searchInputWrapper}>

                {!searchMode ?
                    <div className={styles.falseSearchContainer} onClick={() => searchIconClicked()}  >
                        <Icon icon="clarity:search-line"
                            className={styles.searchIcon}
                        />
                        <p className={styles.searchText}>Search</p>
                    </div>

                    : (
                        <div className={styles.trueSearchContainer}>
                            <div className={styles.searchInputDiv}  >
                                <input autoFocus={true} ref={searchBarRef} onChange={(e) => setSearchQuery(e.target.value)} className={styles.searchInput} />
                            </div>
                            <div className={styles.searchCancelIconDiv}>
                                <Icon className={styles.searchCancelIcon} icon="octicon:x-16" onClick={() => searchCancelIconClicked()} />
                            </div>
                        </div>
                    )
                }


            </div>
        </div >
    )
}

export default SearchSection
import React, { useState, useEffect, createRef, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./styles/searchList.module.css"
import { useSelector, useDispatch } from 'react-redux'
import SearchCard from './SearchCard'
import SearchDoc from './SearchDoc'
import SearchLoginId from './SearchLoginId'
import { clearSearchData } from "../../redux/features/search/searchSlice"

const SearchList = ({ setClickedSearchItem, clickedSearchItem, searchMode, setSearchMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search.searchResults)


  const redirectToList = (item, listPath) => {
    console.log(listPath);
    setClickedSearchItem(item);
    dispatch(clearSearchData());
    setSearchMode(false);
    navigate(listPath);
  }

  const handleSearchItemClicked = (item) => {
    if (item.hasOwnProperty('imageName')) {
      redirectToList(item, '/user/diplay_documents')
    }
    else if (item.hasOwnProperty('username')) {
      redirectToList(item, '/user/display_loginIds')
    }
    else {
      redirectToList(item, '/user/display_cards')
    }
  }

  return (
    <div className={styles.searchListWrapper} >
      <div className={styles.contentContainer} >
        {searchState.map((item, index) => (
          item.hasOwnProperty('imageName')
            ?
            <SearchDoc key={item._id} item={item} setClickedSearchItem={setClickedSearchItem} handleSearchItemClicked={handleSearchItemClicked} />
            : item.hasOwnProperty('username') ?
              < SearchLoginId key={item._id} item={item} setClickedSearchItem={setClickedSearchItem} handleSearchItemClicked={handleSearchItemClicked} />
              :
              <SearchCard key={item._id} item={item} setClickedSearchItem={setClickedSearchItem} handleSearchItemClicked={handleSearchItemClicked} />
        ))}
      </div>
    </div>
  )
}

export default SearchList
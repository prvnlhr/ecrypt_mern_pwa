import React, { useState, useEffect, createRef, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./styles/searchList.module.css"
import { useSelector, useDispatch } from 'react-redux'
import SearchCard from './SearchCard'
import SearchDoc from './SearchDoc'
import SearchLoginId from './SearchLoginId'
import { clearSearchData } from "../../redux/features/search/searchSlice"
import { rearrangeLoginIdsList } from "../../redux/features/loginsId/loginsIdSlice"
import { rearrangeDocsList } from "../../redux/features/docs/docsSlice"
import { rearrangeCardsList } from "../../redux/features/cards/cardsSlice"

const SearchList = ({ setClickedSearchItem, clickedSearchItem, searchMode, setSearchMode, searchQuery, setSearchQuery, searchBarRef }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search.searchResults)
  const loginIdsArray = useSelector((state => state.loginIds.loginsIdData));
  const cardsArray = useSelector((state => state.cards.cardsData));
  const docsArray = useSelector((state) => state.docs.docsData);

  const redirectToList = async (item, listType, listPath) => {

    setSearchMode(false);
    let index;
    switch (listType) {

      case 'logins':
        index = loginIdsArray.findIndex(currItem => currItem._id === item._id);
        dispatch(rearrangeLoginIdsList(index));
        break;

      case 'cards':
        index = cardsArray.findIndex(currItem => currItem._id === item._id);
        dispatch(rearrangeCardsList(index));
        break;
      case 'docs':
        index = docsArray.findIndex(currItem => currItem._id === item._id);
        dispatch(rearrangeDocsList(index));
        break;

      default:
        break;
    }

    setSearchQuery('');
    dispatch(clearSearchData());
    setClickedSearchItem(item);

    navigate(listPath);
  }

  const handleSearchItemClicked = (item) => {
    let listType;
    if (item.hasOwnProperty('imageName')) {
      listType = 'docs';
      redirectToList(item, listType, '/user/diplay_documents')
    }
    else if (item.hasOwnProperty('username')) {
      listType = 'logins';
      redirectToList(item, listType, '/user/display_loginIds')
    }
    else {
      listType = 'cards';
      redirectToList(item, listType, '/user/display_cards')
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

export default SearchList;

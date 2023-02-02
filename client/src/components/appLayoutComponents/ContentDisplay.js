import React from "react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginIdsList from "../loginIdsComponent/LoginIdsList";
import CardsList from "../cardComponent/CardsList";
import FavList from "../favSectionComponent/FavList";
import DocsList from "../docsComponent/DocsList"
import Dashboard from "../dashboardComponent/Dashboard"
import Settings from "./Settings"

import { fecthLoginIdsData } from "../../redux/features/loginsId/loginsIdSlice"
import { fecthCardsData } from "../../redux/features/cards/cardsSlice"
import { fetchDocsData } from "../../redux/features/docs/docsSlice"
import { fectchActivitiesData } from "../../redux/features/activity/activitiesSlice"
import { fetchFavoritesData } from "../../redux/features/favorites/favoritesSlice";
import { fetchRecentlyAddedData } from "../../redux/features/recentlyAdded/recentlyAddedSlice"
import styles from "./styles/contentDisplay.module.css";
import SearchList from "../searchSection/SearchList";



const ContentDisplay = ({
  heading,
  setHeading,
  fieldLength,
  setFieldLength,
  imageData,
  setImageData,
  maximizeOrNot,
  setMaximizeOrNot,
  showHeaderFooter,
  setShowHeaderFooter,
  currDeletingDocId,
  setDocFullScreen,
  setFullScreenDocData,
  setLogoComponentShow,
  recAddDocFullScreen,
  setRecAddDocFullScreen,
  recAddDocFullScreenData,
  setRecAddDocFullScreenData,
  setShowFavDocFullScreen,
  showFavDocFullScreen,
  setFavDocFullScreenData,
  favDocFullScreenData,
  searchMode,
  setSearchMode,
  searchQuery,
  setSearchQuery,
  clickedSearchItem,
  setClickedSearchItem
  , searchBarRef
}) => {

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user._id);



  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fecthLoginIdsData({ user_id: userId }));
      dispatch(fecthCardsData({ user_id: userId }));
      dispatch(fetchDocsData({ user_id: userId }))
      dispatch(fectchActivitiesData({ user_id: userId }))
      dispatch(fetchFavoritesData({ user_id: userId }))
      dispatch(fetchRecentlyAddedData({ user_id: userId }))
    }
  }, [dispatch, userId]);

  const searchState = useSelector((state) => state.search.searchResults)


  return (

    <div className={styles.contentDisplay}>

      {searchState.length > 0 &&
        <SearchList
          setClickedSearchItem={setClickedSearchItem}
          clickedSearchItem={clickedSearchItem}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchBarRef={searchBarRef}
        />
      }

      <Routes>
        <Route path="/"
          element={
            <Dashboard
              recAddDocFullScreen={recAddDocFullScreen}
              setRecAddDocFullScreen={setRecAddDocFullScreen}
              recAddDocFullScreenData={recAddDocFullScreenData}
              setRecAddDocFullScreenData={setRecAddDocFullScreenData}
            />}
        >
        </Route>

        <Route path="user/display_loginIds"
          element={
            <LoginIdsList
              setLogoComponentShow={setLogoComponentShow}
              setClickedSearchItem={setClickedSearchItem}
              clickedSearchItem={clickedSearchItem}

            />
          }>
        </Route>

        <Route path="/user/display_cards"
          element={
            <CardsList
              setLogoComponentShow={setLogoComponentShow}
              setClickedSearchItem={setClickedSearchItem}
              clickedSearchItem={clickedSearchItem}

            />
          }
        >
        </Route>

        <Route path="/user/diplay_documents"
          element={
            <DocsList
              setDocFullScreen={setDocFullScreen}
              setFullScreenDocData={setFullScreenDocData}
              setClickedSearchItem={setClickedSearchItem}
              clickedSearchItem={clickedSearchItem}

            />
          } ></Route>

        <Route path="/user/favorites/*" element={<FavList

          setShowFavDocFullScreen={setShowFavDocFullScreen}
          showFavDocFullScreen={showFavDocFullScreen}
          setFavDocFullScreenData={setFavDocFullScreenData}
          favDocFullScreenData={favDocFullScreenData}
        />} >

        </Route>

        <Route path="/user/settings"
          element={
            <Settings
            />} >
        </Route>

      </Routes>

    </div>
  );
};

export default ContentDisplay;

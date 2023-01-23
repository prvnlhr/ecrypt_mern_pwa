import React from "react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  favDocFullScreenData
}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(fieldLength);
  }, [fieldLength]);

  useEffect(() => {
    dispatch(fecthLoginIdsData({ user_id: '63b43ab32fc8d3c100cafecc' }));
    dispatch(fecthCardsData({ user_id: '63b43ab32fc8d3c100cafecc' }));
    dispatch(fetchDocsData({ user_id: '63b43ab32fc8d3c100cafecc' }))
    dispatch(fectchActivitiesData({ user_id: '63b43ab32fc8d3c100cafecc' }))
    dispatch(fetchFavoritesData({ user_id: '63b43ab32fc8d3c100cafecc' }))
    dispatch(fetchRecentlyAddedData({ user_id: '63b43ab32fc8d3c100cafecc' }))
  }, []);

  return (

    <div className={styles.contentDisplay}>

      <Routes>
        <Route path="/"
          element={
            <Dashboard
              // setHeading={setHeading}
              // activities={activitiesArray}
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
            // loginIds={loginIdsArray}
            // currentId={currentId}
            // setCurrentId={setCurrentId}
            // setHeading={setHeading}
            />
          }>
        </Route>

        <Route path="/user/display_cards"
          element={
            <CardsList
              setLogoComponentShow={setLogoComponentShow}
            // cards={cardsArray}
            // currentId={currentId}
            // setCurrentId={setCurrentId}
            // setHeading={setHeading}
            />
          }
        >
        </Route>

        <Route path="/user/diplay_documents"
          element={
            <DocsList
              setDocFullScreen={setDocFullScreen}
              setFullScreenDocData={setFullScreenDocData}

            // docs={docsArray}
            // setHeading={setHeading}
            // imageData={imageData}
            // setImageData={setImageData}
            // maximizeOrNot={maximizeOrNot}
            // setMaximizeOrNot={setMaximizeOrNot}
            // showHeaderFooter={showHeaderFooter}
            // setShowHeaderFooter={setShowHeaderFooter}
            // currDeletingDocId={currDeletingDocId} 
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
            // setHeading={setHeading} 
            />} >
        </Route>

      </Routes>

    </div>
  );
};

export default ContentDisplay;

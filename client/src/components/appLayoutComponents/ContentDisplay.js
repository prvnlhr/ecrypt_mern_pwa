import React from "react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import LoginIdsList from "../loginIdsComponent/LoginIdsList";
import CardsList from "../cardComponent/CardsList";
import FavList from "../favSectionComponent/FavList";
import DocsList from "../docsComponent/DocsList"
import Dashboard from "../dashboardComponent/Dashboard"
import Settings from "./Settings"

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
  setLogoComponentShow
}) => {



  useEffect(() => {
    // console.log(fieldLength);
  }, [fieldLength]);

  return (

    <div className={styles.contentDisplay}>

      <Routes>
        <Route path="/dashboard"
          element={
            <Dashboard
            // setHeading={setHeading}
            // activities={activitiesArray}
            />}
        >
        </Route>

        <Route path="/user/display_loginIds"
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

        <Route path="/user/favorites/*"
          element={
            <FavList
            // setHeading={setHeading}
            // favoritesCardsArray={favoritesCardsArray}
            // favoritesDocsArray={favoritesDocsArray}
            // favoritesLoginsArray={favoritesLoginsArray}
            // setImageData={setImageData}
            // setMaximizeOrNot={setMaximizeOrNot}
            />
          } >
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

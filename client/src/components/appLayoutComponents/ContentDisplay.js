import React from "react";
import { useState, useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchUserCards } from "../../redux/actions/cardsAction";
import { fetchLoginIds } from "../../redux/actions/loginInIdsAction";
import { fetchDocs } from "../../redux/actions/documentsAction";
import { fetchActivity } from "../../redux/actions/activityAction";


import Dashboard from "../dashboardComponent/Dashboard";
import LoginIdsList from "../loginIdsComponent/LoginIdsList";
import CardsList from "../cardComponent/CardsList";
import FavList from "../favSectionComponent/FavList";
import DocsList from "../docsComponent/DocsList"
import Settings from "../settingsComponent/Settings";
import SearchList from "../searchSection/SearchList";

import styles from "./styles/contentDisplay.module.css";
import { CircleSpinner } from "react-spinners-kit";



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
  setDocFullScreen
}) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.user._id);

  const [currentId, setCurrentId] = useState(null);

  // useEffect(() => {

  // }, [token, dispatch]);
  useEffect(() => {
    if (userId) {
      dispatch(fetchActivity(userId));
      dispatch(fetchUserCards(userId));
      dispatch(fetchLoginIds(userId));
      dispatch(fetchDocs(userId));
      // console.log("hello");
    }
  }, [currentId, dispatch, userId]);

  useEffect(() => {
    // console.log(fieldLength);
  }, [fieldLength]);

  const loginIdsArray = useSelector((state) => state.logins.loginIds);
  const cardsArray = useSelector((state) => state.cards.cards);
  const docsArray = useSelector((state) => state.docs.docs);
  const activitiesArray = useSelector((state) => state.activities);

  const favoritesLoginsArray = useSelector(
    (state) => state.favorites.favoriteLoginsIds
  );
  const favoritesCardsArray = useSelector(
    (state) => state.favorites.favoriteCards
  );

  const favoritesDocsArray = useSelector(
    (state) => state.favorites.favoriteDocs
  );
  const searchResultArray = useSelector(
    (state) => state.searchResults.searchResults
  );

  // console.log(activitiesArray);
  return (

    <div className={styles.contentDisplay}>
      {searchResultArray.length > 0 && fieldLength > 0 ? (
        <SearchList
          searchResultArray={searchResultArray}
          setHeading={setHeading}
          imageData={imageData}
          setImageData={setImageData}
          maximizeOrNot={maximizeOrNot}
          setMaximizeOrNot={setMaximizeOrNot}
          showHeaderFooter={showHeaderFooter}
          setShowHeaderFooter={setShowHeaderFooter}
        />
      ) : null}
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

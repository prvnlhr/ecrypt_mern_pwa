import React from "react";
import { useState, useRef, useEffect } from "react";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import FavCardsList from "./cards/FavCardsList";
import FavDocsList from "./docs/FavDocsList";
import FavLoginIdsList from "./loginIds/FavLoginIdsList";
import styles from "./styles/favList.module.css";
const FavList = ({
  setShowFavDocFullScreen,
  showFavDocFullScreen,
  setFavDocFullScreenData,
  favDocFullScreenData
}) => {



  const location = useLocation();

  const indicatorRef = useRef();
  const loginLinkRef = useRef();
  const cardLinkRef = useRef();
  const docLinkRef = useRef();

  useEffect(() => {

    if (indicatorRef.current !== null) {
      switch (location.pathname) {
        case "/user/favorites/logins":
          var pos = loginLinkRef.current.offsetLeft;
          var newPos = pos + "px";
          indicatorRef.current.style.left = newPos;
          break;
        case "/user/favorites/cards":
          var pos = cardLinkRef.current.offsetLeft;
          var newPos = pos + "px";
          indicatorRef.current.style.left = newPos;
          break;
        case "/user/favorites/docs":
          var pos = docLinkRef.current.offsetLeft;
          var newPos = pos + "px";
          indicatorRef.current.style.left = newPos;
          break;
        default:
          break;
      }
    }

  }, [indicatorRef.current])

  const linkedClicked = (val) => {
    switch (val) {
      case 1:

        var pos = loginLinkRef.current.offsetLeft;
        var newPos = pos + "px";
        indicatorRef.current.style.left = newPos;
        break;
      case 2:
        var pos = cardLinkRef.current.offsetLeft;
        var newPos = pos + "px";
        indicatorRef.current.style.left = newPos;
        break;
      case 3:
        var pos = docLinkRef.current.offsetLeft;
        var newPos = pos + "px";
        indicatorRef.current.style.left = newPos;
        break;
      default:
        break;
    }

  }

  return (
    <div className={styles.favListWrapper}>

      <div className={styles.navigationBarWrapper} >
        <div className={styles.indicatorDiv} ref={indicatorRef}  ></div>

        <div className={styles.loginIdsLinkWrapper} ref={loginLinkRef} >
          <Link className={styles.linkStyles} to="/user/favorites/logins" onClick={() => linkedClicked(1)} >
            <p>LoginIds</p>
          </Link>
        </div>

        <div className={styles.cardsLinkWrapper} ref={cardLinkRef} >
          <Link className={styles.linkStyles} to="/user/favorites/cards" onClick={() => linkedClicked(2)} >
            <p>Cards</p>
          </Link>
        </div>

        <div className={styles.docsLinkWrapper} ref={docLinkRef}>
          <Link className={styles.linkStyles} to="/user/favorites/docs" onClick={() => linkedClicked(3)} >
            <p>Docs</p>
          </Link>
        </div>
      </div>

      <div className={styles.contentListWrapper} >

        <Routes>
          <Route path="/logins" element={<FavLoginIdsList />} />
          <Route path="/cards" element={<FavCardsList />} />
          <Route path="/docs" element={<FavDocsList
            setShowFavDocFullScreen={setShowFavDocFullScreen}
            showFavDocFullScreen={showFavDocFullScreen}
            setFavDocFullScreenData={setFavDocFullScreenData}
            favDocFullScreenData={favDocFullScreenData}
          />} />
        </Routes>


      </div>
    </div>
  );
}


export default FavList;

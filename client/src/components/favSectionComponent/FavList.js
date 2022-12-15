import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Route, Link, NavLink, Routes, useNavigate } from "react-router-dom";
import { fetchFavorites } from "../../redux/actions/favouriteAction";

import FavCardList from "./FavCardList";
import FavLoginList from "./FavLoginList";
import FavDocsList from "./FavDocsList";
import styles from "./styles/favList.module.css";

const FavList = ({
  favoritesCardsArray,
  favoritesDocsArray,
  favoritesLoginsArray,
  setHeading,
  maxImg,
  setMaxImg,
  setImageData,
  setMaximizeOrNot,
}) => {
  // const userId = useSelector((state) => state.user.user._id);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/home/user/favorites/favoritesLogins");
  //   // history.push({
  //   //   pathname: "/favorites/favoritesLogins",
  //   // });
  // }, []);

  // useEffect(() => {
  //   setHeading("Favorites");
  //   // <Redirect to={{pathname: "/favorites/favoritesLogins"}} />;

  //   dispatch(fetchFavorites(userId));
  // }, [dispatch, userId]);

  // let activeStyle = {
  //   backgroundColor: "#00b7fd",
  //   color: "white",
  //   borderRadius: "20px",
  //   width: "100px",
  // }
  return (
    <div className={styles.favListComponent}>
      {/* <div className={styles.navHeaderContainer}>
        <NavLink

          className={styles.navLink}
          to="/home/user/favorites/favoritesLogins"
          // style={{ borderRadius: "20px" }}
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
        >
          Logins
        </NavLink>
        <NavLink

          className={styles.navLink}
          to="/home/user/favorites/favoritesCards"
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
        >
          Cards
        </NavLink>
        <NavLink
          className={styles.navLink}
          to="/home/user/favorites/favoritesDocs"
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
        >
          Documents
        </NavLink>
      </div>

      <div className={styles.contentContainer}>
        <Routes>
          <Route path="/favoritesCards" element={

            <FavCardList favoritesCardsArray={favoritesCardsArray} />
          }>
          </Route>
          <Route path="/favoritesLogins" element={

            <FavLoginList favoritesLoginsArray={favoritesLoginsArray} />
          }>
          </Route>
          <Route path="/favoritesDocs" element={

            <FavDocsList
              favoritesDocsArray={favoritesDocsArray}
              setImageData={setImageData}
              setMaximizeOrNot={setMaximizeOrNot}
            />
          }>
          </Route>
        </Routes>

      </div> */}
    </div>
  );
}


export default FavList;

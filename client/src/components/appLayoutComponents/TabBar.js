import React from "react";

import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import styles from "./styles/tabBar.module.css"
const TabBar = () => {

  const [] = useState("");

  const location = useLocation();

  console.log(location.pathname);


  const refDash = useRef();
  const refLogins = useRef();
  const refCards = useRef();
  const refNotes = useRef();
  const refFavs = useRef();
  const indicatorRef = useRef();


  const linkedClicked = (val) => {
    switch (val) {
      case 1:
        var pos = refDash.current.offsetLeft;
        var newPos = pos + "px";
        indicatorRef.current.style.left = newPos;

        break;
      case 2:
        var pos = refLogins.current.offsetLeft;
        var newPos = pos + "px";
        indicatorRef.current.style.left = newPos;
        break;
      case 3:
        var pos = refCards.current.offsetLeft;
        var newPos = pos + "px";
        indicatorRef.current.style.left = newPos;
        break;
      case 4:
        var pos = refNotes.current.offsetLeft;
        var newPos = pos + "px";
        indicatorRef.current.style.left = newPos;
        break;
      case 5:
        var pos = refFavs.current.offsetLeft;
        var newPos = pos + "px";
        indicatorRef.current.style.left = newPos;
        break;
      default:
        break;
    }

  }

  return (
    <div className={styles.tabBarSection} >
      <div className={styles.tabBarIndicator} ref={indicatorRef} ></div>

      <div className={styles.tabIconContainer} ref={refDash}  >
        <div className={styles.tabbarIconsDiv}   >
          <Icon className={styles.tabbarIcons} onClick={() => linkedClicked(1)} icon="iconoir:home-simple" color="#7e8da4" />
        </div>
      </div>

      <div className={styles.tabIconContainer} ref={refLogins}   >
        <div className={styles.tabbarIconsDiv} >
          <Icon className={styles.tabbarIcons} onClick={() => linkedClicked(2)} icon="ant-design:key-outlined" color="#7e8da4" />
        </div>
      </div>

      <div className={styles.tabIconContainer} ref={refCards} >
        <div className={styles.tabbarIconsDiv}   >
          <Icon className={styles.tabbarIcons} onClick={() => linkedClicked(3)} icon="bi:credit-card-2-back" color="#7e8da4" />
        </div>
      </div>

      <div className={styles.tabIconContainer} ref={refNotes} >
        <div className={styles.tabbarIconsDiv}>
          <Icon className={styles.tabbarIcons} onClick={() => linkedClicked(4)} icon="system-uicons:document-words" color="#7e8da4" />
        </div>
      </div>

      <div className={styles.tabIconContainer} ref={refFavs}  >
        <div className={styles.tabbarIconsDiv}  >
          <Icon className={styles.tabbarIcons} onClick={() => linkedClicked(5)} icon="ion:bookmark-outline" color="#7e8da4" />
        </div>
      </div>


    </div>
  );
};

export default TabBar;



// import React from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { useRef, useEffect } from "react";

// import { useSelector } from "react-redux";
// import tabStyles from "./styles/tabBar.module.css";
// const TabBar = ({ fieldLength }) => {
//   const theme = useSelector((state) => state.theme.theme);
//   let activeNavLinkTextColor;

//   useEffect(() => {
//     if (theme === "dark") {
//       activeNavLinkTextColor = "white";
//     } else {
//       activeNavLinkTextColor = "black";
//     }
//   }, [theme]);
//   const searchResultArray = useSelector(
//     (state) => state.searchResults.searchResults
//   );
//   const location = useLocation();
//   const indicatorRef = useRef(null);
//   const nav1 = useRef(null);
//   const nav2 = useRef(null);
//   const nav3 = useRef(null);
//   const nav4 = useRef(null);
//   const nav5 = useRef(null);
//   const nav6 = useRef(null);

//   const tabBarRef = useRef(null);


//   useEffect(() => {
//     console.log(location.pathname, "dsdjhjhshd")
//     if (tabBarRef.current !== null) {
//       if (location.pathname === "/home" || "/") {
//         indicatorRef.current.style.left = nav1.current.offsetLeft + "px";
//         nav1.current.scrollIntoView({ behavior: "smooth", inline: "center" });
//       }

//       if (location.pathname === "/home/user/display_cards") {
//         indicatorRef.current.style.left = nav2.current.offsetLeft + "px";
//         nav2.current.scrollIntoView({ behavior: "smooth", inline: "center" });
//       }
//       if (location.pathname === "/home/user/display_loginIds") {
//         indicatorRef.current.style.left = nav3.current.offsetLeft + "px";
//         nav3.current.scrollIntoView({ behavior: "smooth", inline: "center" });
//       }
//       if (location.pathname === "/home/user/diplay_documents") {
//         indicatorRef.current.style.left = nav4.current.offsetLeft + "px";
//         nav4.current.scrollIntoView({ behavior: "smooth", inline: "center" });
//       }
//       if (
//         [
//           "/home/user/favorites",
//           "/home/user/favorites/favoritesLogins",
//           "/home/user/favorites/favoritesCards",
//           "/home/user/favorites/favoritesDocs",
//         ].includes(location.pathname)
//       ) {
//         indicatorRef.current.style.left = nav5.current.offsetLeft + "px";
//         nav5.current.scrollIntoView({ behavior: "smooth", inline: "center" });
//       }
//       if (location.pathname === "/home/user/settings") {
//         indicatorRef.current.style.left = nav6.current.offsetLeft + "px";
//         nav6.current.scrollIntoView({ behavior: "smooth", inline: "center" });
//       }
//     }
//   }, [tabBarRef.current]);

//   const bringClickedItemToCentre = () => {

//   }

//   const handleNavClick = (e) => {
//     var pos = e.target.offsetLeft;
//     console.log(e.target.offsetLeft);
//     var newPos = pos + "px";
//     indicatorRef.current.style.left = newPos;
//     indicatorRef.current.style.width = e.target.offsetWidth / 2 + "px";
//     console.log("dsdmdkdk", e);
//   };


//   let activeStyle = {
//     fontSize: "2rem",
//     color: `${theme === "dark" ? "white" : "black"}`,
//     fontWeight: "600",
//   };

//   return (
//     <>
//       {fieldLength > 0 && searchResultArray.length > 0 ? (
//         <div className={tabStyles.searchHeadingContainer}>
//           <p>Search Results</p>
//           <div className={tabStyles.bottomBorderDivSearch}></div>
//         </div>
//       ) : (
//         <div className={tabStyles.tabBarContainer} ref={tabBarRef}>
//           <div
//             ref={indicatorRef}
//             className={tabStyles.indicator}
//           ></div>

//           <div
//             className={tabStyles.navLinkDiv}
//             onClick={handleNavClick}
//             ref={nav1}
//           >
//             <NavLink
//               to="/home/dashboard"
//               className={`${tabStyles.navLink}`}
//               style={({ isActive }) =>
//                 isActive ? activeStyle : undefined
//               }
//             >
//               Dashboard
//             </NavLink>
//           </div>
//           <div
//             className={tabStyles.navLinkDiv}
//             onClick={handleNavClick}
//             ref={nav2}
//           >
//             <NavLink
//               to="/home/user/display_cards"
//               className={`${tabStyles.navLink}`}
//               style={({ isActive }) =>
//                 isActive ? activeStyle : undefined
//               }

//             >
//               Cards

//             </NavLink>
//           </div>
//           <div
//             className={tabStyles.navLinkDiv}
//             onClick={handleNavClick}
//             ref={nav3}
//           >
//             <NavLink
//               to="/home/user/display_loginIds"
//               className={`${tabStyles.navLink}`}
//               style={({ isActive }) =>
//                 isActive ? activeStyle : undefined
//               }
//             >
//               Logins

//             </NavLink>
//           </div>
//           <div
//             className={tabStyles.navLinkDiv}
//             onClick={handleNavClick}
//             ref={nav4}
//           >
//             <NavLink
//               to="/home/user/diplay_documents"
//               className={`${tabStyles.navLink}`}
//               style={({ isActive }) =>
//                 isActive ? activeStyle : undefined
//               }
//             >
//               Documents

//             </NavLink>
//           </div>
//           <div
//             className={tabStyles.navLinkDiv}
//             onClick={handleNavClick}
//             ref={nav5}
//           >
//             <NavLink
//               to="/home/user/favorites"
//               className={`${tabStyles.navLink}`}
//               style={({ isActive }) =>
//                 isActive ? activeStyle : undefined
//               }
//             >
//               Favorites

//             </NavLink>
//           </div>
//           <div
//             className={tabStyles.navLinkDiv}
//             onClick={handleNavClick}
//             ref={nav6}
//           >
//             <NavLink
//               to="/home/user/settings"
//               className={`${tabStyles.navLink}`}
//               style={({ isActive }) =>
//                 isActive ? activeStyle : undefined
//               }
//             >
//               Settings

//             </NavLink>
//           </div>
//         </div>
//       )
//       }
//     </>
//   );
// };

// export default TabBar;

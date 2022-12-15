import React, { useEffect } from "react";
import { useState, useRef, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Location, useLocation } from "react-router-dom";
import homeStyles from "./styles/home.module.css";

import docFullStyles from "../docsComponent/styles/documentFullScreen.module.css";
import ContentDisplay from "./ContentDisplay";

import { logout } from "../../redux/actions/auth";
import HeaderBar from "./HeaderBar";
import TabBar from "./TabBar";
import { toggleTheme } from "../../redux/actions/userAction";
import SearchSection from "./SearchSection";
import SideBar from "./SideBar";
import { Icon } from '@iconify/react';
import Settings from "./Settings";
import DocFullScreen from "../docsComponent/DocFullScreen";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const node = useRef();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const loadState = useSelector((state) => state.loading);
  const theme = useSelector((state) => state.theme.theme);

  const [docFullScreen, setDocFullScreen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log(docFullScreen);
  }, [docFullScreen])



  const handleLogout = () => {
    localStorage.removeItem("firstLogin");
    dispatch(logout(useNavigate));
  };
  const toggleAppTheme = () => {
    if (theme === "dark") {
      dispatch(toggleTheme("light"));
    } else {
      dispatch(toggleTheme("dark"));
    }
  };

  return (
    <div className={location.pathname === "/user/settings" ? homeStyles.homeComponentForSettings : homeStyles.homeComponent}>



      <DocFullScreen
        setDocFullScreen={setDocFullScreen}
        docFullScreen={docFullScreen}
      />
      {/* {docFullScreen &&
      } */}
      {location.pathname === "/user/settings"
        ?
        <Settings />
        :
        <>
          <div className={homeStyles.sideBarSection}>
            <SideBar />
          </div>

          <HeaderBar
            open={open}
            setOpen={setOpen}
            node={node} />
          <SearchSection />
          <ContentDisplay
            setDocFullScreen={setDocFullScreen}
          />
          <TabBar />
        </>
      }
    </div>
  );
};

export default Home;


// return (
//   <div className={homeStyles.homeComponent}>

//     <HeaderBar fieldLength={fieldLength}
//       setFieldLength={setFieldLength}
//       open={open}
//       setOpen={setOpen}
//       node={node} />
//     <SearchSection />

//     <TabBar fieldLength={fieldLength} />

//     <ContentDisplay heading={heading}
//       setHeading={setHeading}
//       fieldLength={fieldLength}
//       setFieldLength={setFieldLength}
//       imageData={imageData}
//       setImageData={setImageData}
//       maximizeOrNot={maximizeOrNot}
//       setMaximizeOrNot={setMaximizeOrNot}
//       showHeaderFooter={showHeaderFooter}
//       setShowHeaderFooter={setShowHeaderFooter}
//       currDeletingDocId={currDeletingDocId} />
//   </div>
// );
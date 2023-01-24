import React, { useEffect } from "react";
import { useState, useRef, } from "react";
import { useNavigate, Location, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import homeStyles from "./styles/home.module.css";
import docFullStyles from "../docsComponent/styles/documentFullScreen.module.css";
import ContentDisplay from "./ContentDisplay";

import HeaderBar from "./HeaderBar";
import TabBar from "./TabBar";
import SearchSection from "./SearchSection";
import SideBar from "./SideBar";
import { Icon } from '@iconify/react';
import Settings from "./Settings";
import DocFullScreen from "../docsComponent/DocFullScreen";
import LogoComponentWrapper from "../logoComponents/LogoComponentWrapper"
import DocFullScreenRecentAct from "../dashboardComponent/recentlyAddedSection/DocFullScreenRecentAct";
import FavDocFullScreen from "../favSectionComponent/docs/FavDocFullScreen"

import { getUserDetails } from "../../redux/features/user/userSlice"
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { token } = auth;

  // useEffect(() => {
  //   dispatch(getUserDetails(token));

  // }, [token])
  const node = useRef();

  const [open, setOpen] = useState(false);
  const [logoComponentShow, setLogoComponentShow] = useState(false);
  const [docFullScreen, setDocFullScreen] = useState(false);
  const [recAddDocFullScreen, setRecAddDocFullScreen] = useState(false);
  const [recAddDocFullScreenData, setRecAddDocFullScreenData] = useState({});
  const [fullScreenData, setFullScreenDocData] = useState({});

  const [showFavDocFullScreen, setShowFavDocFullScreen] = useState(false);
  const [favDocFullScreenData, setFavDocFullScreenData] = useState({});


  return (
    <div className={location.pathname === "/user/settings" ? homeStyles.homeComponentForSettings : homeStyles.homeComponent}>

      <DocFullScreenRecentAct
        recAddDocFullScreen={recAddDocFullScreen}
        setRecAddDocFullScreen={setRecAddDocFullScreen}
        recAddDocFullScreenData={recAddDocFullScreenData}
        setRecAddDocFullScreenData={setRecAddDocFullScreenData}
      />

      <FavDocFullScreen
        setShowFavDocFullScreen={setShowFavDocFullScreen}
        showFavDocFullScreen={showFavDocFullScreen}
        setFavDocFullScreenData={setFavDocFullScreenData}
        favDocFullScreenData={favDocFullScreenData}
      />

      <DocFullScreen
        setDocFullScreen={setDocFullScreen}
        docFullScreen={docFullScreen}
        fullScreenData={fullScreenData}
        setFullScreenDocData={setFullScreenDocData}
      />

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
            setFullScreenDocData={setFullScreenDocData}
            setLogoComponentShow={setLogoComponentShow}
            recAddDocFullScreen={recAddDocFullScreen}
            setRecAddDocFullScreen={setRecAddDocFullScreen}
            recAddDocFullScreenData={recAddDocFullScreenData}
            setRecAddDocFullScreenData={setRecAddDocFullScreenData}
            setShowFavDocFullScreen={setShowFavDocFullScreen}
            showFavDocFullScreen={showFavDocFullScreen}
            setFavDocFullScreenData={setFavDocFullScreenData}
            favDocFullScreenData={favDocFullScreenData}
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
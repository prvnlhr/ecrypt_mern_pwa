import React, { useEffect } from "react";
import { useState, useRef, } from "react";
import { useNavigate, Location, useLocation } from "react-router-dom";
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

const Home = () => {
  const navigate = useNavigate();
  const node = useRef();
  const [open, setOpen] = useState(false);
  const [logoComponentShow, setLogoComponentShow] = useState(false);
  const [docFullScreen, setDocFullScreen] = useState(false);
  const [fullScreenData, setFullScreenDocData] = useState({});
  const location = useLocation();

  useEffect(() => {
    console.log(docFullScreen);
  }, [docFullScreen])





  return (
    <div className={location.pathname === "/user/settings" ? homeStyles.homeComponentForSettings : homeStyles.homeComponent}>

      {/* {logoComponentShow &&
        <LogoComponentWrapper setLogoComponentShow={setLogoComponentShow} />
      } */}

      <DocFullScreen
        setDocFullScreen={setDocFullScreen}
        docFullScreen={docFullScreen}
        fullScreenData={fullScreenData}
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
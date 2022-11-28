import React from "react";
import { useState, useRef, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import homeStyles from "./styles/home.module.css";
import ContentDisplay from "./ContentDisplay";

import { logout } from "../../redux/actions/auth";
import HeaderBar from "./HeaderBar";
import TabBar from "./TabBar";
import MaximizeDoc from "../docsComponent/MaximizeDoc";
import { toggleTheme } from "../../redux/actions/userAction";
import SearchSection from "./SearchSection";
import SideBar from "./SideBar";
import { Icon } from '@iconify/react';

// const MaximizeDoc = lazy(() => import("../document/MaximizeDoc"));

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const node = useRef();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState();
  const [fieldLength, setFieldLength] = useState();

  const [maximizeOrNot, setMaximizeOrNot] = useState(false);
  const [imageData, setImageData] = useState("");
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);
  const loadState = useSelector((state) => state.loading);
  const theme = useSelector((state) => state.theme.theme);

  const { place, isLoading } = loadState;

  // for spinner while deleting document
  const [currDeletingDocId, setCurrentDeletingDocId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("firstLogin");
    dispatch(logout(useNavigate));
    // history.push("/login");
  };
  const toggleAppTheme = () => {
    if (theme === "dark") {
      dispatch(toggleTheme("light"));
    } else {
      dispatch(toggleTheme("dark"));
    }
  };

  return (
    <div className={homeStyles.homeComponent}>
      <div className={homeStyles.sideBarSection}>
        <SideBar />
      </div>

      <HeaderBar
        setFieldLength={setFieldLength}
        open={open}
        setOpen={setOpen}
        node={node} />

      <SearchSection />
      <ContentDisplay />
      <TabBar />
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
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@iconify/react';
import LogoutIcon from "../icons/LogoutIcon"
import SettingsIcon from "../icons/SettingsIcon"
import { getUserDetails } from "../../redux/features/user/userSlice"

import { toggleUiTheme } from "../../redux/features/ui/uiSlice"


import moment from "moment";
import headerStyles from "./styles/headerBar.module.css";
import logoStyles from "./styles/appLogoStyles.module.css"
import { logOutUser } from "../../redux/features/auth/authSlice"
import AppLogo from "./AppLogo";
import AppLogoHeaderBar from "./AppLogoHeaderBar";

const HeaderBar = ({ fieldLength, setFieldLength, open, setOpen, node }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const uiState = useSelector((state) => state.ui);
  const isDarkMode = useSelector((state) => state.ui.darkMode);


  const { token, } = auth;

  const [searchQuery, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);


  const btnClicked = () => {
    // console.log(token);
    dispatch(getUserDetails(token));
  }

  useEffect(() => {
    let handler = (e) => {
      if (!node.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const [lightTheme, setTheme] = useState(true);

  const toggleTheme = () => {
    setTheme(!lightTheme);
    localStorage.setItem("theme", !isDarkMode);
    dispatch(toggleUiTheme(!isDarkMode));

  }

  const togglePopup = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const settingsLinkedClicked = (e) => {
    setOpen(false);
  }


  const logOutBtnClicked = () => {
    dispatch(logOutUser({}))
  }

  const day = moment().format("dddd");
  const date = moment().format('DD MMM YYYY');





  //________________________________________________________________________________________________

  return (

    <div className={headerStyles.headerBar}>
      <div className={headerStyles.logoWrapper} >
        <div className={headerStyles.logoDiv}>
          <AppLogo
            unique_id={'79kk09as1q'}
          />

        </div>
      </div>
      <div className={headerStyles.dateWrapper}>
        <div className={headerStyles.dayDiv}>
          <p className={headerStyles.dayText}>{day},</p>
        </div>
        <div className={headerStyles.dateDiv}>
          <p className={headerStyles.dateText}>{date}</p>
        </div>
      </div>
      <div className={headerStyles.avatarNameWrapper}>
        <div className={headerStyles.nameContainer}>
          <p className={headerStyles.grettingText}>Hello,</p>
          <p className={headerStyles.nameText}>{userState?.firstName}</p>
        </div>
        <div className={headerStyles.avatarContainer}>
          <div className={headerStyles.avatarDiv}>
            <div className={headerStyles.avatarImgDiv}>
              <img src={userState?.profilePic.picUrl} />
            </div>
          </div>
        </div>
      </div>
      <div className={headerStyles.popUpWrapper} ref={node} >
        <svg
          onClick={() => setOpen((open) => !open)}
          className={headerStyles.popUpIcon}
          width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18.24" cy="18.24" r="18.24" fill="#7E8DA4" />
          <circle cx="84.7205" cy="18.24" r="18.24" fill="#7E8DA4" />
          <circle cx="18.24" cy="84.72" r="18.24" fill="#7E8DA4" fill-opacity="0.42" />
          <circle cx="84.7205" cy="84.72" r="18.24" fill="#7E8DA4" />
        </svg>
        {open && (
          <div className={`${headerStyles.popUpMenuContainer}`}>
            <div className={headerStyles.topSection} >
              <div className={headerStyles.themeToggleWrapper}>
                <div className={headerStyles.toggleContainer} onClick={toggleTheme}>
                  <div className={headerStyles.toggleDiv}>
                    <div className={!isDarkMode ? headerStyles.toggleBtnDivLeft : headerStyles.toggleBtnDivRight}  >
                      <div className={headerStyles.toggleIconDiv} >
                        {!isDarkMode ?
                          <Icon className={headerStyles.toggleIconLight} icon="mingcute:sun-line" color="#f3b821" /> :
                          <Icon className={headerStyles.toggleIconDark} icon="akar-icons:moon" color="white" />
                        }
                      </div>
                      <div className={headerStyles.toggleTextDiv} >
                        <p className={headerStyles.toggleBtnText} >
                          {!isDarkMode ? "Light" : "Dark"}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <Link to="/user/settings" onClick={settingsLinkedClicked} className={headerStyles.settingsLinkContainer}
              >
                <div className={headerStyles.iconDiv} >
                  <SettingsIcon />
                </div>

                <p className={headerStyles.settingsText}>Settings</p>
              </Link>
            </div>
            <div className={headerStyles.bottomSection} >
              <div className={headerStyles.logOutDiv} >
                <div className={headerStyles.logOutIconDiv} >
                  < LogoutIcon />
                </div>
                <p className={headerStyles.logoutText} onClick={logOutBtnClicked} >Logout</p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div >
  );
};
export default HeaderBar;

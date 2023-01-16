import React, { useEffect } from "react";
import styles from "./styles/loginIdComponent.module.css";
import { logosArray } from "../logoComponents/logosData"
import BookmarksIcon from "../icons/BookmarksIcon"
import BookmarksIconFill from "../icons/BookmarksIconFill"
const LoginId = ({ loginId, handleLoginIdClicked }) => {

  return (
    <>
      <div className={styles.loginInWrapper}
        onClick={() => {
          handleLoginIdClicked(loginId);
        }}
      >
        <div className={styles.logoWrapper} >
          <div className={styles.logoDiv}>
            {logosArray[loginId.logoIndex].logo}
          </div>
        </div>
        <div className={styles.titleWrapper} >
          <p className={styles.titleText}>
            {loginId.title}
          </p>
        </div>
        <div className={styles.usernameWrapper} >
          <p className={styles.userNameText}>
            {loginId.username}
          </p>
        </div>
        <div className={styles.favBtnWrapper} >
          <div className={styles.favBtnDiv} >
            {
              loginId.isFavourite === true ?
                <BookmarksIconFill /> :
                <BookmarksIcon />
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginId;


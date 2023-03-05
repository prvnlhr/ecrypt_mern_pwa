import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/activateAccountPage.module.css";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { activateUserAccount } from "../../redux/features/auth/authSlice"
const ActivateAccount = () => {

  const authState = useSelector((state => state.auth));
  const { authResponseMessage, error, success } = authState;
  const dispatch = useDispatch();

  const { activation_token } = useParams();

  const handleActivateBtnClicked = () => {
    console.log(activation_token);
    dispatch(activateUserAccount(activation_token))
  }
  return (
    <div className={styles.acitveAccountPage}>
      <div className={styles.activateAccountForm} >
        <div className={styles.formHeaderWrapper} >
          <div className={styles.formLabelDiv} >
            <p>Click to activate account</p>
          </div>
        </div>
        <div className={styles.formMessageWrapper} >
          {authResponseMessage &&
            <div className={`${styles.messageDiv} ${error ? styles.messageDivError : styles.messageDivSuccess}`} >
              {
                error &&
                <div className={styles.errorMessageIconDiv} >
                  <Icon className={styles.warningIcon} icon="ph:warning" />
                </div>
              }
              <p>{authResponseMessage}</p>
            </div>
          }
        </div>
        <div className={styles.formActivateBtnWrapper} >
          <button onClick={handleActivateBtnClicked} className={styles.activateBtn}>Activate Account</button>
        </div>
        <div className={styles.formFooterWrapper} >
          {error ?
            <p>Sign Up again ?
              <Link to="/user/register">
                <span className={styles.spanText}> Sign Up </span>
              </Link>
            </p>
            : success &&
            <p>
              <Link to="/user/login">
                <span className={styles.spanText}>Login </span>
              </Link>
            </p>
          }

        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;

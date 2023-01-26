import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/forgotPass.module.css"
import { Link, useNavigate } from "react-router-dom";
import { forgotAccountPass } from "../../redux/features/auth/authSlice"
import { Icon } from '@iconify/react';
const ForgotPassword = () => {


  const dispatch = useDispatch();
  const [currFocusField, setCurrFocusField] = useState(undefined);
  const authState = useSelector((state => state.auth));

  const [formMessage, setFormMessage] = useState({
    message: undefined,
    error: false
  });
  const { message, error } = formMessage;

  const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validateEmail = (email) => {
    if (validRegex.test(String(email).toLowerCase())) {
      return true;
    }
    else {
      return false;
    }
  }

  const [formData, setFromData] = useState({
    email: 'prvnlhr522@gmail.com',
  });

  const onFocus = (val) => {
    setCurrFocusField(val)
  }
  const handleDataFormChange = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmitBtnClicked = () => {
    if (validateEmail(formData.email)) {
      console.log('submitting', formMessage)
      dispatch(forgotAccountPass(formData.email));
    } else {
      setFormMessage({
        ...formMessage,
        message: 'Not a valid email id',
        error: true,
      })
    }
  }
  return (
    <div className={styles.forgotPassPage} >

      <div className={styles.forgotPassWrapper} >
        <div className={styles.formHeaderWrapper} >
          <div className={styles.formLabelDiv} >
            <p>Verify your email to get reset link</p>
          </div>
        </div>
        <div className={styles.formMessageWrapper} >
          {(authState.authResponseMessage || message) &&
            <div className={`${styles.messageDiv} ${(error || authState.error) ? styles.messageDivError : styles.messageDivSuccess}`} >
              {
                (error || authState.error) &&
                <div className={styles.errorMessageIconDiv} >
                  <Icon className={styles.warningIcon} icon="ph:warning" />
                </div>
              }
              <p>{
                formMessage.message !== undefined ? formMessage.message
                  : authState.authResponseMessage !== undefined && authState.authResponseMessage
              }</p>
            </div>
          }
        </div>
        <div className={styles.emailWrapper} >
          <div className={`${styles.emailAddressContainer} ${currFocusField === 1 && styles.focusFieldStyle} `}  >
            <div className={styles.iconDiv} >
              <Icon className={styles.fieldIcon} icon="prime:user" />
            </div>
            <div className={styles.labelDiv} >
              <p>EMAIL ADDRESS</p>
            </div>
            <div className={styles.inputDiv} >
              <input value={formData.email} name="email" onFocus={() => onFocus(1)}
                onChange={handleDataFormChange}
              />
            </div>
          </div>

        </div>
        <div className={styles.sendResetLinkBtnWrapper} >
          <button onClick={handleSubmitBtnClicked} className={styles.sendLinkBtn}>Send Link</button>
        </div>
        <div className={styles.formFooterWrapper} >
          <Link to="/user/login">
            <p>Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@iconify/react';
import styles from "./styles/signInPage.module.css"
import { validateSignInForm } from "./helperFunctions/formValidation"
import { loginUser } from "../../redux/features/auth/authSlice"
const SignInPage = () => {

  const authState = useSelector((state => state.auth));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formMessage, setFormMessage] = useState({
    message: undefined,
    error: false
  });

  const { message, error } = formMessage;
  const [currFocusField, setCurrFocusField] = useState(undefined);

  const onFocus = (val) => {
    setCurrFocusField(val)
  }

  const [formData, setFromData] = useState({
    email: 'prvnlhr522@gmail.com',
    password: 'Prvnpr@123',
  });




  const handleFormSubmit = async (e) => {
    // console.log(formData);

    e.preventDefault();

    setFormMessage({
      message: undefined,
      error: undefined
    })
    const res = validateSignInForm(formData);
    if (res.error) {
      setFormMessage({
        message: res.message,
        error: res.error
      })
      console.log('error');
      return;
    }
    else {
      setFormMessage({
        message: undefined,
        error: false
      })
      console.log(formData);
      dispatch(loginUser(
        {
          formData: formData,
          navigate: navigate
        }
      ));

      console.log('confirm submit')
    }

  }
  const handleDataFormChange = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    })
  }
  return (
    <div className={styles.formPageWrapper} >
      <div className={styles.formWrapper} >
        <div className={styles.formHeaderWrapper} >
          <div className={styles.formLabelDiv} >
            <p>Sign In</p>
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
        <form className={styles.formTagContainer} onSubmit={handleFormSubmit} >

          <div className={styles.emailAddressWrapper}>
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

          <div className={styles.passwordWrapper}>
            <div className={`${styles.passwordContainer} ${currFocusField === 2 && styles.focusFieldStyle} `}  >
              <div className={styles.iconDiv} ><Icon className={styles.fieldIcon} icon="fluent:password-16-regular" /></div>
              <div className={styles.labelDiv} >
                <p>PASSWORD</p>
              </div>
              <div className={styles.inputDiv} >
                <input value={formData.password} name="password" onFocus={() => onFocus(2)}
                  onChange={handleDataFormChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.passForgetWrapper} >
            <Link to="/user/forgotPassword">
              <p>Forgot Password ?</p>
            </Link>
          </div>

          <div className={styles.submitBtnWrapper}>
            <button className={styles.submitBtn}>Login</button>
          </div>
        </form>

        <div className={styles.formFooterWrapper} >
          <p>Don't have an account ?
            <Link to="/user/register">
              <span>Sign Up </span>
            </Link>
          </p>
        </div>
      </div >
    </div >
  )
}

export default SignInPage
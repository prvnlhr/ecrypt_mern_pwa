import React, { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '@iconify/react';
import styles from "./styles/signUpPage.module.css"
import { formValidation, validateSignUpForm } from "./helperFunctions/formValidation"
import { registerUser } from "../../redux/features/auth/authSlice"
const SignUpPage = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.darkMode);

  const authState = useSelector((state => state.auth));
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
    firstName: 'Praveen',
    lastName: 'Lohar',
    email: 'prvnlhr522@gmail.com',
    password: 'Prvnpr@123',
    confirmPassword: 'Prvnpr@123',
  });



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({
      message: undefined,
      error: undefined
    })
    const res = validateSignUpForm(formData);

    if (res.error) {
      setFormMessage({
        message: res.message,
        error: res.error
      })
      console.log('error');
      return;
    } else {
      setFormMessage({
        message: undefined,
        error: false
      })
      dispatch(registerUser(formData));
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
            <p>Sign Up</p>
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

          <div className={styles.firstNameWrapper}>
            <div className={`${styles.firstNameContainer} ${currFocusField === 1 && styles.focusFieldStyle} `}  >
              <div className={styles.iconDiv} >
                <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6551 12.2241V2.44827C12.6551 1.64841 12.0066 1 11.2068 1H2.51712C1.71726 1 1.06885 1.64842 1.06885 2.44828V15.4828C1.06885 16.2826 1.71726 16.931 2.51712 16.931H7.94816" stroke={isDarkMode ? "#5294E2" : "#002A9A"} stroke-width="1.5" />
                  <path d="M11.4195 14.6396C11.4922 14.6396 11.5633 14.6496 11.6328 14.6694C11.7022 14.6893 11.7601 14.7223 11.8064 14.7686C11.8527 14.8116 11.8758 14.8695 11.8758 14.9422C11.8758 15.0249 11.851 15.091 11.8014 15.1406C11.7551 15.1869 11.7006 15.2101 11.6377 15.2101C11.608 15.2101 11.5633 15.2035 11.5038 15.1902C11.4443 15.1737 11.3864 15.1654 11.3302 15.1654C11.2475 15.1654 11.183 15.1836 11.1367 15.22C11.0937 15.2564 11.064 15.2994 11.0475 15.349C11.0309 15.3953 11.0227 15.4366 11.0227 15.473V18.0077C11.0227 18.0937 10.9945 18.1665 10.9383 18.226C10.8821 18.2822 10.811 18.3103 10.725 18.3103C10.6391 18.3103 10.568 18.2822 10.5117 18.226C10.4555 18.1665 10.4274 18.0937 10.4274 18.0077V15.4779C10.4274 15.2432 10.5101 15.0447 10.6754 14.8827C10.8408 14.7207 11.0888 14.6396 11.4195 14.6396ZM11.474 15.7061C11.5534 15.7061 11.6195 15.7326 11.6725 15.7855C11.7254 15.8351 11.7518 15.8996 11.7518 15.9789C11.7518 16.0583 11.7254 16.1244 11.6725 16.1774C11.6195 16.227 11.5534 16.2518 11.474 16.2518H10.1596C10.0802 16.2518 10.014 16.227 9.96114 16.1774C9.90823 16.1244 9.88177 16.0583 9.88177 15.9789C9.88177 15.8996 9.90823 15.8351 9.96114 15.7855C10.014 15.7326 10.0802 15.7061 10.1596 15.7061H11.474ZM13.6393 15.6069C13.8841 15.6069 14.0692 15.6582 14.1949 15.7607C14.3239 15.8632 14.4115 16.0004 14.4578 16.1724C14.5074 16.341 14.5322 16.5295 14.5322 16.7379V18.0077C14.5322 18.0937 14.5041 18.1665 14.4479 18.226C14.3917 18.2822 14.3206 18.3103 14.2346 18.3103C14.1486 18.3103 14.0775 18.2822 14.0213 18.226C13.9651 18.1665 13.937 18.0937 13.937 18.0077V16.7379C13.937 16.6287 13.9221 16.5312 13.8923 16.4452C13.8659 16.3559 13.8163 16.2848 13.7435 16.2319C13.6708 16.179 13.5666 16.1526 13.431 16.1526C13.2987 16.1526 13.1863 16.179 13.0937 16.2319C13.0044 16.2848 12.935 16.3559 12.8854 16.4452C12.8391 16.5312 12.8159 16.6287 12.8159 16.7379V18.0077C12.8159 18.0937 12.7878 18.1665 12.7316 18.226C12.6754 18.2822 12.6043 18.3103 12.5183 18.3103C12.4323 18.3103 12.3612 18.2822 12.305 18.226C12.2488 18.1665 12.2207 18.0937 12.2207 18.0077V15.9591C12.2207 15.8731 12.2488 15.802 12.305 15.7458C12.3612 15.6863 12.4323 15.6565 12.5183 15.6565C12.6043 15.6565 12.6754 15.6863 12.7316 15.7458C12.7878 15.802 12.8159 15.8731 12.8159 15.9591V16.1724L12.7415 16.1575C12.7713 16.1013 12.8143 16.0418 12.8705 15.9789C12.9267 15.9128 12.9929 15.8516 13.0689 15.7954C13.145 15.7392 13.2309 15.6945 13.3268 15.6615C13.4227 15.6251 13.5269 15.6069 13.6393 15.6069Z" stroke={isDarkMode ? "#5294E2" : "#002A9A"} />
                  <circle cx="12.2931" cy="16.569" r="3.9569" stroke={isDarkMode ? "#5294E2" : "#002A9A"} stroke-width="1.5" />
                  <line x1="4.32765" y1="6.43102" x2="9.39661" y2="6.43102" stroke={isDarkMode ? "#5294E2" : "#002A9A"} stroke-width="0.724138" stroke-linecap="round" />
                  <line x1="5.05177" y1="9.32763" x2="8.67246" y2="9.32763" stroke={isDarkMode ? "#5294E2" : "#002A9A"} stroke-width="0.724138" stroke-linecap="round" />
                </svg>

              </div>
              <div className={styles.labelDiv} >
                <p>FIRST NAME</p>
              </div>
              <div className={styles.inputDiv} >
                <input value={formData.firstName} name="firstName" onFocus={() => onFocus(1)}
                  onChange={handleDataFormChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.LastNameWrapper}>
            <div className={`${styles.lastNameContainer} ${currFocusField === 2 && styles.focusFieldStyle} `}  >
              <div className={styles.iconDiv} >
                <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5862 12.2241V2.44827C12.5862 1.64841 11.9378 1 11.1379 1H2.44828C1.64841 1 1 1.64842 1 2.44828V15.4828C1 16.2826 1.64842 16.931 2.44828 16.931H7.87931" stroke={isDarkMode ? "#5294E2" : "#002A9A"} stroke-width="1.5" />
                  <path d="M11.0456 18.0077C11.0456 18.0937 11.0159 18.1665 10.9564 18.226C10.9001 18.2822 10.829 18.3103 10.7431 18.3103C10.6604 18.3103 10.591 18.2822 10.5348 18.226C10.4785 18.1665 10.4504 18.0937 10.4504 18.0077V14.9425C10.4504 14.8565 10.4785 14.7854 10.5348 14.7292C10.5943 14.6697 10.667 14.6399 10.753 14.6399C10.839 14.6399 10.9084 14.6697 10.9613 14.7292C11.0175 14.7854 11.0456 14.8565 11.0456 14.9425V18.0077ZM13.1563 15.6071C13.401 15.6071 13.5861 15.6584 13.7118 15.7609C13.8407 15.8634 13.9284 16.0006 13.9747 16.1725C14.0243 16.3412 14.0491 16.5297 14.0491 16.738V18.0077C14.0491 18.0937 14.021 18.1665 13.9647 18.226C13.9085 18.2822 13.8374 18.3103 13.7515 18.3103C13.6655 18.3103 13.5944 18.2822 13.5382 18.226C13.482 18.1665 13.4539 18.0937 13.4539 18.0077V16.738C13.4539 16.6289 13.439 16.5313 13.4092 16.4453C13.3828 16.3561 13.3332 16.285 13.2604 16.2321C13.1877 16.1792 13.0835 16.1527 12.9479 16.1527C12.8157 16.1527 12.7033 16.1792 12.6107 16.2321C12.5214 16.285 12.4519 16.3561 12.4023 16.4453C12.3561 16.5313 12.3329 16.6289 12.3329 16.738V18.0077C12.3329 18.0937 12.3048 18.1665 12.2486 18.226C12.1924 18.2822 12.1213 18.3103 12.0353 18.3103C11.9493 18.3103 11.8782 18.2822 11.822 18.226C11.7658 18.1665 11.7377 18.0937 11.7377 18.0077V15.9593C11.7377 15.8733 11.7658 15.8022 11.822 15.746C11.8782 15.6865 11.9493 15.6567 12.0353 15.6567C12.1213 15.6567 12.1924 15.6865 12.2486 15.746C12.3048 15.8022 12.3329 15.8733 12.3329 15.9593V16.1725L12.2585 16.1577C12.2883 16.1014 12.3313 16.0419 12.3875 15.9791C12.4437 15.913 12.5098 15.8518 12.5859 15.7956C12.6619 15.7394 12.7479 15.6947 12.8438 15.6617C12.9397 15.6253 13.0438 15.6071 13.1563 15.6071Z" stroke={isDarkMode ? "#5294E2" : "#002A9A"} />
                  <circle cx="12.2242" cy="16.569" r="3.9569" stroke={isDarkMode ? "#5294E2" : "#002A9A"} stroke-width="1.5" />
                  <line x1="4.2588" y1="6.43102" x2="9.32776" y2="6.43102" stroke={isDarkMode ? "#5294E2" : "#002A9A"} stroke-width="0.724138" stroke-linecap="round" />
                  <line x1="4.98292" y1="9.32763" x2="8.60361" y2="9.32763" stroke={isDarkMode ? "#5294E2" : "#002A9A"} stroke-width="0.724138" stroke-linecap="round" />
                </svg>

              </div>
              <div className={styles.labelDiv} >
                <p>LAST NAME</p>
              </div>
              <div className={styles.inputDiv} >
                <input value={formData.lastName} name="lastName" onFocus={() => onFocus(2)}
                  onChange={handleDataFormChange}
                />
              </div>
            </div>

          </div>
          <div className={styles.emailAddressWrapper}>
            <div className={`${styles.emailAddressContainer} ${currFocusField === 3 && styles.focusFieldStyle} `}  >
              <div className={styles.iconDiv} >
                <Icon className={styles.fieldIcon} icon="prime:user" />
              </div>
              <div className={styles.labelDiv} >
                <p>EMAIL ADDRESS</p>
              </div>
              <div className={styles.inputDiv} >
                <input value={formData.email} name="email" onFocus={() => onFocus(3)}
                  onChange={handleDataFormChange}
                />
              </div>
            </div>

          </div>
          <div className={styles.passwordWrapper}>
            <div className={`${styles.passwordContainer} ${currFocusField === 4 && styles.focusFieldStyle} `}  >
              <div className={styles.iconDiv} ><Icon className={styles.fieldIcon} icon="fluent:password-16-regular" /></div>
              <div className={styles.labelDiv} >
                <p>PASSWORD</p>
              </div>
              <div className={styles.inputDiv} >
                <input value={formData.password} name="password" onFocus={() => onFocus(4)}
                  onChange={handleDataFormChange}
                />

              </div>
            </div>

          </div>
          <div className={styles.confirmPasswordWrapper}>
            <div className={`${styles.confirmPassContainer} ${currFocusField === 5 && styles.focusFieldStyle} `} >
              <div className={styles.iconDiv} >
                <Icon className={styles.fieldIcon} icon="fluent:password-24-filled" />
              </div>
              <div className={styles.labelDiv} >
                <p>CONFIRM PASSWORD</p>
              </div>
              <div className={styles.inputDiv} >
                <input
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  onFocus={() => onFocus(5)}
                  onChange={handleDataFormChange}

                />

              </div>
            </div>

          </div>
          <div className={styles.submitBtnWrapper}>

            <button className={styles.submitBtn}>Login</button>
          </div>

        </form>
        <div className={styles.formFooterWrapper} >
          <p>Already have an account ?
            <Link to="/user/login">
              <span className={styles.spanText}>Sign In</span>
            </Link>
          </p>
        </div>
      </div >
    </div >
  )
}

export default SignUpPage
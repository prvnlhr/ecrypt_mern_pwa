import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link, useParams, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import styles from "./styles/resetPage.module.css"
import { resetUserPass } from "../../redux/features/auth/authSlice"
import { validateResetPassForm } from "./helperFunctions/formValidation"
const ResetPassword = () => {

  const navigate = useNavigate();

  const { reset_token } = useParams();
  const authState = useSelector((state => state.auth));
  useEffect(() => {
    if (authState.authResponseMessage === 'Password successfully changed !' && authState.success === true) {
      navigate('/user/login')
    }
  }, [authState.authResponseMessage])
  const dispatch = useDispatch();

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
    newPass: '',
    confirmNewPass: '',
  });
  const handleDataFormChange = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const res = validateResetPassForm({ password: formData.newPass, confirmPassword: formData.confirmNewPass })
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
      dispatch(resetUserPass({
        password: formData.newPass,
        token: reset_token
      }));
    }
  }

  return (
    <div className={styles.formPageWrapper} >
      <div className={styles.formWrapper} >
        <div className={styles.formHeaderWrapper} >
          <div className={styles.formLabelDiv} >
            <p>Set new password</p>
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
        <form className={styles.formTagContainer} onSubmit={handleFormSubmit}>
          <div className={styles.emailAddressWrapper}>
            <div className={`${styles.emailAddressContainer} ${currFocusField === 1 && styles.focusFieldStyle} `}  >
              <div className={styles.iconDiv} >
                <Icon className={styles.fieldIcon} icon="prime:user" />
              </div>
              <div className={styles.labelDiv} >
                <p>NEW PASSWORD</p>
              </div>
              <div className={styles.inputDiv} >
                <input value={formData.newPass} name="newPass" onFocus={() => onFocus(1)}
                  onChange={handleDataFormChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.passwordWrapper}>
            <div className={`${styles.passwordContainer} ${currFocusField === 2 && styles.focusFieldStyle} `}  >
              <div className={styles.iconDiv} ><Icon className={styles.fieldIcon} icon="fluent:password-16-regular" /></div>
              <div className={styles.labelDiv} >
                <p>CONFIRM NEW PASSWORD</p>
              </div>
              <div className={styles.inputDiv} >
                <input value={formData.confirmNewPass} name="confirmNewPass" onFocus={() => onFocus(2)}
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
            {authState.authResponseMessage === 'TokenExpiredError!' ?
              <Link to="/user/forgotPassword">
                <span>Re-verify Password </span>
              </Link>
              :
              <button className={styles.submitBtn} >
                <p>Submit</p>
              </button>
            }
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

export default ResetPassword
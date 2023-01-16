import React from 'react'
import styles from "./styles/favLoginId.module.css"
import { logosArray } from "../../logoComponents/logosData"
const FavLoginId = () => {
    return (
        <div className={styles.loginInWrapper}
        // onClick={() => {
        //     handleLoginIdClicked(loginId);
        // }}
        >
            <div className={styles.logoWrapper} >
                <div className={styles.logoDiv}>
                    {logosArray[47].logo}
                </div>
            </div>
            <div className={styles.titleWrapper} >
                <p className={styles.titleText}>
                    {/* {loginId.title} */}
                    Hp Account
                </p>
            </div>
            <div className={styles.usernameWrapper} >
                <p className={styles.userNameText}>
                    {/* {loginId.username} */}
                    prvnlhrhp.in@gamil.com
                </p>
            </div>
            <div className={styles.favBtnWrapper} ></div>
        </div>
    )
}

export default FavLoginId
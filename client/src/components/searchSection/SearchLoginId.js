import React, { forwardRef } from 'react'
import styles from "./styles/searchLoginId.module.css"
import BookmarksIcon from "../icons/BookmarksIcon"
import BookmarksIconFill from "../icons/BookmarksIconFill"
import { logosArray } from '../logoComponents/logosData'
const SearchLoginId = ({ item, setClickedSearchItem, handleSearchItemClicked }) => {

  return (
    <div id={item._id} className={styles.loginInWrapper}
      onClick={() => handleSearchItemClicked(item)}
    >
      <div className={styles.logoWrapper} >
        <div className={styles.logoDiv}>
          {logosArray[item.logoIndex].logo}
        </div>
      </div>
      <div className={styles.titleWrapper} >
        <p className={styles.titleText}>
          {item.title}
        </p>
      </div>
      <div className={styles.usernameWrapper} >
        <p className={styles.userNameText}>
          {item.username}
        </p>
      </div>
      <div className={styles.favBtnWrapper} >
        <div className={styles.favBtnDiv} >
          {
            item.isFavourite === true ?
              <BookmarksIconFill /> :
              <BookmarksIcon />
          }
        </div>
      </div>
    </div>
  )
}

export default SearchLoginId
import React, { useEffect } from 'react'
import styles from "./styles/documentComponent.module.css"
import { useSelector } from 'react-redux'
import { Icon, InlineIcon } from "@iconify/react";
import BookmarksIconFill from "../icons/BookmarksIconFill"
import BookmarksIcon from "../icons/BookmarksIcon"
const Document = ({ doc, setDocFullScreen, setFullScreenDocData, clickedSearchItem }) => {

  const currDocDataInStore = useSelector((state) =>
    doc._id ? state.docs.docsData.find((l) => l._id === doc._id) : null
  );



  const docClicked = () => {
    setFullScreenDocData(doc);
    setDocFullScreen(true);
  }

  return (
    <div
      id={doc._id}
      className={`${styles.documentComponentWrapper} ${clickedSearchItem?._id === doc._id && styles.documentComponentWrapperFocus} `} >
      <div className={styles.documenComponentContainer}>
        <div className={styles.imageContainer} onClick={docClicked}>
          <img src={doc.imageUrl} />
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.titleDiv} >
            <p className={styles.titleText}>
              {doc.imageName}
            </p>
          </div>
          <div className={styles.favBtnContainer} >
            <div className={styles.favBtnDiv} >

              {doc.isFavourite === true ?
                <BookmarksIconFill /> :
                <BookmarksIcon />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Document
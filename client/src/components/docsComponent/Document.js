import React from 'react'
import styles from "./styles/documentComponent.module.css"
import { Icon, InlineIcon } from "@iconify/react";

const Document = ({ doc, setDocFullScreen }) => {

  const docClicked = () => {
    setDocFullScreen(true);
  }
  return (
    <div className={styles.documentComponentWrapper} >
      <div className={styles.documenComponentContainer}>
        <div className={styles.imageContainer}
          onClick={docClicked}
        ></div>
        <div className={styles.footerContainer}>
          <div className={styles.titleDiv} >
            <p className={styles.titleText}>
              {doc.title}
            </p>
          </div>
          <div className={styles.favBtnDiv} >
            <Icon className={styles.favBtnIcon} icon="ion:bookmark-outline" color="#002A9A" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Document
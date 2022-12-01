import React from 'react'
import styles from "./styles/documentComponent.module.css"

const Document = () => {
  return (
    <div className={styles.documentCompoentWrapper} >
      <div className={styles.documenComponentContainer}>
        <div className={styles.cardHeader}></div>
        <div className={styles.imageDiv} ></div>
        <div className={styles.titleDiv} >
          <p className={styles.titleText}></p>
        </div>
      </div>
    </div>
  )
}

export default Document
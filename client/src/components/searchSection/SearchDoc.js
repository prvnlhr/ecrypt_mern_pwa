import React, { forwardRef } from 'react'
import styles from "./styles/searchDoc.module.css"
import BookmarksIconFill from "../icons/BookmarksIconFill"
import BookmarksIcon from "../icons/BookmarksIcon"

const SearchDoc = ({ item, setClickedSearchItem, handleSearchItemClicked }) => {
    return (
        <div id={item._id} className={styles.documentComponentWrapper} >
            <div className={styles.documenComponentContainer}>
                <div className={styles.imageContainer}
                    onClick={() => handleSearchItemClicked(item)}
                >
                    <img src={item.imageUrl} />
                </div>
                <div className={styles.footerContainer}>
                    <div className={styles.titleDiv} >
                        <p className={styles.titleText}>
                            {item.imageName}
                        </p>
                    </div>
                    <div className={styles.favBtnContainer} >
                        <div className={styles.favBtnDiv} >
                            {item.isFavourite === true ?
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

export default SearchDoc
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles/cardComponent.module.css";
import CardLogo, { getCardType } from "./CardLogo";
import { motion } from "framer-motion";

//icons set
import { Icon, InlineIcon } from "@iconify/react";
import TrashIcon from "../icons/TrashIcon";
import BookmarkPlus from "../icons/BookmarkPlus";
import BookmarkFill from "../icons/BookmarkFill";
import PencilIcon from "../icons/PencilIcon";
import CancelIcon from "../icons/CancelIcon";
import CheckIcon from "../icons/CheckIcon";
import BookmarksIcon from "../icons/BookmarksIcon"
import BookmarksIconFill from "../icons/BookmarksIconFill"

import { logosArray } from "../logoComponents/logosData"

const Card = ({ cardData, handleCardClicked, setFullCardData, clickedSearchItem }) => {


  const currCardDataInStore = useSelector((state) =>
    cardData._id ? state.cards.cardsData.find((l) => l._id === cardData._id) : null
  );

  useEffect(() => {
    setFullCardData(currCardDataInStore)
  }, [currCardDataInStore.isFavourite])


  const [venderLogo, setVenderLogo] = useState();
  useEffect(() => {
    if (cardData.category === 'Bank') {
      setVenderLogo(
        < CardLogo cardNo={cardData.cardNumber} />
      )
    }

  }, [cardData])



  return (

    <div
      id={cardData._id}
      className={`${cardData.category === "Bank" ? styles.cardComponentBank : styles.cardComponent} ${clickedSearchItem?._id === cardData._id && styles.cardComponentFocus} `}
      onClick={() => {
        handleCardClicked(cardData);
      }}
    >
      <div className={styles.logoWrapper} >
        <div className={styles.logoDiv}>
          {cardData.logoIndex && logosArray[cardData.logoIndex].logo}
        </div>
      </div>
      <div className={styles.titleWrapper} >
        <p className={styles.titleText}>
          {cardData.title}
        </p>
      </div>
      <div className={styles.usernameWrapper} >
        <p className={styles.userNameText}>
          {
            cardData.category === "License" ? cardData.licenseNumber : cardData.cardNumber
          }
        </p>
      </div>
      <div className={cardData.category === "Bank" ? styles.bankCardLogoWrapperShow : styles.bankCardLogoWrapperHide} >
        <div className={styles.bankCardVenderLogoDiv}>
          {venderLogo}
        </div>
      </div>
      <div className={styles.favBtnWrapper} >
        {/* <Icon className={styles.favBtnIcon} icon="ion:bookmark-outline" color="#7e8da4" /> */}

        <div className={styles.favBtnIconDiv}>
          {cardData.isFavourite === true ?
            <BookmarksIconFill />
            :
            <BookmarksIcon />

          }
        </div>

      </div>
    </div>
  );
};
export default Card;

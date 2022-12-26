import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, editCard } from "../../redux/actions/cardsAction";
import { cardFavToggle } from "../../redux/actions/cardsAction";
import { CircleSpinner } from "react-spinners-kit";
import styles from "./styles/cardComponent.module.css";
import CardLogo, { getCardType } from "./CardLogo";
import modalStyles from "../modal/modal.module.css";
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

import { logosArray } from "../logoComponents/logosData"

const Card = ({ cardData, handleCardClicked }) => {

  return (
    <div className={cardData.category === "Bank" ? styles.cardComponentBank : styles.cardComponent}
      onClick={() => {
        handleCardClicked(cardData);
      }}
    >
      <div className={styles.logoWrapper} >
        <div className={styles.logoDiv}>
          {logosArray[cardData.logoIndex].logo}
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
        <Icon className={styles.bankCardLogo} icon="logos:visa" />
      </div>
      <div className={styles.favBtnWrapper} >
        {/* <Icon className={styles.favBtnIcon} icon="ion:bookmark-outline" color="#7e8da4" /> */}

        <div className={styles.favBtnIconDiv}>
          <BookmarksIcon />
        </div>

      </div>
    </div>
  );
};
export default Card;

{
  /* <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
      }}
      transition={{ duration: 0.3}}
      key={index}
     
      className={`${styles.cardContainer} ${
        inEditMode ? styles.cardContainerInEditMode : null
      }`}
    >
      <div className={styles.buttonDiv}>
        <div className={styles.editBtnsContainer}>
          {inEditMode === true ? (
            <>
              <div
                className={styles.cancelIconDiv}
                onClick={() => {
                  setEditId(null);
                  setInEditMode(false);
                  setEditButton(true);
                }}
              >
                   <CancelIcon className={styles.cancelIcon}  
                 primaryColor={"#9baece"}
                 secondaryColor={"#2882FF"}
                        />
              </div>
              <div
                className={styles.checkIconDiv}
                onClick={() => {
                  save(card._id);
                  setInEditMode(false);
                  setEditId(null);
                  setEditButton(true);
                }}
              >
                 <CheckIcon className={styles.checkIcon}   
               primaryColor={"#9baece"}
               secondaryColor={"#2882FF"}
                        />
              </div>
            </>
          ) : (
            <>
              {showEditButton && inEditMode === false ? (
                <>
                  <div
                    className={styles.editIconDiv}
                    onClick={() => {
                      setEditButton(null);
                      setEditId(card._id);
                      setInEditMode(true);
                    }}
                  >
                    {isLoading === true &&
                    place === "card" &&
                    itemId === card._id &&
                    process === "edit" ? (
                      <CircleSpinner size={15} color="#1072f1" loading={true} />
                    ) : (
                    
                      <PencilIcon
                      className={styles.pencilIcon}
                      primaryColor={"#9baece"}
                      secondaryColor={"#2882FF"}
                    />
                    
                    )}
                  </div>
                  <div
                    className={styles.deleteIconDiv}
                    onClick={() => {
                      handleDeleteClick();
                    }}
                  >
                    {isLoading === true &&
                    place === "card" &&
                    itemId === card._id &&
                    process === "delete" ? (
                      <CircleSpinner size={15} color="#1072f1" loading={true} />
                    ) : (
                    
                      <TrashIcon
                        className={styles.trashIcon}
                        primaryColor={"#9baece"}
                        secondaryColor={"#2882FF"}
                      />
                    )}
                  </div>
                </>
              ) : null}
            </>
          )}
        </div>

        <button
          className={styles.favBtn}
          onClick={() => {
            handleFavToggle(card._id, card.isFavourite);
          }}
        >
          {(currCardData ? currCardData.isFavourite : card.isFavourite) ? (
            <BookmarkFill
            className={styles.favIcon}
            primaryColor={"#2882FF"}
            secondaryColor={"white"}
          />
          ) : (
            <BookmarkPlus
            className={styles.favIcon}
            primaryColor={"#9baece"}
               secondaryColor={"#2882FF"}
          />
          )}
        </button>
      </div>

      {modalShow === true ? (
        <div className={modalStyles.modalContainer}>
          <div className={modalStyles.dialogDiv}>
            <Icon icon="carbon:warning" className={modalStyles.icon} />

            <p>Are you sure you want to delete this item permanently ?</p>
          </div>
          <div className={modalStyles.modalBtnDiv}>
            <div
              className={modalStyles.modalCancelBtn}
              onClick={() => {
                setModalShow(!modalShow);
              }}
            >
              <p>Cancel</p>
            </div>
            <div
              className={modalStyles.modalConfirmBtn}
              onClick={() => {
                confirmDelete(card._id);
              }}
            >
              {isLoading === true &&
              place === "card" &&
              itemId === card._id &&
              process === "delete" ? (
                <CircleSpinner size={12} color="white" loading={true} />
              ) : (
                <p>Delete</p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.cardLogo}>
        <CardLogo className={styles.logo} cardNo={card.cardNo} />
      </div>

      <div className={styles.bankName}>
        {inEditMode && card._id === editId ? (
          <input
            className={styles.editInput}
            value={cardData.bank}
            onChange={(e) =>
              setCardData({
                ...cardData,
                bank: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={styles.cardBankText}>{card.bank}</p>
        )}
      </div>

      <div className={styles.cardNo}>
        {inEditMode && card._id === editId ? (
          <input
            className={styles.editInput}
            value={cardData.cardNo}
            onChange={(e) =>
              setCardData({
                ...cardData,
                cardNo: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={styles.cardNoText}>{formattedCardNo}</p>
        )}
      </div>
      <div className={styles.cvv}>
        <p className={styles.cvvLabel}>CVV </p>

        {inEditMode && card._id === editId ? (
          <input
            className={styles.expiryInput}
            value={cardData.cvv}
            onChange={(e) =>
              setCardData({
                ...cardData,
                cvv: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={styles.cvvText}>{card.cvv}</p>
        )}
      </div>
      <div className={styles.cardUser}>
        {inEditMode && card._id === editId ? (
          <input
            className={styles.editInput}
            value={cardData.user}
            onChange={(e) =>
              setCardData({
                ...cardData,
                user: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={styles.cardUserText}>{card.user}</p>
        )}
      </div>
      <div className={styles.cardExpiry}>
        <p className={styles.expiryLabel}>VALID UPTO</p>

        {inEditMode && card._id === editId ? (
          <input
            className={styles.expiryInput}
            value={cardData.expiry}
            onChange={(e) =>
              setCardData({
                ...cardData,
                expiry: e.target.value,
              })
            }
          ></input>
        ) : (
          <p className={styles.expiryText}>{card.expiry}</p>
        )}
      </div>

      <div className={styles.overlayDiv}>
        <div className={styles.square}></div>
        <div className={styles.ring}>
          <div></div>
        </div>

        <h1 className={styles.overlayFont}>{cardType}</h1>
      </div>
    </motion.div>
  ); */
}

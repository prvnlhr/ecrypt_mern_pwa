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

const Card = ({ card, setEditButton, showEditButton, index }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const [editId, setEditId] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [oldCardData, setOldCardData] = useState("");
  const [cardData, setCardData] = useState({
    user: "",
    bank: "",
    cardNo: "",
    expiry: "",
    cvv: "",
    pin: "",
  });
  const [currCardData, setCurrCardData] = useState();
  // const process = useSelector((state) => state.process);
  const loadState = useSelector((state) => state.loading);
  const { itemId, place, isLoading, process } = loadState;
  const searchResultArray = useSelector(
    (state) => state.searchResults.searchResults
  );

  // determining the card type___________
  const cardNumber = card.cardNo;
  const cNo = cardNumber.toString();
  const cardType = getCardType(cNo);
  // console.log("cardType is ", cardType);
  //________________________________________

  const formattedCardNo = cNo.toString().replace(/\d{4}(?=.)/g, "$& ");
  // console.log(formattedCardNo);

  const cardDataToEdit = useSelector((state) =>
    editId ? state.cards.cards.find((c) => c._id === editId) : null
  );

  useEffect(() => {
    if (cardDataToEdit) setCardData(cardDataToEdit);
  }, [cardDataToEdit]);

  const userId = useSelector((state) => state.user.user._id);

  useEffect(() => {
    setCurrCardData(card);
    setOldCardData(card);
  }, [card]);

  const handleFavToggle = (cardId) => {
    var favValue = currCardData.isFavourite;
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }
    setCurrCardData({ ...currCardData, isFavourite: isFav });

    dispatch(cardFavToggle(cardId, isFav));
  };
  const save = (id) => {
    dispatch(
      editCard(id, cardData, userId, oldCardData, searchResultArray.length)
    );
  };

  const confirmDelete = (cardId) => {
    dispatch(deleteCard(card, cardId, userId));
    setModalShow(!modalShow);
  };
  const handleDeleteClick = () => {
    setModalShow(!modalShow);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
      }}
      transition={{ duration: 0.3 }}
      key={index}
      className={styles.cardComponent}
    >
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
      <div className={styles.logoWrapper}>
        <div className={styles.logoDiv}>
          <CardLogo className={styles.logo} cardNo={card.cardNo} />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttonContainer}>
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
                  <CancelIcon
                    className={styles.cancelIcon}
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
                  <CheckIcon
                    className={styles.checkIcon}
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
                        <CircleSpinner
                          size={15}
                          color="#1072f1"
                          loading={true}
                        />
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
                        <CircleSpinner
                          size={15}
                          color="#1072f1"
                          loading={true}
                        />
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
      </div>
      <div className={styles.bankNameWrapper}>
        {inEditMode && card._id === editId ? (
          <input
            className={styles.bankInputField}
            value={cardData.bank}
            onChange={(e) =>
              setCardData({
                ...cardData,
                bank: e.target.value,
              })
            }
          />
        ) : (
          <div className={styles.bankTextDiv}>
            <p className={styles.bankNameText}>{card.bank}</p>
          </div>
        )}
      </div>
      <div className={styles.chipWrapper}>
        <div className={styles.chipDiv}>
          <svg
            viewBox="0 0 34 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 25.3486H28M6 25.3486C3.23858 25.3486 1 23.1101 1 20.3486M6 25.3486H8.97004M1 20.3486V6.34863M1 20.3486V17.2144M33 20.8915V6.8915M33 20.8915C33 23.6529 30.7614 25.3486 28 25.3486M33 20.8915V17.2144M28 25.3486H24.7754M28 1.34863H6M28 1.34863C30.7614 1.34863 33 4.13007 33 6.8915M28 1.34863H24.3182M33 6.8915V11.5718M6 1.34863C3.23858 1.34863 1 3.58721 1 6.34863M6 1.34863H8.06017M1 6.34863V11.7043M1 11.7043H12.0471M1 11.7043V17.2144M8.06017 1.34863L16.6276 7.92055V9.70427C16.6276 10.8088 15.7321 11.7043 14.6276 11.7043H12.0471M8.06017 1.34863H24.3182M16.6276 7.85449L24.3182 1.34863M12.0471 11.5718V11.7043M12.0471 17.2144H1M12.0471 17.2144H16.7603M12.0471 17.2144V11.7043M21.8718 17.2144H33M21.8718 17.2144V13.5718C21.8718 12.4672 22.7673 11.5718 23.8718 11.5718H33M21.8718 17.2144H16.7603M33 17.2144V11.5718M16.7603 17.2144V20.0688M16.7603 20.0688L8.97004 25.3486M16.7603 20.0688L24.7754 25.3486M8.97004 25.3486H24.7754"
              stroke={theme === "dark" ? "white" : "#9baece"}
              stroke-width="1.5"
            />
          </svg>
        </div>
      </div>
      <div className={styles.cardNoWrapper}>
        {inEditMode && card._id === editId ? (
          <input
            className={styles.cardNoInputField}
            value={cardData.cardNo}
            onChange={(e) =>
              setCardData({
                ...cardData,
                cardNo: e.target.value,
              })
            }
          />
        ) : (
          <div className={styles.cardNoTextDiv}>
            <p className={styles.cardNumberText}>{formattedCardNo}</p>
          </div>
        )}
      </div>
      <div className={styles.cardHolderWrapper}>
        {inEditMode && card._id === editId ? (
          <input
            className={styles.cardHolderInputField}
            value={cardData.user}
            onChange={(e) =>
              setCardData({
                ...cardData,
                user: e.target.value,
              })
            }
          />
        ) : (
          <div className={styles.cardholderTextDiv}>
            <p className={styles.cardholderText}>{card.user}</p>
          </div>
        )}
      </div>
      <div className={styles.cvvWrapper}>
        <div className={styles.containerTop}>
          <p className={styles.labelText}>CVV</p>
        </div>
        <div className={styles.containerBottom}>
          {inEditMode && card._id === editId ? (
            <input
              className={styles.cardCvvInputField}
              value={cardData.cvv}
              onChange={(e) =>
                setCardData({
                  ...cardData,
                  cvv: e.target.value,
                })
              }
            />
          ) : (
            <div className={styles.cvvTextDiv}>
              <p className={styles.cvvText}>{card.cvv}</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.cardExpiryWrapper}>
        <div className={styles.containerTop}>
          <p className={styles.labelText}>EXPIRY</p>
        </div>
        <div className={styles.containerBottom}>
          {inEditMode && card._id === editId ? (
            <input
              className={styles.cardExpiryInputField}
              value={cardData.expiry}
              onChange={(e) =>
                setCardData({
                  ...cardData,
                  expiry: e.target.value,
                })
              }
            />
          ) : (
            <div className={styles.expiryTextDiv}>
              <p className={styles.expiryText}>{card.expiry}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.overlayDiv}></div>
    </motion.div>
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

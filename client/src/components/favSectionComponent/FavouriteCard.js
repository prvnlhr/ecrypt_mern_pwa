import React from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useState, useEffect } from "react";

import { cardFavToggle } from "../../redux/actions/cardsAction";
import CardLogo, { getCardType } from "../cardComponent/CardLogo";
import styles from "../cardComponent/styles/cardComponent.module.css";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { motion } from "framer-motion";
import BookmarkPlus from "../icons/BookmarkPlus";
import BookmarkFill from "../icons/BookmarkFill";

const FavouriteCard = ({ favItem }) => {
  const dispatch = useDispatch();
  const [currCardData, setCurrCardData] = useState();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    setCurrCardData(favItem);
  }, [favItem]);
  const cardNumber = favItem.cardNo;
  const cNo = cardNumber.toString();
  const cardType = getCardType(cNo);

  const formattedCardNo = cNo.toString().replace(/\d{4}(?=.)/g, "$& ");
  console.log(formattedCardNo);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
      }}
      transition={{ duration: 0.3 }}
   
      className={styles.cardComponent}
    >
      <div className={styles.logoWrapper}>
        <div className={styles.logoDiv}>
          <CardLogo className={styles.logo} cardNo={favItem.cardNo} />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.favBtn}
            onClick={() => {
              handleFavToggle(favItem._id, favItem.isFavourite);
            }}
          >
            {(currCardData ? currCardData.isFavourite : favItem.isFavourite) ? (
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
        <div className={styles.bankTextDiv}>
          <p className={styles.bankNameText}>{favItem.bank}</p>
        </div>
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
        <div className={styles.cardNoTextDiv}>
          <p className={styles.cardNumberText}>{formattedCardNo}</p>
        </div>
      </div>
      <div className={styles.cardHolderWrapper}>
        <div className={styles.cardholderTextDiv}>
          <p className={styles.cardholderText}>{favItem.user}</p>
        </div>
      </div>
      <div className={styles.cvvWrapper}>
        <div className={styles.containerTop}>
          <p className={styles.labelText}>CVV</p>
        </div>
        <div className={styles.containerBottom}>
          <div className={styles.cvvTextDiv}>
            <p className={styles.cvvText}>{favItem.cvv}</p>
          </div>
        </div>
      </div>
      <div className={styles.cardExpiryWrapper}>
        <div className={styles.containerTop}>
          <p className={styles.labelText}>EXPIRY</p>
        </div>
        <div className={styles.containerBottom}>
          <div className={styles.expiryTextDiv}>
            <p className={styles.expiryText}>{favItem.expiry}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FavouriteCard;

{
  /* <motion.div
initial={{ opacity: 0 }}
animate={{
  opacity: [0, 1],
}}
transition={{ duration: 0.3, delay: 0.2 }}
className={`${styles.cardContainer} ${
  cardType === "MASTER"
    ? styles.cardMaster
    : cardType === "VISA"
    ? styles.cardVisa
    : cardType === "RUPAY"
    ? styles.cardRupay
    : cardType === "MAESTRO"
    ? styles.cardMaestro
    : cardType === "AMEX"
    ? styles.cardAmex
    : cardType === "JCB"
    ? styles.cardJcb
    : cardType === "HIPERCARD"
    ? styles.cardHiper
    : cardType === "UNIONPAY"
    ? styles.cardUnion
    : cardType === "DISCOVERY"
    ? styles.cardDiscovery
    : cardType === "DINERS"
    ? styles.cardDiners
    : null
}`}
>
<div className={styles.cardLogo}>
  <CardLogo className={styles.logo} cardNo={favItem.cardNo} />
</div>
<div className={styles.bankName}>
  <p className={styles.cardBankText}>{favItem.bank}</p>
</div>

<div className={styles.cardNo}>
  <p className={styles.cardNoText}>{formattedCardNo}</p>
</div>

<div className={styles.cvv}>
  <p className={styles.cvvLabel}>CVV </p>

  <p className={styles.cvvText}>{favItem.cvv}</p>
</div>
<div className={styles.cardUser}>
  <p className={styles.cardUserText}>{favItem.user}</p>
</div>
<div className={styles.cardExpiry}>
  <p className={styles.expiryLabel}>VALID UPTO</p>

  <p className={styles.expiryText}>{favItem.expiry}</p>
</div>

<div className={styles.buttonDiv}>
  <button
    className={styles.favBtn}
    onClick={() => {
      handleFavToggle(favItem._id, favItem.isFavourite);
    }}
  >
    {(currCardData ? currCardData.isFavourite : favItem.isFavourite) ? (
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

<div className={styles.overlayDiv}>
  <div className={styles.ring}>
    <div></div>
  </div>
  <div className={styles.square}></div>

  <h1 className={styles.overlayFont}>{cardType}</h1>
</div>
</motion.div> */
}

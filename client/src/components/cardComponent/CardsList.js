import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
// import CardForm from "./CardForm";
import { FiPlusCircle } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import CardSkeleton from "../skelotons/CardSkeleton";

import styles from "./styles/cardsList.module.css";
import noContentStyles from "../docsComponent/styles/noContentMessage.module.css";
import btnStyles from "../add_button/buttons.module.css";
import { CircleSpinner } from "react-spinners-kit";
import FullCardComponent from "./fullCardComponents/FullCardComponent";
const CardForm = lazy(() => import("./CardForm"));

const CardsList = ({ cards, currentId, setCurrentId, setHeading }) => {

  const [bankCardData, setBankCardData] = useState({
    title: "",
    category: "",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })
  const [identityCardData, setIdentityCardData] = useState({
    title: "",
    category: "",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    dob: "",
  })
  const [licenseCardData, setLicenseCardData] = useState({
    title: "",
    category: "",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    dov: "",
  })



  const cardsData = [

    {
      category: "Bank",
      title: "State Bank Card",
      cardHolder: "Praveen Lohar",
      cardNumber: 52455626554,
      expiry: "andrew@122",
      cvv: 123
    },
    {
      category: "Identity",
      title: "Aadhar card",
      cardHolder: "Praveen Lohar",
      cardNumber: "504186331908",
      expiry: "",
      dob: "23/01/1996",
    }
    , {
      category: "License",
      title: "Driving License",
      cardHolder: "Praveen Lohar",
      licenseNumber: "52DL-855C",
      expiry: "18/05/2024",
      dov: "23/01/1996",
    }

  ]
  const loadState = useSelector((state) => state.loading);
  const [showContentCard, setShowContentCard] = useState(false);

  const [fullContentCardCategory, setFullContentCardCatergory] = useState("");

  const handleFullContentBackBtnClicked = () => {
    setShowContentCard(false);
  }

  const handleCardClicked = (cardData) => {
    setShowContentCard(true);
    console.log(cardData)
    switch (cardData.category) {
      case "Identity":
        setFullContentCardCatergory("Identity")
        setIdentityCardData({
          title: cardData.title,
          category: cardData.category,
          cardHolder: cardData.cardHolder,
          cardNumber: cardData.cardNumber,
          issueDate: cardData.issueDate,
          dob: cardData.dob,
        })
        break;

      case "License":
        setFullContentCardCatergory("License")
        setLicenseCardData({
          title: cardData.title,
          category: cardData.category,
          cardHolder: cardData.cardHolder,
          licenseNumber: cardData.licenseNumber,
          expiry: cardData.expiry,
          dob: cardData.dob,
        })
        break;

      case "Bank":
        setFullContentCardCatergory("Bank")
        setBankCardData({
          title: cardData.title,
          category: cardData.category,
          cardHolder: cardData.cardHolder,
          cardNumber: cardData.cardNumber,
          expiry: cardData.expiry,
          cvv: cardData.cvv,
        })
        break;

      default:
        break;
    }

  }

  return (
    <div className={`${styles.cardList} `}>
      <div className={showContentCard ? styles.contentContainerClose : styles.contentContainer}>
        {cardsData.map((card, index) => (
          <Card
            key={index}
            index={index}
            cardData={card}
            handleCardClicked={handleCardClicked}
          />
        ))}

      </div>
      {showContentCard ?
        <FullCardComponent
          showContentCard={showContentCard}
          handleFullContentBackBtnClicked={handleFullContentBackBtnClicked}
          fullContentCardData={
            fullContentCardCategory === "Bank" ? bankCardData : fullContentCardCategory === "Identity" ? identityCardData : fullContentCardCategory === "License" ? licenseCardData : undefined
          }

        />
        : null}

    </div>
  );
};

export default CardsList;

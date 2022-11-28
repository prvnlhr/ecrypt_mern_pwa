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
import FullCardComponent from "./FullCardComponent";
const CardForm = lazy(() => import("./CardForm"));

const CardsList = ({ cards, currentId, setCurrentId, setHeading }) => {
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
      title: "Aadhar card",
      category: "Identity",
      cardHolder: "Praveen Lohar",
      cardNumber: "504186331908",
      expiry: "",
      dob: "23/01/1996",
    }
    , {
      title: "Driving License",
      category: "License",
      cardHolder: "Praveen Lohar",
      cardNumber: "52DL-855C",
      expiry: "18/05/2024",
      dov: "23/01/1996",
    }

  ]
  const loadState = useSelector((state) => state.loading);
  const [showContentCard, setShowContentCard] = useState(false);

  const handleFullContentBackBtnClicked = () => {
    setShowContentCard(false);
  }

  const handleCardClicked = (cardData) => {
    setShowContentCard(true);
    // if (cardData != undefined) {
    //   setFullContentCardData({
    //     app: cardData.app,
    //     category: cardData.category,
    //     title: cardData.title,
    //     username: cardData.username,
    //     password: cardData.password,
    //   })
    // }
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
      <FullCardComponent
        showContentCard={showContentCard}
        handleFullContentBackBtnClicked={handleFullContentBackBtnClicked}
      />

    </div>
  );
};

export default CardsList;

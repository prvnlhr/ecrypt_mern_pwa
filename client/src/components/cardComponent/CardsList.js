import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from 'react-redux';

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
import AddBtn from "../buttons/AddBtn";
import CardInputForm from "./inputForms/CardInputForm";

const CardsList = ({ cards, currentId, setCurrentId, setHeading, setLogoComponentShow }) => {
  const cardsArray = useSelector((state => state.cards.cardsData));




  const [bankCardData, setBankCardData] = useState({
    title: "",
    category: "Bank",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    logoIndex: "",
    isFavourite: ""
  })

  const [identityCardData, setIdentityCardData] = useState({
    title: "",
    category: "Identity",
    cardHolder: "",
    cardNumber: "",
    issueDate: "",
    dob: "",
    logoIndex: "",
    isFavourite: ""
  })
  const [licenseCardData, setLicenseCardData] = useState({
    title: "",
    category: ":License",
    cardHolder: "",
    licenseNumber: "",
    expiry: "",
    dob: "",
    logoIndex: "",
    isFavourite: ""
  })

  const [showInputForm, setShowInputForm] = useState(false);
  const [editMode, setEditMode] = useState(false);


  const formToggle = () => {
    setShowInputForm(!showInputForm);
  };

  const cardsData = [
    {
      category: "Bank",
      title: "State Bank Card",
      cardHolder: "Praveen Lohar",
      cardNumber: 5242720011394202,
      expiry: "andrew@122",
      cvv: 123,
      logoIndex: 72,
    },
    {
      category: "Identity",
      title: "Aadhar card",
      cardHolder: "Praveen Lohar",
      cardNumber: "504186331908",
      expiry: "",
      dob: "23/01/1996",
      logoIndex: 98,

    }
    , {
      category: "License",
      title: "Driving License",
      cardHolder: "Praveen Lohar",
      licenseNumber: "52DL-855C",
      expiry: "18/05/2024",
      dov: "23/01/1996",
      logoIndex: 0,
    }, {
      category: "Bank",
      title: "Punjab National Bank card",
      cardHolder: "Elean Salvatore",
      cardNumber: 6250941006528599,
      expiry: "alenaSAL@122",
      cvv: 454,
      logoIndex: 72,
    },

  ]
  const [showContentCard, setShowContentCard] = useState(false);

  const [fullContentCardCategory, setFullContentCardCatergory] = useState("BankCard");

  const handleFullContentBackBtnClicked = () => {
    setShowContentCard(false);
    setEditMode(false);
  }

  const handleCardClicked = (cardData) => {
    switch (cardData.category) {
      case "Identity":
        setFullContentCardCatergory("Identity")
        setIdentityCardData({
          ...identityCardData,
          _id: cardData._id,
          title: cardData.title,
          category: cardData.category,
          cardHolder: cardData.cardHolder,
          cardNumber: cardData.cardNumber,
          issueDate: cardData.issueDate,
          dob: cardData.dob,
          logoIndex: cardData.logoIndex,
          isFavourite: cardData.isFavourite
        })
        break;

      case "License":
        setFullContentCardCatergory("License")
        setLicenseCardData({
          ...licenseCardData,
          _id: cardData._id,
          title: cardData.title,
          category: cardData.category,
          cardHolder: cardData.cardHolder,
          licenseNumber: cardData.licenseNumber,
          expiry: cardData.expiry,
          dob: cardData.dob,
          logoIndex: cardData.logoIndex,
          isFavourite: cardData.isFavourite
        })
        break;

      case "Bank":
        setFullContentCardCatergory("Bank")
        setBankCardData({
          ...bankCardData,
          _id: cardData._id,
          title: cardData.title,
          category: cardData.category,
          cardHolder: cardData.cardHolder,
          cardNumber: cardData.cardNumber,
          expiry: cardData.expiry,
          cvv: cardData.cvv,
          logoIndex: cardData.logoIndex,
          isFavourite: cardData.isFavourite
        })
        break;

      default:
        break;
    }
    setShowContentCard(true);

  }

  return (
    <div className={`${styles.cardList} `}>
      {
        (!showInputForm && !showContentCard) &&
        < AddBtn formToggle={formToggle} />
      }
      <div className={(showContentCard || showInputForm) ? styles.contentContainerClose : styles.contentContainer}>
        {cardsArray.map((card, index) => (
          <Card
            key={index}
            index={index}
            cardData={card}
            handleCardClicked={handleCardClicked}
            setFullCardData={card.category === 'Bank' ?
              setBankCardData : card.category === 'Identity' ?
                setIdentityCardData : card.category === 'License' &&
                setLicenseCardData
            }
          />
        ))}

      </div>
      {showContentCard ?
        <FullCardComponent
          setLogoComponentShow={setLogoComponentShow}
          showContentCard={showContentCard}
          setShowContentCard={setShowContentCard}
          handleFullContentBackBtnClicked={handleFullContentBackBtnClicked}
          fullContentCardData={
            fullContentCardCategory === "Bank" ? bankCardData : fullContentCardCategory === "Identity" ? identityCardData : fullContentCardCategory === "License" ? licenseCardData : undefined
          }

          setFullContentCardData={
            fullContentCardCategory === "Bank" ? setBankCardData : fullContentCardCategory === "Identity" ? setIdentityCardData : fullContentCardCategory === "License" ? setLicenseCardData : undefined
          }
          setEditMode={setEditMode}
          editMode={editMode}
        />
        : null}
      {showInputForm &&
        <CardInputForm
          formToggle={formToggle}
          showInputForm={showInputForm}
          setShowInputForm={showInputForm}
        />
      }
    </div>
  );
};

export default CardsList;

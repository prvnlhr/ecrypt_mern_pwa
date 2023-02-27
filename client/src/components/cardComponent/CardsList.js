import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Card from "./Card";

import styles from "./styles/cardsList.module.css";

import FullCardComponent from "./fullCardComponents/FullCardComponent";
import AddBtn from "../buttons/AddBtn";
import CardInputForm from "./inputForms/CardInputForm";
import DeleteModal from "../modal/DeleteModal";
import { generateActivityData } from "../utils/ActivityDataChangeFuction"
import { deleteCardData } from "../../redux/features/cards/cardsSlice"
import ListSkeleton from "../skelotons/ListSkeleton"
const CardsList = ({ setLogoComponentShow,
  setClickedSearchItem,
  clickedSearchItem,

}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (clickedSearchItem) {
      const element = document.getElementById(clickedSearchItem._id);
      // console.log(element, clickedSearchItem._id);
      //> block : Defines vertical alignment
      //> inline: Defines horizontal alignment
      element?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [clickedSearchItem])

  const cardState = useSelector((state => state.cards));
  const { isLoading, action, success } = cardState;
  const [deleteMode, setDeleteMode] = useState(false);

  const userId = useSelector((state) => state.user._id);

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

  // ____________________________________________
  // SCROLLING BUTTON HIDE__
  const node = useRef();
  var timeOut = null;
  const [isScrolling, setIsScrolling] = useState(false);


  useEffect(() => {
    if (node.current != null) {
      node.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (node.current != null) {
        node.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = (e) => {
    setIsScrolling(true);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setIsScrolling(false);
    }, 900);
  };
  //________________________________________________

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



  //> Confirm card delete________________
  const confirmDeleteBtnClicked = async () => {

    setDeleteMode(false);

    let cardDataToDelete = {};

    switch (fullContentCardCategory) {

      case 'Bank': {
        Object.assign(cardDataToDelete, bankCardData);
      }
        break;

      case 'Identity': {
        Object.assign(cardDataToDelete, identityCardData);
      }
        break;

      case 'License': {
        Object.assign(cardDataToDelete, licenseCardData);
      }
        break;

      default:
        break;
    }

    const activity_data = await generateActivityData(2, 'Card', cardDataToDelete, '')
    await dispatch(deleteCardData({
      card_id: cardDataToDelete._id,
      user_id: userId,
      cardData: cardDataToDelete,
      activityData: activity_data
    })).then(res => {
      if (res.type === 'cards/delete/fulfilled') {
        setShowContentCard(false);
      }
    })
  }

  return (
    <div className={`${styles.cardList} `} >

      <DeleteModal
        setDeleteMode={setDeleteMode}
        deleteMode={deleteMode}
        confirmDeleteBtnClicked={confirmDeleteBtnClicked}
        modalStyles={styles}
      />

      {
        (!showInputForm && !showContentCard) &&
        < AddBtn formToggle={formToggle} isScrolling={isScrolling} />
      }
      <div ref={node} className={(showContentCard || showInputForm) ? styles.contentContainerClose : styles.contentContainer} >
        {

          isLoading === true && action === 'fetch' ?
            <>
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
            </> :

            cardsArray.map((card, index) => (
              <Card
                key={index}
                index={index}
                cardData={card}
                clickedSearchItem={clickedSearchItem}
                handleCardClicked={handleCardClicked}
                setFullCardData={card.category === 'Bank' ?
                  setBankCardData : card.category === 'Identity' ?
                    setIdentityCardData : card.category === 'License' &&
                    setLicenseCardData
                }
              />
            ))
        }

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
          confirmDeleteBtnClicked={confirmDeleteBtnClicked}
          setDeleteMode={setDeleteMode}
          deleteMode={deleteMode}
        />
        : null}
      {showInputForm &&
        <CardInputForm
          formToggle={formToggle}
          showInputForm={showInputForm}
          setShowInputForm={setShowInputForm}
        />
      }
    </div>
  );
};

export default CardsList;

// import UserDatabase from "../models/userData.js";
const { UserDatabase, CardsData, BankCards } = require("../models/userData");
const { MongoClient, ObjectID } = require('mongodb');
const { response } = require("express");
const newObjectId = new ObjectID();

const cardsController = {
  getCards: async (req, res) => {
    try {
      const cards = await UserDatabase.findOne({ _id: req.query.user_id });
      res.status(200).send(cards.cardsData);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  addCard: async (req, res) => {
    // console.log('at add card data ::', req.body)
    let card;
    const CATEGORY = req.body.newCardData.category;
    // console.log(CATEGORY)

    switch (CATEGORY) {
      case 'Bank':
        card = {
          title: req.body.newCardData.title,
          category: req.body.newCardData.category,
          cardHolder: req.body.newCardData.cardHolder,
          cardNumber: req.body.newCardData.cardNumber,
          expiry: req.body.newCardData.expiry,
          cvv: req.body.newCardData.cvv,
          logoIndex: req.body.newCardData.logoIndex,
          isFavourite: req.body.newCardData.isFavourite,
        }
        break;
      case 'Identity':
        card = {
          title: req.body.newCardData.title,
          category: req.body.newCardData.category,
          cardHolder: req.body.newCardData.cardHolder,
          cardNumber: req.body.newCardData.cardNumber,
          issueDate: req.body.newCardData.issueDate,
          dob: req.body.newCardData.dob,
          logoIndex: req.body.newCardData.logoIndex,
          isFavourite: req.body.newCardData.isFavourite,
        }
        break;

      case 'License':
        card = {
          title: req.body.newCardData.title,
          category: req.body.newCardData.category,
          cardHolder: req.body.newCardData.cardHolder,
          licenseNumber: req.body.newCardData.licenseNumber,
          expiry: req.body.newCardData.expiry,
          dob: req.body.newCardData.dob,
          logoIndex: req.body.newCardData.logoIndex,
          isFavourite: req.body.newCardData.isFavourite,
        }
        break;
      default:
        break;
    }

    // console.log('card', card);
    try {

      // const rs = await UserDatabase.findOneAndUpdate(
      //   { _id: req.body.user_id },
      //   {
      //     $push:
      //     {
      //       "cardsMixedArray": { $each: [card] },
      //     },
      //   },
      //   { returnOriginal: false }
      // );
      // console.log(rs);
      let response;
      switch (CATEGORY) {
        case 'Bank':
          response = await UserDatabase.findOneAndUpdate(
            { _id: req.body.user_id },
            {
              $push:
              {
                "cardsData.bankCardsArray": { $each: [card] },
              },
            },
            { returnOriginal: false }
          );
          break;

        case 'Identity':
          response = await UserDatabase.findOneAndUpdate(
            { _id: req.body.user_id },
            {
              $push:
              {
                "cardsData.identityCardsArray": { $each: [card] },
              },
            },
            { returnOriginal: false }
          );


          break;

        case 'License':
          response = await UserDatabase.findOneAndUpdate(
            { _id: req.body.user_id },
            {
              $push:
              {
                "cardsData.licenseCardsArray": { $each: [card] },
              },
            },
            { returnOriginal: false }
          );

          break;
        default:
          break;
      }
      const { cardsData } = response;
      // console.log(cardsData)
      let resData;
      resData = (CATEGORY === 'Bank') ? cardsData.bankCardsArray : (CATEGORY === 'Identity') ? cardsData.identityCardsArray : cardsData.licenseCardsArray;
      // console.log(resData)
      res.status(200).send(resData[resData.length - 1]);
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message });
    }
  },


  deleteCard: async (req, res) => {
    const cardId = req.params.id;
    const userId = req.body.user_id;
    const CATEGORY = req.body.cardData.category;
    // console.log(cardId, userId, CATEGORY)
    try {
      // console.log(CATEGORY)
      let response;


      switch (CATEGORY) {
        case 'Bank':
          // console.log(req.body.cardData)
          response = await UserDatabase.findOneAndUpdate(
            { _id: userId },
            {
              $pull: {
                'cardsData.bankCardsArray': {
                  _id: cardId,
                },
              },
            },
            { returnOriginal: false }
          );
          break;

        case 'Identity':
          response = await UserDatabase.findOneAndUpdate(
            { _id: userId },
            {
              $pull: {
                'cardsData.identityCardsArray': {
                  _id: cardId,
                },
              },
            },
            { returnOriginal: false }
          );
          break;

        case 'License':
          response = await UserDatabase.findOneAndUpdate(
            { _id: userId },
            {
              $pull: {
                'cardsData.licenseCardsArray': {
                  _id: cardId,
                },
              },
            },
            { returnOriginal: false }
          );
          break;

        default:
          break;
      }
      res.status(200).send(response);
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message });
    }
  },

  editCard: async (req, res) => {
    const id = req.params.id;
    const CATEGORY = req.body.category;
    console.log(CATEGORY);

    try {
      let response;

      switch (CATEGORY) {

        case "Bank":
          response = await UserDatabase.findOneAndUpdate(
            { "cardsData.bankCardsArray._id": id },
            {
              $set: {
                "cardsData.bankCardsArray.$.title": req.body.title,
                "cardsData.bankCardsArray.$.category": req.body.category,
                "cardsData.bankCardsArray.$.cardHolder": req.body.cardHolder,
                "cardsData.bankCardsArray.$.cardNumber": req.body.cardNumber,
                "cardsData.bankCardsArray.$.expiry": req.body.expiry,
                "cardsData.bankCardsArray.$.cvv": req.body.cvv,
                "cardsData.bankCardsArray.$.logoIndex": req.body.logoIndex,
                "cardsData.bankCardsArray.$.isFavourite": req.body.isFavourite
              },
            },
            { returnOriginal: false }
          );
          break;

        case "Identity":
          response = await UserDatabase.findOneAndUpdate(
            { "cardsData.identityCardsArray._id": id },
            {
              $set: {
                "cardsData.identityCardsArray.$.title": req.body.title,
                "cardsData.identityCardsArray.$.category": req.body.category,
                "cardsData.identityCardsArray.$.cardHolder": req.body.cardHolder,
                "cardsData.identityCardsArray.$.cardNumber": req.body.cardNumber,
                "cardsData.identityCardsArray.$.issueDate": req.body.issueDate,
                "cardsData.identityCardsArray.$.dob": req.body.dob,
                "cardsData.identityCardsArray.$.logoIndex": req.body.logoIndex,
                "cardsData.identityCardsArray.$.isFavourite": req.body.isFavourite
              },
            },
            { returnOriginal: false }
          );
          break;

        case "License":
          response = await UserDatabase.findOneAndUpdate(
            { "cardsData.licenseCardsArray._id": id },
            {
              $set: {
                "cardsData.licenseCardsArray.$.title": req.body.title,
                "cardsData.licenseCardsArray.$.category": req.body.category,
                "cardsData.licenseCardsArray.$.cardHolder": req.body.cardHolder,
                "cardsData.licenseCardsArray.$.licenseNumber": req.body.licenseNumber,
                "cardsData.licenseCardsArray.$.expiry": req.body.expiry,
                "cardsData.licenseCardsArray.$.dob": req.body.dob,
                "cardsData.licenseCardsArray.$.logoIndex": req.body.logoIndex,
                "cardsData.licenseCardsArray.$.isFavourite": req.body.isFavourite
              },
            },
            { returnOriginal: false }
          );
          break;

        default:
          break;
      }
      // console.log(response)
      res.status(201).json(response);
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message });
    }
  },

  toggleFav: async (req, res) => {
    console.log(req.body)
    const id = req.params.id;
    const isFav = req.body.isFav;
    const CATEGORY = req.body.category
    console.log(CATEGORY, isFav, id)
    try {

      // const response = await UserDatabase.findOneAndUpdate(
      //   { "cardsData.bankCardsArray._id": id },
      //   {
      //     $set: {

      //       "cardsData.bankCardsArray.$.isFavourite": isFav
      //     },
      //   },
      //   { returnOriginal: false }
      // );
      // console.log(response.cardsData.bankCardsArray);
      let response;

      switch (CATEGORY) {
        case "Bank":
          response = await UserDatabase.findOneAndUpdate(
            { "cardsData.bankCardsArray._id": id },
            {
              $set: {

                "cardsData.bankCardsArray.$.isFavourite": isFav
              },
            },
            { returnOriginal: false }
          );
          break;

        case "Identity":
          response = await UserDatabase.findOneAndUpdate(
            { "cardsData.identityCardsArray._id": id },
            {
              $set: {

                "cardsData.identityCardsArray.$.isFavourite": isFav
              },
            },
            { returnOriginal: false }
          );
          break;

        case "License":
          response = await UserDatabase.findOneAndUpdate(
            { "cardsData.licenseCardsArray._id": id },
            {
              $set: {
                "cardsData.licenseCardsArray.$.isFavourite": isFav
              },
            },
            { returnOriginal: false }
          );
          break;
        default:
          break;
      }

      // console.log(CATEGORY === 'Bank' ? response.cardsData.bankCardsArray : CATEGORY === 'Identity' ? response.cardsData.identityCardsArray : response.cardsData.licenseCardsArray);
      res.status(201).json(CATEGORY === 'Bank' ? response.cardsData.bankCardsArray : CATEGORY === 'Identity' ? response.cardsData.identityCardsArray : response.cardsData.licenseCardsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = cardsController;




/*
  const response = await UserDatabase.findOneAndUpdate(
        {
          "cardsData.bankCardsArray._id": id
        },
        {
          $set:
          {
            "cardsData.bankCardsArray.$.title": req.body.title,
            // "cardsArray.$.category": req.body.category,
            // "cardsArray.$.cardHolder": req.body.cardHolder,
            // "cardsArray.$.cardNumber": req.body.cardNumber,
            // "cardsArray.$.expiry": req.body.expiry,
            // "cardsArray.$.cvv": req.body.cvv,
            // "cardsArray.$.logoIndex": req.body.logoIndex,
            // "cardsArray.$.isFavourite": req.body.isFavourite
          }
        },
        { returnOriginal: false }
      );
*/
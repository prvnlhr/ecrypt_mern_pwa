// import UserDatabase from "../models/userData.js";
const { UserDatabase, CardsData, BankCards } = require("../models/userData");
const { MongoClient, ObjectID } = require('mongodb');
const { response } = require("express");
const newObjectId = new ObjectID();
const cardsController = {
  getCards: async (req, res) => {
    try {
      const cards = await UserDatabase.findOne({ _id: req.query.user_id });
      res.status(200).send(cards.cardsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  addCard: async (req, res) => {
    console.log(req.body.data, req.body.user_id)
    // console.log('obj_id', newObjectId)
    req.body.data._id = newObjectId;
    try {
      // const bank = BankCards.create({
      //   cardHolder: req.body.cardHolder,
      //   cardNumber: req.body.cardNumber,
      //   expiry: req.body.expiry,
      //   cvv: req.body.cvv,
      //   title: req.body.title,
      //   category: req.body.category,
      //   logoIndex: req.body.logoIndex,
      //   isFavourite: req.body.isFavourite,
      // })

      const card = await CardsData.create({
        cardHolder: req.body.cardHolder,
        cardNumber: req.body.cardNumber,
        expiry: req.body.expiry,
        cvv: req.body.cvv,
        title: req.body.title,
        category: req.body.category,
        logoIndex: req.body.logoIndex,
        isFavourite: req.body.isFavourite,
      })

      const response = await CardsData.findOneAndUpdate(
        { _id: req.body.user_id },
        {
          $push: {
            cardsArray: { $each: [card] },
          },
        },
        { returnOriginal: false }
      );
      res.status(200).send(card);
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message });
    }
  },
  deleteCard: async (req, res) => {

    const cardId = req.params.id;
    const userId = req.body.user_id;
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { _id: userId },
        {
          $pull: {
            cardsArray: {
              _id: cardId,
            },
          },
        },
        { returnOriginal: false }
      );
      res.status(200).send(response.cardsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  editCard: async (req, res) => {
    const id = req.params.id;
    // console.log(req.body)

    const { category, title, cardHolder, cardNumber, expiry, cvv, logoIndex, isFavourite } = req.body;
    // console.log(category)
    // console.log(title)
    // console.log(cardHolder)
    // console.log(cardNumber)
    // console.log(expiry)
    // console.log(cvv)
    // console.log(logoIndex)
    // console.log(isFavourite)
    console.log(req.params.id)

    try {
      // const response = await UserDatabase.findOneAndUpdate(
      //   { "cardsArray.title": "SBI CC" },
      //   {
      //     $set: {
      // "cardsArray.$.title": title,
      // "cardsArray.$.category": req.body.category,
      // "cardsArray.$.cardHolder": req.body.cardHolder,
      // "cardsArray.$.cardNumber": req.body.cardNumber,
      // "cardsArray.$.expiry": req.body.expiry,
      // "cardsArray.$.cvv": req.body.cvv,
      // "cardsArray.$.logoIndex": req.body.logoIndex,
      // "cardsArray.$.isFavourite": req.body.isFavourite
      //     },
      //   },
      //   { returnOriginal: false }
      // );

      const response = await UserDatabase.findOneAndUpdate(
        { _id: "63b43ab32fc8d3c100cafecc", 'cardsArray._id': "63b709fc69a1cfa6fccd645c" },
        {
          $set: {
            "cardsArray.$.title": req.body.title,
            "cardsArray.$.category": req.body.category,
            "cardsArray.$.cardHolder": req.body.cardHolder,
            "cardsArray.$.cardNumber": req.body.cardNumber,
            "cardsArray.$.expiry": req.body.expiry,
            "cardsArray.$.cvv": req.body.cvv,
            "cardsArray.$.logoIndex": req.body.logoIndex,
            "cardsArray.$.isFavourite": req.body.isFavourite
          }
        },
      );

      // let response;

      // switch (category) {

      //   case "Bank":
      //     response = await UserDatabase.findOneAndUpdate(
      //       { "cardsArray._id": id },
      //       {
      //         $set: {
      //           "cardsArray.$.title": req.body.title,
      //           "cardsArray.$.category": req.body.category,
      //           "cardsArray.$.cardHolder": req.body.cardHolder,
      //           "cardsArray.$.cardNumber": req.body.cardNumber,
      //           "cardsArray.$.expiry": req.body.expiry,
      //           "cardsArray.$.cvv": req.body.cvv,
      //           "cardsArray.$.logoIndex": req.body.logoIndex,
      //           "cardsArray.$.isFavourite": req.body.isFavourite
      //         },
      //       },
      //       { returnOriginal: false }
      //     );
      //     break;

      //   case "Identity":
      //     response = await UserDatabase.findOneAndUpdate(
      //       { "cardsArray._id": id },
      //       {
      //         $set: {
      //           "cardsArray.$.title": req.body.title,
      //           "cardsArray.$.category": req.body.category,
      //           "cardsArray.$.cardHolder": req.body.cardHolder,
      //           "cardsArray.$.cardNumber": req.body.cardNumber,
      //           "cardsArray.$.expiry": req.body.expiry,
      //           "cardsArray.$.cvv": req.body.cvv,
      //           "cardsArray.$.logoIndex": req.body.logoIndex,
      //           "cardsArray.$.isFavourite": req.body.isFavourite
      //         },
      //       },
      //       { returnOriginal: false }
      //     );
      //     break;

      //   case "License":
      //     response = await UserDatabase.findOneAndUpdate(
      //       { "cardsArray._id": id },
      //       {
      //         $set: {
      //           "cardsArray.$.title": req.body.title,
      //           "cardsArray.$.category": req.body.category,
      //           "cardsArray.$.cardHolder": req.body.cardHolder,
      //           "cardsArray.$.cardNumber": req.body.cardNumber,
      //           "cardsArray.$.expiry": req.body.expiry,
      //           "cardsArray.$.cvv": req.body.cvv,
      //           "cardsArray.$.logoIndex": req.body.logoIndex,
      //           "cardsArray.$.isFavourite": req.body.isFavourite
      //         },
      //       },
      //       { returnOriginal: false }
      //     );
      //     break;

      //   default:
      //     break;
      // }
      // console.log(response)
      // response = await UserDatabase.findOneAndUpdate(
      //   { "cardsArray._id": id },
      //   {
      //     $set: {
      //       "cardsArray.$.title": req.body.title,
      //       "cardsArray.$.category": req.body.category,
      //       "cardsArray.$.cardHolder": req.body.cardHolder,
      //       "cardsArray.$.cardNumber": req.body.cardNumber,
      //       "cardsArray.$.expiry": req.body.expiry,
      //       "cardsArray.$.cvv": req.body.cvv,
      //       "cardsArray.$.logoIndex": req.body.logoIndex,
      //       "cardsArray.$.isFavourite": req.body.isFavourite
      //     },
      //   },
      //   { returnOriginal: false }
      // );
      console.log(response)
      res.status(201).json(response.cardsArray);
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: error.message });
    }
  },
  toggleFav: async (req, res) => {
    const id = req.params.id;
    const isFav = req.body.data;
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { "cardsArray._id": id },
        {
          $set: {
            "cardsArray.$.isFavourite": isFav,
          },
        },
        { returnOriginal: false }
      );
      res.status(201).json(response.cardsArray);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = cardsController;

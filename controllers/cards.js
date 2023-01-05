// import UserDatabase from "../models/userData.js";
const UserDatabase = require("../models/userData");
const { MongoClient, ObjectID } = require('mongodb');
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
    // req.body.data._id = newObjectId;
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { _id: req.body.user_id },
        {
          $push: {
            // cardsArray: req.body.data,
            cardsArray: { $each: [req.body.data] },
          },
        },
        { returnOriginal: false }
      );
      res.status(200).send(response);
    } catch (error) {
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
    console.log(category)
    console.log(title)
    console.log(cardHolder)
    console.log(cardNumber)
    console.log(expiry)
    console.log(cvv)
    console.log(logoIndex)
    console.log(isFavourite)
    console.log(typeof req.params.id)

    try {
      const response = await UserDatabase.findOneAndUpdate(
        { "cardsArray._id": req.params.id },
        {
          $set: {
            // "cardsArray.$.title": title,
            "cardsArray.$.category": req.body.category,
            // "cardsArray.$.cardHolder": req.body.cardHolder,
            // "cardsArray.$.cardNumber": req.body.cardNumber,
            // "cardsArray.$.expiry": req.body.expiry,
            // "cardsArray.$.cvv": req.body.cvv,
            // "cardsArray.$.logoIndex": req.body.logoIndex,
            // "cardsArray.$.isFavourite": req.body.isFavourite
          },
        },
        { returnOriginal: false }
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

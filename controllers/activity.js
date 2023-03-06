// import UserDatabase from "../models/userData.js";
const { UserDatabase } = require("../models/userData");

const activityController = {
  getActivities: async (req, res) => {
    // console.log(req.query.user_id)
    try {

      const activityRes = await UserDatabase.findOne({ _id: req.query.user_id });
      res.status(200).send(activityRes.activitiesArray);
    } catch (error) {
      // console.log(error);
      res.status(404).json({ message: error.message });
    }
  },



  addActivity: async (req, res) => {
    // console.log("Add activity controller", req.body);
    try {
      const response = await UserDatabase.findOneAndUpdate(
        { _id: req.body.user_id },
        {
          $push: {
            activitiesArray: { $each: [req.body.data], $slice: -20 },
          },
        },

        { returnOriginal: false }
      );
      res.status(200).send(response);
      // res.status(404).send(response);
    } catch (error) {
      // console.log("At Add activity ", error);
      res.status(404).json({ message: error.message });
    }
  },

  addRecentlyAdded: async (req, res) => {
    // console.log("Add recently controller", req.body);

    try {
      const response = await UserDatabase.findOneAndUpdate(
        { _id: req.body.user_id },
        {
          $push: {
            recentlyAddedArray: { $each: [req.body.data], $slice: -10 },
          },
        },

        { returnOriginal: false }
      );
      res.status(200).send(response);
      // res.status(404).send(response);
    } catch (error) {
      // console.log("At Add Recently", error);
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = activityController;

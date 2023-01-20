// import UserDatabase from "../models/userData.js";
const { UserDatabase } = require("../models/userData");

const recentlyAddedController = {
    getRecentlyAdded: async (req, res) => {
        console.log('get recently added', req.query.user_id)
        try {
            const res = await UserDatabase.findOne({ _id: req.query.user_id });
            res.status(200).send(res.recentlyAddedArray);
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: error.message });
        }
    },

    addRecentlyAdded: async (req, res) => {
        console.log("Add recently controller", req.body);
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
            console.log("At add activity ", error);
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = recentlyAddedController;

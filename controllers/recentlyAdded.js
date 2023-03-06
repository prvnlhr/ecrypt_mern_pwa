// import UserDatabase from "../models/userData.js";
const { UserDatabase } = require("../models/userData");

const recentlyAddedController = {
    getRecentlyAdded: async (req, res) => {
        // console.log('get recently added', req.query.user_id)
        try {
            const response = await UserDatabase.findOne({ _id: req.query.user_id });
            // console.log(response.recentlyAddedArray)
            res.status(200).send(response.recentlyAddedArray);
        } catch (error) {
            console.log(error);
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
            // console.log("At add activity ", error);
            res.status(404).json({ message: error.message });
        }
    },

    deleteRecentlyAdded: async (req, res) => {
        const item_id = req.params.id;
        const userId = req.body.user_id;
        // console.log('delete recently Added controller', item_id, userId);
        try {
            const response = await UserDatabase.findOneAndUpdate(
                { _id: userId },
                {
                    $pull: {
                        recentlyAddedArray: {
                            itemId: item_id,
                        },
                    },
                },
                { returnOriginal: false }
            );
            res.status(200).send(response);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
};

module.exports = recentlyAddedController;

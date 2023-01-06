const mongoose = require("mongoose");

const { UserDatabase } = require("./userData")
const identityCardsSchema = new mongoose.Schema(
    {
        cardHolder: {
            type: String,
            required: true,
        },
        cardNumber: {
            type: String,
            required: true,
        },

        issueDate: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },

    },
)



const identityCardData = UserDatabase.path("cardsArray").discriminator("identityCards", identityCardsSchema)

module.exports = { identityCardData };

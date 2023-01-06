const mongoose = require("mongoose");

const { UserDatabase } = require("./userData")

const baseOption = {
    discriminatorKey: 'kind',
    collection: 'cards'
}


const cardsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        logoIndex: {
            type: String,
            required: true,
        },
        isFavourite: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    baseOption
);

const bankCardsSchema = new mongoose.Schema(
    {
        cardHolder: {
            type: String,
            required: true,
        },
        cardNumber: {
            type: String,
            required: true,
        },

        expiry: {
            type: String,
            required: true,
        },
        cvv: {
            type: String,
            required: true,
        },

    },
)

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

const CardsData = mongoose.model('Cards', cardsSchema);

const BankCards = CardsData.discriminator("BankCard", bankCardsSchema)
const IdentityCards = CardsData.discriminator("IdentityCard", bankCardsSchema)

module.exports = { CardsData, BankCards, IdentityCards };

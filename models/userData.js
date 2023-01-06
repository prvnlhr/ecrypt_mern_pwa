// import mongoose from "mongoose";
const mongoose = require("mongoose");
// const { CardsData, BankCards, IdentityCards } = require("./cardData")


const baseOption = {
  discriminatorKey: 'kind',
  // collection: 'cards'
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

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    // cardsArray: [{ type: mongoose.Schema.Types.Mixed }],
    cardsArray: [cardsSchema],

    loginIdsArray: [
      {
        title: {
          type: String,
          required: true,
        },
        logoIndex: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        app: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        isFavourite: {
          type: Boolean,
          default: false,
          required: true,
        },
      },
    ],
    docsArray: [
      {
        imageName: {
          type: String,
          required: true,
        },

        imageUrl: {
          type: String,
          required: true,
        },

        cloudinary_id: {
          type: String,
          required: true,
        },
        isFavourite: {
          type: Boolean,
          default: false,
        },
      },
    ],
    activitiesArray: [
      {
        date: {
          type: String,
          required: true,
        },
        task: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        item: {
          type: String,
          required: true,
        },
      },
    ],
    activities: [{}],
  }
  //   {
  //     typeKey: "$type",
  //   }
);



const CardsData = mongoose.model('Cards', cardsSchema);

const BankCards = CardsData.discriminator("BankCard", bankCardsSchema)
const IdentityCards = CardsData.discriminator("IdentityCard", bankCardsSchema)

userSchema.path("cardsArray").discriminator("bankCards", bankCardsSchema)
userSchema.path("cardsArray").discriminator("identityCards", identityCardsSchema)


const UserDatabase = mongoose.model("userdatas", userSchema);
// export default UserDatabase;
module.exports = {
  UserDatabase,
  CardsData, BankCards
};

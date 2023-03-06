const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema({}, { _id: true });

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

    profilePic: {
      picUrl: {
        type: String,
        require: true,
      },
      cloudinary_id: {
        type: String,
        require: true,
      },
    },

    joinedDate: {
      type: String,
      require: true,
    },
    updateDate: {
      type: String,
      require: true,
    },


    cardsMixedArray: [objectSchema],

    cardsData: {

      bankCardsArray: [
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
          isFavourite: {
            type: Boolean,
            default: false,
            required: true,
          },
          // joinedDate: {
          //   type: String,
          //   required: true,
          // },
          // updateDate: {
          //   type: String,
          //   required: true,
          // },
          time: { type: Date, default: Date.now }

        },
      ],

      identityCardsArray: [
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
          isFavourite: {
            type: Boolean,
            default: false,
            required: true,
          },
          time: { type: Date, default: Date.now }

        }
      ],
      licenseCardsArray: [
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
          cardHolder: {
            type: String,
            required: true,
          },
          licenseNumber: {
            type: String,
            required: true,
          },

          expiry: {
            type: String,
            required: true,
          },
          dob: {
            type: String,
            required: true,
          },
          isFavourite: {
            type: Boolean,
            default: false,
            required: true,
          },
          time: { type: Date, default: Date.now }
        }

      ],
    },
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
    activitiesArray: [{ type: mongoose.Schema.Types.Mixed, }],
    recentlyAddedArray: [{ type: mongoose.Schema.Types.Mixed, }],
  }
);




const UserDatabase = mongoose.model("userdatas", userSchema);
module.exports = { UserDatabase };



/*
  
db.collection.updateOne(
    { _id: <document_id> },
    { $set: { "array.$[element].field": <new_value> } },
    { arrayFilters: [ { "element.field": <current_value> } ] }
)


const objectSchema = new Schema({}, { _id: true });

const arraySchema = new Schema({
  array: [objectSchema],
});

*/
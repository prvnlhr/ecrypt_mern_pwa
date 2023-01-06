const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOption = {
    discriminatorKey: "user",
    collection: "user",
    timestamps: true,
};

const BaseUserSchema = new Schema(
    {
        firstName: { type: String, trim: true, required: true },
        lastName: { type: String, trim: true, required: true },
    },
    baseOption
);

module.exports.BaseUserSchema = mongoose.model(
    "BaseUserSchema",
    BaseUserSchema
);
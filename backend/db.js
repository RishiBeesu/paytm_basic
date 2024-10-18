const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");
const { string } = require("zod");

mongoose.connect(MONGO_URL);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    minLength: 3,
    lowercase: true,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
  },
});

const User = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};

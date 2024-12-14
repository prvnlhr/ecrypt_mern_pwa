// import UserDatabase from "../models/userData.js";
const UserDatabase = require("../models/userData");
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import sendMail from "../utils/sendMail.js";
// import cookiesParser from "cookie-parser";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
const sendMail = require("../utils/sendMail");

const {
  ACTIVATION_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  access_token_SECRET,
  CLIENT_URL,
  SEND_GRID_API_KEY,
  SENDER_EMAIL_ADDRESS,
} = process.env;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SEND_GRID_API_KEY);
//_________________________________________________________________________________________________________________________________________
//REGISTERING NEW USER_____________________________________________________________________________________________________________________

const userController = {
  register: async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    // console.log("At register controller", req.body);
    try {
      //checking all field fill or not.
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: "Please fill in all fields" });
      }
      //checking email address is valid or not.
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Not a valid email address" });
      }
      //checking if password fields match or not
      if (password !== confirmPassword) {
        return res.status(400).json({ msg: " Passwords does not match" });
      }
      //checking email address already exist or not.
      // console.log("check 1");

      const existingUser = await UserDatabase.findOne({ email });
      // console.log(existingUser);
      if (existingUser) {
        // console.log("user exists");
        return res.status(400).json({ msg: "Email address already exist" });
      }
      //checking password length for minimum password length.
      if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be least 6 digit" });
      }
      //hashing password.
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name: `${firstName} ${lastName}`,
        email,
        password: passwordHash,
      };
      //creating jwt Token.
      // console.log("check 2");

      const activation_token = createActivationToken(newUser);

      const txt = "Account Activation Link";
      const url = `${CLIENT_URL}/user/activate/${activation_token}`;

      const response = sendMail(email, url, txt);
      res.status(200).json({ msg: "Check your email for activation link" });
    } catch (error) {
      // console.log("error in registration", error);
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    // console.log("At activate email controller", req.body.data.activation_token);
    try {
      // const {activation_token} = req.body,data
      const user = jwt.verify(
        req.body.data.activation_token,
        ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password } = user;

      const check = await UserDatabase.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = await UserDatabase.create({
        name: name,
        email: email,
        password: password,
      });

      res.json({ msg: "Account has been activated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    // console.log("login controller", req.body);
    try {
      const { email, password } = req.body;
      const user = await UserDatabase.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const access_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", access_token, {
        httpOnly: true,
        secure: true,
        samSite: "none",
        path: "/user/access_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      // console.log("new rftoken at login cntrl", access_token);
      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: async (req, res) => {
    try {
      // console.log("getToken controller");
      const rf_token = req.cookies.refreshtoken;
      // console.log("At get token controller", rf_token);
      if (!rf_token) {
        return res.status(401).json({ msg: "Please Login to continue !" });
      }
      const decode = jwt.verify(rf_token, access_token_SECRET);
      var userId = decode.id;
      const access_token = createAccessToken({ id: userId });
      res.status(200).json(access_token);
    } catch (error) {
      // console.log(error);
      return res.status(400).json({ msg: error });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserDatabase.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "Email Id doest not exist" });
      const access_token = createAccessToken({ id: user._id });
      const CLIENT_URL = client_url;

      const url = `${CLIENT_URL}/user/reset/${access_token}`;
      sendMail(email, url, "Reset your password. Click the below link");
      res.json({ msg: "Please check your email for reset link" });
    } catch (error) {
      // console.log(error);
      return res.status(404).send(error);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      // console.log(req.user);
      const newPassword = await UserDatabase.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      res.json({ msg: "Password successfully changed !" });
    } catch (error) {
      // console.log(error);
      return res.status(404).send(error);
    }
  },
  changePassword: async (req, res) => {
    // console.log("Att change pass cntrl", req.body);
    try {
      const { oldPassword, newPassword } = req.body;
      const id = req.user.id;
      const user = await UserDatabase.findById(id);
      if (!user) {
        // console.log("User does not exist");

        return res.status(400).send({ msg: "Email Id does not exist." });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        // console.log("Pass does not match");

        return res.status(400).send({ msg: "Old Password does not matched !" });
      }
      const passwordHash = await bcrypt.hash(newPassword, 12);
      const changePassword = await UserDatabase.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      res.json({ msg: "Password successfully changed !" });
    } catch (error) {
      // console.log(error);
      return res.status(404).send(error);
    }
  },
  updateProfile: async (req, res) => {
    const { firstName, lastName, email, lastUpdateDate } = req.body.profileData;
    try {
      const id = req.user.id;
      const user = await UserDatabase.findById(id);
      if (!user) {
        return res.status(400).send({ msg: "Email Id does not exist." });
      }
      const response = await UserDatabase.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: `${firstName} ${lastName}`,
            email: email,
          },
        },
        { returnOriginal: false }
      );
      const newData = {
        _id: response._id,
        name: response.name,
        email: response.email,
      };
      res.json({ msg: "Profile Successfully updated !", newData });
    } catch (error) {
      return res.status(404).send(error);
    }
  },
  deleteAccountPermanently: async (req, res) => {
    try {
      const { oldPassword } = req.body;
      const id = req.user.id;
      const user = await UserDatabase.findById(id);
      if (!user) {
        return res.status(400).send({ msg: "User does not exist." });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Password invalid !" });
      }
      const response = await UserDatabase.findByIdAndDelete({
        _id: req.user.id,
      });

      res.json({ msg: "Account successfully deleted !" });
    } catch (error) {
      return res.status(404).send(error);
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await UserDatabase.findById(req.user.id).select("-password");
      res.json({ user });
    } catch (error) {
      return res.status(404).send(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await UserDatabase.findById(req.user.id).select("-password");
      res.status(200).send(user);
    } catch (error) {
      // console.log(error);
      res.status(404).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/access_token" });
      return res.status(200).json({ msg: "Successfully Logged out" });
    } catch (error) {
      return res.status(404).send(error);
    }
  },
};

//_________________________________________________________________________________________________________________-
//_______________________________________________________________________________________________________

//___________________________________________________________________________________________________
function createActivationToken(payload) {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: "5m" });
}
function createAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
function createRefreshToken(payload) {
  return jwt.sign(payload, access_token_SECRET, { expiresIn: "7d" });
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = userController;

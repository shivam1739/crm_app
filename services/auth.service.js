const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

require("dotenv").config();
const verifyJwtToken = (token) => {
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decodeToken;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const verifyPassword = async (data) => {
  const response = {};
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      response.error = "invalid email and password";
    } else {
      const result = bcrypt.compareSync(data.password, user.password);

      if (!result) {
        response.error = "invalid email and password";
      } else {
        response.result = result;
        response.success = true;
      }
    }

    return response;
  } catch (err) {
    response.error = err;
    console.error(err);
    return;
  }
};
const forgetPassword = async (data, user) => {
  const response = {};
  try {
    response.data = await User.findOneAndUpdate(
      { email: data.email },
      {
        password: data.password,
      }
    );
  } catch (error) {
    console.error(err);
    response.error = error;
  }
  return response;
};
module.exports = { verifyJwtToken, verifyPassword, forgetPassword };

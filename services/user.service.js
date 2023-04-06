const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//======================================================
const createUser = async (data) => {
  const response = {};
  try {
    const userObj = {
      name: data.name,
      email: data.email,
      userType: data.userType,
      password: data.password,
      userStatus: data.userStatus,
    };
    response.user = await User.create(userObj);
    response.user.password = undefined;
    return response;
  } catch (err) {
    console.log("Error: ", err);
    response.error = err.message;
    return response;
  }
};

//=========================================
const verifyPassword = async (data) => {
  const response = {};
  try {
    const user = await User.findOne({ email: data.email });
    // console.log(user);
    if (!user) {
      response.error = "invalid user";
    } else {
      const result = bcrypt.compareSync(data.password, user.password);

      if (!result) {
        response.error = "invalid user";
      } else {
        response.result = response;
        response.success = true;
      }
    }

    return response;
  } catch (err) {
    response.error = err;
    console.log(err);
    return;
  }
};
//=======================================================
const updateRole = async (req, res) => {
  const response = {};
  let statusCode;
  try {
    const data = {};
    const result = await User.findOneAndUpdate();
  } catch (err) {}
};
//=================================================
const getUserByEmail = async (data) => {
  const response = {};
  try {
    response.user = await User.findOne({ email: data.email });
  } catch (error) {
    response.error = error;
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  verifyPassword,
};

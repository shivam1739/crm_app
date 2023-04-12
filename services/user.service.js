const { userTypesConstant, userStatusConstant } = require("../constants");
const User = require("../models/user.model");
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

//=================================================
const getUserByEmail = async (data) => {
  const response = {};
  try {
    response.user = await User.findOne({ email: data.email });
  } catch (error) {
    response.error = error;
  }
  return response;
};
//=================================================

const getAllUser = async () => {
  const response = {};
  try {
    const users = await User.find();
    response.users = users;
    return response;
  } catch (error) {
    response.error = error;
  }
};

//================================================================

const updatedUserType = async (data) => {
  let response = {};
  try {
    let userType = data.userType;
    userType = userType.toLowerCase();
    if (Object.keys(userTypesConstant).indexOf(userType) < 0) {
      return (response.error = "invalid user type provided");
    }
    if (data.userId) {
      //update the userType on basis of user id
      response.success = await User.findOneAndUpdate(
        { _id: data.userId },
        { userType: userType }
      );
    } else if (data.email) {
      //update the userType on basis of email
      response.success = await User.findOneAndUpdate(
        { email: data.email },
        { userType: userType }
      );
    }
    if (response.success) {
      response.data = await User.findOne({
        _id: response.success._id,
      });

      return response;
    } else {
      //return error, required fields not provided
      response.error =
        "required fields are not provided to update the user information";
    }

    return response;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const updateUserStatus = async (data) => {
  let response = {};
  try {
    let userStatus = data.userStatus;
    if (Object.keys(userStatusConstant).indexOf(userStatus) < 0) {
      response.error = "invalid userStatus provided";
      return response;
    }
    if (data.userId) {
      //  update userStatus on the basis of user id
      response.success = await User.findByIdAndUpdate(
        { _id: data.userId },
        {
          userStatus: userStatus,
        }
      );
    } else if (data.email) {
      //  update userStatus on the basis of email id

      response.success = await User.findOneAndUpdate(
        {
          email: data.email,
        },
        {
          userStatus: userStatus,
        }
      );
    }
    if (response.success) {
      response.data = await User.findOne({
        _id: response.success._id,
      });

      return response;
    } else {
      //return error, required fields not provided
      response.error =
        "required fields are not provided to update the user information";
    }
    return response;
  } catch (err) {
    console.error(err);
    response.error = err;
    return response;
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  getAllUser,
  updatedUserType,
  updateUserStatus,
};

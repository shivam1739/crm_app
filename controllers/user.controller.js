const userService = require("../services/user.service");

const getUserByEmail = async (req, res) => {
  try {
    let statusCode;
    const result = await userService.getUserByEmail({ email: req.params });

    if (result.error) {
      statusCode = 403;
      response = result.error;
    } else {
      statusCode = 201;
      response = result.user;
    }
    res.status(statusCode).send({
      result: response,
    });
  } catch (err) {
    res.status(500).send({
      result: err,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    let response = {};
    let statusCode;
    const result = await userService.getAllUser();
    if (result.error) {
      statusCode = 403;
      response = result.error;
    } else {
      statusCode = 201;
      response = result.users;
    }
    res.status(statusCode).send({
      result: response,
    });
  } catch (err) {
    res.status(500).send({
      result: err,
    });
  }
};

const updateUserType = async (req, res) => {
  console.log(req.body);
  const response = {};
  let statusCode;
  try {
    const { data, error } = await userService.updatedUserType(req.body);
    if (error) {
      statusCode = 403;
      response.error = error;
    } else {
      statusCode = 201;
      response.data = data;
    }
    res.status(statusCode).send({
      response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      result: error,
    });
  }
};
const updateUserStatus = async (req, res) => {
  const response = {};
  let statusCode;
  try {
    console.log(req.body);
    const { error, data } = await userService.updateUserStatus(req.body);
    console.log(error, data, "===========");
    if (error) {
      response.error = error;
      statusCode = 403;
    } else if (data) {
      statusCode = 201;
      response.data = data;
    }
    console.log(statusCode);
    res.status(statusCode).send({
      response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      result: error,
    });
  }
};
module.exports = {
  getUserByEmail,
  getAllUser,
  updateUserType,
  updateUserStatus,
};

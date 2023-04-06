const userService = require("../services/user.service");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    let statusCode;
    let response;
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
const signIn = async (req, res) => {
  const response = {};
  let statusCode;
  try {
    const result = await userService.verifyPassword(req.body);
    // console.log(result, "============");
    if (result.error) {
      statusCode = 403;
      response.error = result.error;
      // console.log(response, "=======");
    } else {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET_KEY
      );
      statusCode = 201;
      response.message = "successfully login";
      response.token = token;
    }
    res.status(statusCode).send({
      result: response,
    });
  } catch (err) {
    res.status(400).send({
      result: err,
    });
  }
};

module.exports = { signUp, signIn };

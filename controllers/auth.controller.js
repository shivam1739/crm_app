const userService = require("../services/user.service");
const authService = require("../services/auth.service");
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
    const { error } = await authService.verifyPassword(req.body);

    if (error) {
      statusCode = 403;
      response.error = error;
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
    res.status(statusCode).send(response);
  } catch (err) {
    response.error = err;
    res.status(400).send(response);
  }
};
const forgetPassword = async (req, res) => {
  const response = {};
  let statusCode;
  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if (email.length < 3 || password.length < 4) {
      res.status(400).send({
        error:
          "required fields are not provided to update the user information",
      });
      return;
    }
    const { user, error } = await userService.getUserByEmail(req.body);
    console.log(user, error);
    if (!user) {
      response.error = "user not found";
      statusCode = 400;
    } else {
      const { error } = await authService.forgetPassword(req.body);

      if (error) {
        response.error = error;
        statusCode = 500;
      } else {
        statusCode = 204;
      }
    }
    res.status(statusCode).send(response);
  } catch (error) {
    console.log(error);
    res.status(statusCode).send(response);
  }
};
module.exports = { signUp, signIn, forgetPassword };

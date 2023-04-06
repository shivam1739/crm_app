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

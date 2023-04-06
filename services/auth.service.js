const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyJwtToken = (token) => {
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decodeToken;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

module.exports = { verifyJwtToken };

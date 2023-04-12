const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const isAuthenticat = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  //if token is not provided
  // no need to verify the token, but just return the error message
  if (!token) {
    res.status(401).send({
      message: "jwt token is not provided",
    });
  }
  const isVerifideToken = authService.verifyJwtToken(token);
  if (!isVerifideToken || isVerifideToken == "invalid signature") {
    return res.status(401).send({
      message: "jwt token is invalid",
    });
  }
  // we add the user in req obj for laters uses
  // console.log(isVerifideToken, "====================");
  const user = await userService.getUserByEmail({
    email: isVerifideToken.email,
  });
  // console.log(user, "========");
  if (!user) {
    return res.status(401).send({
      message: "email is invalid",
    });
  }
  req.user = user;
  next();
};

const isAdmin = (req, res, next) => {
  const userType = req.user.userType;
  if (userType !== "admin") {
    return res.status(401).send({
      message: "unauthorized user",
    });
  }
  next();
};
module.exports = {
  isAuthenticat,
  isAdmin,
};

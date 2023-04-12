const userController = require("../controllers/user.controller");
const middelware = require("../middelware/auth.validator");
const route = (app) => {
  app.get(
    "/crmapp/api/v1/users",
    middelware.isAuthenticat,
    middelware.isAdmin,
    userController.getAllUser
  );
  app.patch(
    "/crmapp/api/v1/updateUserType",
    middelware.isAuthenticat,
    // middelware.isAdmin,
    userController.updateUserType
  );
  app.patch(
    "/crmapp/api/v1/updateUserStatus",
    middelware.isAuthenticat,
    middelware.isAdmin,
    userController.updateUserStatus
  );
};
module.exports = route;

const authControllers = require("../controllers/auth.controller");
const routes = (app) => {
  app.post("/crmapp/api/v1/auth/signUp", authControllers.signUp);
  app.post("/crmapp/api/v1/auth/signIn", authControllers.signIn);
  app.patch(
    "/crmapp/api/v1/auth/forgetpassword",
    authControllers.forgetPassword
  );
};
module.exports = routes;

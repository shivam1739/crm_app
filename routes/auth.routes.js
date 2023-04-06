const authControllers = require("../controllers/auth.controller");
const routes = (app) => {
  app.post("/crmapp/api/v1/auth/signUp", authControllers.signUp);
  app.post("/crmapp/api/v1/auth/signIn", authControllers.signIn);
};
module.exports = routes;

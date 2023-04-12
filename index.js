const mongoose = require("mongoose");
const express = require("express");
const { json } = require("express");

const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");

const app = express();
require("dotenv").config();
const uri = process.env.URI;
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(express.urlencoded({ extended: true }));

authRoute(app);
userRoute(app);
app.listen(PORT, async () => {
  await mongoose.connect(uri).then(
    () => console.log("successfully connected"),
    (err) => console.log(err)
  );
  console.log(`app is listning to port ${PORT}`);
});

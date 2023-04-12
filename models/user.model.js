const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /\S+@\S+\.\S+/,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
    match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
  },
  createdAt: {
    type: Date,
    immutable: false,
    default: new Date().toString(),
  },

  updatedAt: {
    type: Date,
    default: new Date().toString(),
  },
  userType: {
    type: String,
    default: "customer",
    enum: ["customer", "engineer", "admin"],
    require: true,
  },
  userStatus: {
    type: String,
    required: true,
    default: "approved",
    enum: ["block", "unapproved", "approved", "suspended"],
  },
});
const Salt = process.env.SALT;
userSchema.pre("save", function (next) {
  try {
    const hashedPassword = bcrypt.hashSync(this.password, +Salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update.password) {
    return next();
  }
  const hashedPassword = bcrypt.hashSync(update.password, +Salt);
  update.password = hashedPassword;
  next();
});

module.exports = mongoose.model("User", userSchema);

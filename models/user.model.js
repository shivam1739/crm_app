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
    immutable: true,
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
  },
});
const Salt = process.env.SALT;
console.log(Salt);
userSchema.pre("save", function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, +Salt);
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.model("User", userSchema);

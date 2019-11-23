const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    login: String,
    password: String,
    teams: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Accounts", AccountSchema);
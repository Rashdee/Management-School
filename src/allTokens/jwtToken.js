
const { sign } = require( "jsonwebtoken");
require("dotenv").config();

const code = "itsSecreateKey";

const jwtToken = async (payload) =>
  sign(payload, code, {
    expiresIn: "24hr",
  });

  module.exports = jwtToken;

  
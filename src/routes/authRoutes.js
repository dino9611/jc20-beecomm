const express = require("express");
const Router = express.Router();
const { authControllers } = require("./../controllers");
const { register } = authControllers;

Router.post("/register", register);

module.exports = Router;

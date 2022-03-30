const express = require("express");
const { verifyTokenAccess } = require("../lib/jwtVerify");
const Router = express.Router();
const { authControllers } = require("./../controllers");
const { register, login, keeplogin } = authControllers;

Router.post("/register", register);
Router.post("/login", login);
Router.get("/keeplogin", verifyTokenAccess, keeplogin);

module.exports = Router;

const express = require("express");
const { verifyTokenAccess } = require("../lib/jwtVerify");
const Router = express.Router();
const { productControllers } = require("./../controllers");
const { addProducts, getProducts } = productControllers;
const upload = require("./../lib/upload");

const uploader = upload("/products", "PROD").fields([
  { name: "model1", maxCount: 4 },
  { name: "model2", maxCount: 4 },
  { name: "model3", maxCount: 4 },
  { name: "model4", maxCount: 4 },
]);

Router.get("/", getProducts);
Router.post("/", verifyTokenAccess, uploader, addProducts);

module.exports = Router;

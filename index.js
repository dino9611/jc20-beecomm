require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>API Matoa 1.0 ready</h1>");
});

app.listen(PORT, () => console.log(`app jalan di ${PORT}`));

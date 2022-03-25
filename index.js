require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const morgan = require("morgan");

morgan.token("date", function (req, res) {
  return new Date().toString();
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :date")
);

app.use(express.json());
// klo corsnya "cors()" artinya allow semua ip
app.use(cors());
// untuk membuat token masuk kedalam variable req.token

//? parse form data berguna untuk upload file /
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>API Matoa 1.0 ready</h1>");
});

const { authRoutes } = require("./src/routes");
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`app jalan di ${PORT}`));

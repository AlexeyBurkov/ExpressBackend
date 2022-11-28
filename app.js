const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const orderRouter = require("./routes/orders");
const locationRouter = require("./routes/locations");
const cargoTypeRouter = require("./routes/cargoTypes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/orders", orderRouter);
app.use("/locations", locationRouter);
app.use("/cargo_types", cargoTypeRouter);

app.use((req, res) => {
  res.status(404).send("Incorrect path or unexpected params!\n");
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

module.exports = app;

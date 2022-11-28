const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const routerFactory = require("./routes/routerFactory");

const orderRouterConfig = require("./routes/orders");
const locationRouterConfig = require("./routes/locations");
const cargoTypeRouterConfig = require("./routes/cargoTypes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/orders", routerFactory(orderRouterConfig));
app.use("/locations", routerFactory(locationRouterConfig));
app.use("/cargo_types", routerFactory(cargoTypeRouterConfig));

app.use((req, res) => {
  res.status(404).send("Incorrect path or unexpected params!\n");
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

module.exports = app;

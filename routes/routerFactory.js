const express = require("express");
const locationsConf = require("./locations");
const cargoTypesConf = require("./cargoTypes");
// const ordersConf = require("./orders");

const mainConfig = [
  {
    path: "/locations",
    config: locationsConf
  },
  {
    path: "/cargo_types",
    config: cargoTypesConf
  },
  // {
  //   path: "/orders",
  //   config: ordersConf
  // }
];

const supportRouterFactory = config => {
  const router = express.Router();
  config.forEach((element) => {
    router.all(element.path, (req, res, next) => {
      if (req.method === element.method) element.handler(req, res, next);
      else next();
    });
  });
  return router;
};

module.exports = () => {
  const router = express.Router();
  mainConfig.forEach((element) => {
    const subRouter = supportRouterFactory(element.config);
    router.use(element.path, subRouter);
  });
  return router;
};
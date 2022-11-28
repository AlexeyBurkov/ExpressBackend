const express = require("express");

module.exports = function(config) {
  const router = express.Router();
  config.forEach((element) => {
    router.all(element.path, (req, res, next) => {
      if (req.method === element.method) element.handler(req, res, next);
      else next();
    });
  });
  return router;
}
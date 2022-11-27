const express = require("express");
const router = express.Router();
const driver = require("../database/dbdriver");

router.get("/list", (req, res, next) => {
  driver.locations.list(
    (data) => {
      res.status(200).json(data);
    },
    (error) => {
      res.status(500).send("Internal server error!\n");
    }
  );
});

router.post("/add", (req, res, next) => {
  driver.locations.add(
    req.body,
    () => {
      res.status(400).send("Incorrect request body!\n");
    },
    () => {
      res.status(200).send("Success!\n");
    },
    (error) => {
      res.status(500).send("Internal server error!\n");
    }
  );
});

router.get("/detail", (req, res, next) => {
  driver.locations.detail(
    req.body,
    () => {
      res.status(400).send("Incorrect request body!\n");
    },
    (data) => {
      res.status(200).json(data);
    },
    (error) => {
      res.status(500).send("Internal server error!\n");
    }
  );
});

router.put("/edit", (req, res, next) => {
  driver.locations.edit(
    req.body,
    () => {
      res.status(400).send("Incorrect request body!\n");
    },
    (data) => {
      res.status(200).send("Success!\n");
    },
    (error) => {
      res.status(500).send("Internal server error!\n");
    }
  );
});

module.exports = router;

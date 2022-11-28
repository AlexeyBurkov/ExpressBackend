const express = require("express");
const router = express.Router();
const ct = require("../database/cargoTypes");

router.get("/list", ct.list);

router.post("/add", ct.add);

router.get("/detail/:id", ct.detail);

router.put("/edit/:id", ct.edit);

module.exports = router;

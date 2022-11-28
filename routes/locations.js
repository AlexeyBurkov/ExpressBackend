const express = require("express");
const router = express.Router();
const loc = require("../database/locations");

router.get("/list", loc.list);

router.post("/add", loc.add);

router.get("/detail/:id", loc.detail);

router.put("/edit/:id", loc.edit);

module.exports = router;

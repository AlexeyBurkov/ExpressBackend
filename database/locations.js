const db = require("./database");
const sp = require("../support");

exports.add = (req, res, next) => {
  // Handler for adding locations
  // validation of body
  if (!sp.keysValidator(req.body, ["location_name"])) {
    res.status(400).send("Incorrect body of request! Expected \"location_name\".\n");
    return;
  }
  if (!sp.lengthValidator(req.body["location_name"], 200)) {
    res.status(400).send("Incorrect body of request! Expected \"location_name\" to be shorter then 200 symbols.\n");
    return;
  }
  // querying database
  db.none(
    "insert into locations (location_name) values ($(location_name))",
    req.body
  )
    .then(() => {
      res.status(200).send("Successfully added new location!\n");
    })
    .catch((error) => {
      next(error);
    });
};

exports.list = (req, res, next) => {
  // Handler for listing locations
  // validation of body
  if (!sp.emptyValidator(req.body)) {
    res.status(400).send("Incorrect body of request! Expected empty.\n");
    return;
  }
  // querying database
  db.manyOrNone("select * from locations")
    .then((data) => {
      if (data.length === 0) res.status(200).send("No locations!\n");
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.detail = (req, res, next) => {
  // Handler for retrieving info about location
  // validation of body
  if (!sp.emptyValidator(req.body)) {
    res.status(400).send("Incorrect body of request! Expected none.\n");
    return;
  }
  // querying database
  db.oneOrNone("select * from locations where location_id = $(id)", req.params)
    .then((data) => {
      if (data == null) res.status(400).send("Invalid location id!\n");
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.edit = (req, res, next) => {
  // Handler for editing info about location
  // validation of body
  if (sp.emptyValidator(req.body)) {
    res.status(200).send("No changes!\n");
    return;
  }
  if (!sp.keysValidator(req.body, ["location_name"])) {
    res.status(400).send("Incorrect body of request! Expected \"location_name\".\n");
    return;
  }
  if (!sp.lengthValidator(req.body["location_name"], 200)) {
    res.status(400).send("Incorrect body of request! Expected \"location_name\" to be shorter then 200 symbols.\n");
    return;
  }
  // querying database
  db.none(
    "update locations set location_name = $(location_name) where location_id = $(id)",
    {...req.body, ...req.params}
  )
    .then(() => {
      res.status(200).send("Successfully updated location!\n");
    })
    .catch((error) => {
      next(error);
    });
};

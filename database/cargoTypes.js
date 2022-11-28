const db = require("./database");
const sp = require("../support");

exports.add = (req, res, next) => {
  // Handler for adding locations
  // validation of body
  if (!sp.keysValidator(req.body, ["cargo_type_name"])) {
    res.status(400).send("Incorrect body of request! Expected \"cargo_type_name\".\n");
    return;
  }
  if (!sp.lengthValidator(req.body["cargo_type_name"], 100)) {
    res.status(400).send("Incorrect body of request! Expected \"cargo_type_name\" to be shorter then 100 symbols.\n");
    return;
  }
  // querying database
  db.none(
    "insert into cargo_types (cargo_type_name) values ($(cargo_type_name))",
    req.body
  )
    .then(() => {
      res.status(200).send("Successfully added new cargo type!\n");
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
  db.manyOrNone("select * from cargo_types")
    .then((data) => {
      if (data.length === 0) res.status(200).send("No cargo types!\n");
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
  db.oneOrNone("select * from cargo_types where cargo_type_id = $(id)", req.params)
    .then((data) => {
      if (data == null) res.status(400).send("Invalid cargo type id!\n");
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
  if (!sp.keysValidator(req.body, ["cargo_type_name"])) {
    res.status(400).send("Incorrect body of request! Expected \"cargo_type_name\".\n");
    return;
  }
  if (!sp.lengthValidator(req.body["cargo_type_name"], 100)) {
    res.status(400).send("Incorrect body of request! Expected \"cargo_type_name\" to be shorter then 100 symbols.\n");
    return;
  }
  // querying database
  db.none(
    "update cargo_types set cargo_type_name = $(cargo_type_name) where cargo_type_id = $(id)",
    {...req.body, ...req.params}
  )
    .then(() => {
      res.status(200).send("Successfully updated cargo type!\n");
    })
    .catch((error) => {
      next(error);
    });
};

const db = require("./database");
const sp = require("../support");

exports.add = (req, res, next) => {
  // Handler for adding shipment conditions
  // validation of body
  if (!sp.keysValidator(req.body, ["shipment_condition_name"])) {
    res.status(400).send("Incorrect body of request! Expected \"shipment_condition_name\".\n");
    return;
  }
  if (!sp.lengthValidator(req.body["shipment_condition_name"], 100)) {
    res.status(400).send("Incorrect body of request! Expected \"shipment_condition_name\" to be shorter then 100 symbols.\n");
    return;
  }
  // querying database
  db.none(
    "insert into shipment_conditions (shipment_condition_name) values ($(shipment_condition_name))",
    req.body
  )
    .then(() => {
      res.status(200).send("Successfully added new shipment condition!\n");
    })
    .catch((error) => {
      next(error);
    });
};

exports.list = (req, res, next) => {
  // Handler for listing shipment conditions
  // validation of body
  if (!sp.emptyValidator(req.body)) {
    res.status(400).send("Incorrect body of request! Expected empty.\n");
    return;
  }
  // querying database
  db.manyOrNone("select * from shipment_conditions")
    .then((data) => {
      if (data.length === 0) res.status(200).send("No shipment conditions!\n");
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.detail = (req, res, next) => {
  // Handler for retrieving info about shipment condition
  // validation of body
  if (!sp.emptyValidator(req.body)) {
    res.status(400).send("Incorrect body of request! Expected none.\n");
    return;
  }
  // querying database
  db.oneOrNone("select * from shipment_conditions where shipment_condition_id = $(id)", req.params)
    .then((data) => {
      if (data == null) res.status(400).send("Invalid shipment condition id!\n");
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.edit = (req, res, next) => {
  // Handler for editing info about shipment condition
  // validation of body
  if (sp.emptyValidator(req.body)) {
    res.status(200).send("No changes!\n");
    return;
  }
  if (!sp.keysValidator(req.body, ["shipment_condition_name"])) {
    res.status(400).send("Incorrect body of request! Expected \"shipment_condition_name\".\n");
    return;
  }
  if (!sp.lengthValidator(req.body["shipment_condition_name"], 100)) {
    res.status(400).send("Incorrect body of request! Expected \"shipment_condition_name\" to be shorter then 100 symbols.\n");
    return;
  }
  // querying database
  db.none(
    "update shipment_conditions set shipment_condition_name = $(shipment_condition_name) where shipment_condition_id = $(id)",
    { ...req.body, ...req.params }
  )
    .then(() => {
      res.status(200).send("Successfully updated shipment condition!\n");
    })
    .catch((error) => {
      next(error);
    });
};

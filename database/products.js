const db = require("./database");
const sp = require("../support");

exports.add = (req, res, next) => {
  // Handler for adding products
  // validation of body
  if (!sp.keysValidator(req.body, ["product_name"])) {
    res.status(400).send("Incorrect body of request! Expected \"product_name\".\n");
    return;
  }
  if (!sp.lengthValidator(req.body["location_name"], 200)) {
    res.status(400).send("Incorrect body of request! Expected \"product_name\" to be shorter then 200 symbols.\n");
    return;
  }
  // querying database
  db.none(
    "insert into products (product_name) values ($(product_name))",
    req.body
  )
    .then(() => {
      res.status(200).send("Successfully added new product!\n");
    })
    .catch((error) => {
      next(error);
    });
};

exports.list = (req, res, next) => {
  // Handler for listing products
  // validation of body
  if (!sp.emptyValidator(req.body)) {
    res.status(400).send("Incorrect body of request! Expected empty.\n");
    return;
  }
  // querying database
  db.manyOrNone("select * from products")
    .then((data) => {
      if (data.length === 0) res.status(200).send("No products!\n");
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.detail = (req, res, next) => {
  // Handler for retrieving info about product
  // validation of body
  if (!sp.emptyValidator(req.body)) {
    res.status(400).send("Incorrect body of request! Expected none.\n");
    return;
  }
  // querying database
  db.oneOrNone("select * from products where product_id = $(id)", req.params)
    .then((data) => {
      if (data == null) res.status(400).send("Invalid product id!\n");
      else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.edit = (req, res, next) => {
  // Handler for editing info about product
  // validation of body
  if (sp.emptyValidator(req.body)) {
    res.status(200).send("No changes!\n");
    return;
  }
  if (!sp.keysValidator(req.body, ["product_name"])) {
    res.status(400).send("Incorrect body of request! Expected \"product_name\".\n");
    return;
  }
  if (!sp.lengthValidator(req.body["product_name"], 200)) {
    res.status(400).send("Incorrect body of request! Expected \"product_name\" to be shorter then 200 symbols.\n");
    return;
  }
  // querying database
  db.none(
    "update products set product_name = $(location_name) where product_id = $(id)",
    {...req.body, ...req.params}
  )
    .then(() => {
      res.status(200).send("Successfully updated product!\n");
    })
    .catch((error) => {
      next(error);
    });
};

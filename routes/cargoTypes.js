const ct = require("../database/cargoTypes");

module.exports = [
  {
    path: "/list",
    method: "GET",
    handler: ct.list
  },
  {
    path: "/add",
    method: "POST",
    handler: ct.add
  },
  {
    path: "/detail/:id",
    method: "GET",
    handler: ct.detail
  },
  {
    path: "/edit/:id",
    method: "PUT",
    handler: ct.edit
  }
];

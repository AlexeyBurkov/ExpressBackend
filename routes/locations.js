const loc = require("../database/locations");

module.exports = [
  {
    path: "/list",
    method: "GET",
    handler: loc.list
  },
  {
    path: "/add",
    method: "POST",
    handler: loc.add
  },
  {
    path: "/detail/:id",
    method: "GET",
    handler: loc.detail
  },
  {
    path: "/edit/:id",
    method: "PUT",
    handler: loc.edit
  }
];

const orders = require("../database/orders");

module.exports = [
  {
    path: "/list",
    method: "GET",
    handler: orders.list
  },
  {
    path: "/add",
    method: "POST",
    handler: orders.add
  },
  {
    path: "/detail/:id",
    method: "GET",
    handler: orders.detail
  },
  {
    path: "/edit/:id",
    method: "PUT",
    handler: orders.edit
  }
];
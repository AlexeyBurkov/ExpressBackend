const pgp = require("pg-promise")();
module.exports = pgp("postgres://test1:test1@localhost:5432/test1");
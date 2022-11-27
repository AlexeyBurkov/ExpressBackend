const pgp = require("pg-promise")();
const db = pgp("postgres://test1:test1@localhost:5432/test1");

const keysValidator = (data, expectedKeys) => {
  const keys = Object.keys(data);
  if (keys.length !== expectedKeys.length) return false;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== expectedKeys[i]) return false;
  }
  return true;
};

const driver = {
  locations: {
    add: (data, onIncorrectData, onSuccess, onFailure) => {
      // validation
      if (!keysValidator(data, ["location_name"])) {
        onIncorrectData();
        return;
      }
      // querying database
      db.none(
        "insert into locations (location_name) values ($(location_name))",
        data
      )
        .then(onSuccess)
        .catch(onFailure);
    },
    list: (onSuccess, onFailure) =>
      db.manyOrNone("select * from locations").then(onSuccess).catch(onFailure),
    detail: (data, onIncorrectData, onSuccess, onFailure) => {
      // validation
      if (!keysValidator(data, ["location_id"])) {
        onIncorrectData();
        return;
      }
      // querying database
      db.one("select * from locations where location_id = $(location_id)", data)
        .then(onSuccess)
        .catch(onFailure);
    },
    edit: (data, onIncorrectData, onSuccess, onFailure) => {
      // validation
      if (keysValidator(data, ["location_id"])) {
        onSuccess();
        return;
      }
      if (!keysValidator(data, ["location_id", "location_name"])) {
        onIncorrectData();
        return;
      }
      db.none(
        "update locations set location_name = $(location_name) where location_id = $(location_id)",
        data
      )
        .then(onSuccess)
        .catch(onFailure);
    },
  },
};

module.exports = driver;

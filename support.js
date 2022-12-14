const stringArrayCmp = (first, second) => {
  if (first.length !== second.length) return false;
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) return false;
  }
  return true;
};

//  Validator checks if object keys corresponds to expected
exports.keysValidator = (data, expectedKeys) => stringArrayCmp(Object.keys(data), expectedKeys);

//  Validator checks if object is empty
exports.emptyValidator = (data) => Object.keys(data).length === 0;

//  Validator checks if string is less then quantity of symbols
exports.lengthValidator = (string, len) => string.length <= len;

//  Generator for standard router config
exports.standardConfGenerator = (controller) => [
  {
    path: "/list",
    method: "GET",
    handler: controller.list
  },
  {
    path: "/add",
    method: "POST",
    handler: controller.add
  },
  {
    path: "/detail/:id",
    method: "GET",
    handler: controller.detail
  },
  {
    path: "/edit/:id",
    method: "PUT",
    handler: controller.edit
  }
]
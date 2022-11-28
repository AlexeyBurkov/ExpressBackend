const stringArrayCmp = (first, second) => {
  if (first.length !== second.length) return false;
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) return false;
  }
  return true;
};

//  Validator checks if object keys corresponds to expected
exports.keysValidator = (data, expectedKeys) => stringArrayCmp(Object.keys(data), expectedKeys);

exports.emptyValidator = (data) => Object.keys(data).length === 0;